// Run every html and javascript example in README.md in headless Chrome
// against the built files, and check it renders the number of iframes its
// "Renders N iframes" comment says, that each iframe can be seen, and that
// the page throws no errors. CDN script URLs must point at the published UMD
// build. Run after `npm run build`. Set CHROME to the browser binary if it
// isn't google-chrome.
//
// Chrome is driven over the DevTools protocol in real time: --dump-dom with
// --virtual-time-budget could dump the page before any frame was drawn, so
// IntersectionObserver (lazy loading) had not run yet on a busy machine.
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CHROME = process.env.CHROME ?? 'google-chrome';
// How long a page may take to report its result
const DEADLINE = 20_000;
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const umd = pkg.unpkg.replace(/^\.\//, '');
const esm = pkg.exports['.'].default.replace(/^\.\//, '');
const readme = readFileSync(join(ROOT, 'README.md'), 'utf8');
const blocks = [...readme.matchAll(/^```(\w+)\n([\s\S]*?)^```$/gm)].map(
  ([, lang, code], index) => ({
    lang,
    code,
    line: readme.slice(0, readme.indexOf(code)).split('\n').length,
    index
  })
);
// The page an ES module example runs on
const FIXTURE =
  '<div data-frameport data-frameport-vw="320"><p>Hello</p></div>';
// Collects errors before any example runs
const ERRORS =
  '<script>window.errors = []; addEventListener("error", (e) => errors.push(e.message)); addEventListener("unhandledrejection", (e) => errors.push(String(e.reason)));</script>';
// Reports the iframes once rendering has settled. IntersectionObserver
// (lazy loading) reports during rendering frames, so wait for two frames
// after the timer, or a busy machine reports before the first frame
const REPORT = `<script>
  const frame = () => new Promise((resolve) => requestAnimationFrame(resolve));
  setTimeout(async () => {
    await frame();
    await frame();
    const iframes = [...document.querySelectorAll('iframe')];
    const hidden = iframes.filter((iframe) => {
      iframe.scrollIntoView({ block: 'start', inline: 'start' });
      const { left, top } = iframe.getBoundingClientRect();
      return document.elementFromPoint(left + 2, top + 2) !== iframe;
    }).length;
    document.body.setAttribute('data-result', JSON.stringify({ count: iframes.length, hidden, errors }));
  }, 1000);
</script>`;
const problems = [];
const pages = new Map();
const server = createServer((request, response) => {
  const path = decodeURIComponent(new URL(request.url, 'http://x').pathname);
  const page = pages.get(path);

  if (page) {
    response.writeHead(200, { 'content-type': 'text/html' });
    response.end(page);
  } else if (path === `/${umd}` || path === `/${esm}`) {
    response.writeHead(200, { 'content-type': 'text/javascript' });
    response.end(readFileSync(join(ROOT, path)));
  } else {
    response.writeHead(404);
    response.end();
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

const origin = `http://127.0.0.1:${server.address().port}`;
const profile = mkdtempSync(join(tmpdir(), 'frameport-chrome-'));
const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--window-size=1400,1200',
    // Keep frames and timers running at full speed in every tab
    '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding',
    '--disable-backgrounding-occluded-windows',
    '--remote-debugging-port=0',
    `--user-data-dir=${profile}`,
    'about:blank'
  ],
  { stdio: ['ignore', 'ignore', 'pipe'] }
);
const endpoint = await new Promise((resolve, reject) => {
  let output = '';

  chrome.stderr.on('data', (chunk) => {
    output += chunk;

    const match = output.match(/DevTools listening on (ws:\/\/\S+)/);

    if (match) resolve(match[1]);
  });
  chrome.on('error', reject);
  chrome.on('exit', (code) =>
    reject(new Error(`${CHROME} exited with ${code}:\n${output}`))
  );
});
const socket = new WebSocket(endpoint);
const pending = new Map();

let id = 0;

socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  const call = pending.get(message.id);

  if (!call) return;

  pending.delete(message.id);

  if (message.error) call.reject(new Error(message.error.message));
  else call.resolve(message.result);
});
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve);
  socket.addEventListener('error', reject);
});

/** Send a DevTools protocol command, to a page when sessionId is given. */
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
/** Open a page and wait for its data-result attribute, or undefined. */
const resultOf = async (url) => {
  const { targetId } = await send('Target.createTarget', { url });
  const { sessionId } = await send('Target.attachToTarget', {
    targetId,
    flatten: true
  });

  try {
    for (const end = Date.now() + DEADLINE; Date.now() < end; ) {
      const { result } = await send(
        'Runtime.evaluate',
        {
          expression: 'document.body?.dataset.result ?? null',
          returnByValue: true
        },
        sessionId
      );

      if (typeof result.value === 'string') return JSON.parse(result.value);

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return undefined;
  } finally {
    await send('Target.closeTarget', { targetId });
  }
};

try {
  for (const block of blocks) {
    if (block.lang !== 'html' && block.lang !== 'javascript') continue;

    const where = `README.md:${block.line}`;
    const expected = block.code.match(/Renders (\d+) iframes?/);

    let body;

    if (block.lang === 'html') {
      body = block.code.replace(
        /<script([^>]*?)\ssrc="([^"]+)"/g,
        (tag, attributes, src) => {
          if (!src.endsWith(`/${umd}`)) {
            problems.push(`${where}: ${src} is not the UMD build (${umd})`);
          }

          return `<script${attributes} src="/${umd}"`;
        }
      );

      if (!body.includes(`/${umd}`))
        body += `\n<script src="/${umd}"></script>`;
    } else {
      body = `${FIXTURE}
<script type="importmap">${JSON.stringify({ imports: { [pkg.name]: `/${esm}` } })}</script>
<script type="module">\n${block.code}\n</script>`;
    }

    // A script tag on its own renders nothing, but must not throw
    const want = expected
      ? Number(expected[1])
      : block.code.includes('data-frameport') || block.lang === 'javascript'
        ? undefined
        : 0;

    if (want === undefined) {
      problems.push(`${where}: the example has no "Renders N iframes" comment`);
      continue;
    }

    const path = `/example-${block.index}.html`;

    pages.set(
      path,
      `<!doctype html><html><head>${ERRORS}</head><body>${body}${REPORT}</body></html>`
    );

    const result = await resultOf(`${origin}${path}`);

    if (!result) {
      problems.push(`${where}: the page did not finish`);
      continue;
    }

    if (result.count !== want) {
      problems.push(
        `${where}: rendered ${result.count} iframes, expected ${want}`
      );
    }

    if (result.hidden > 0) {
      problems.push(`${where}: ${result.hidden} of the iframes can't be seen`);
    }

    for (const error of result.errors) {
      problems.push(`${where}: ${error}`);
    }

    if (
      result.count === want &&
      result.hidden === 0 &&
      result.errors.length === 0
    ) {
      console.log(
        `${where} (${block.lang}): rendered ${want} iframe${want === 1 ? '' : 's'}`
      );
    }
  }
} finally {
  const exited = new Promise((resolve) => chrome.once('exit', resolve));

  // Close Chrome cleanly, so it stops writing to its profile; kill it if not
  await send('Browser.close').catch(() => chrome.kill());
  await Promise.race([
    exited,
    new Promise((resolve) => setTimeout(resolve, 5_000))
  ]);
  chrome.kill();
  socket.close();
  // Chrome's helper processes can still be writing to the profile
  rmSync(profile, {
    recursive: true,
    force: true,
    maxRetries: 10,
    retryDelay: 100
  });
  server.close();
}

if (problems.length > 0) {
  console.error('\nThe README examples do not work:\n');
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log('\nEvery README example works.');
