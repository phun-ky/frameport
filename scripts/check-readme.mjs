// Run every html and javascript example in README.md in headless Chrome
// against the built files, and check it renders the number of iframes its
// "Renders N iframes" comment says, that each iframe can be seen, and that
// the page throws no errors. CDN script URLs must point at the published UMD
// build. Run after `npm run build`. Set CHROME to the browser binary if it
// isn't google-chrome.
import { execFile } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CHROME = process.env.CHROME ?? 'google-chrome';
// Asynchronous, so the server below can answer the browser meanwhile
const run = promisify(execFile);
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
// Reports the iframes once rendering has settled
const REPORT = `<script>
  setTimeout(() => {
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

    const { stdout: dom } = await run(
      CHROME,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--window-size=1400,1200',
        '--virtual-time-budget=5000',
        '--dump-dom',
        `${origin}${path}`
      ],
      { encoding: 'utf8', timeout: 60_000 }
    );
    const attribute = dom.match(/data-result="([^"]*)"/);

    if (!attribute) {
      problems.push(`${where}: the page did not finish`);
      continue;
    }

    const result = JSON.parse(attribute[1].replaceAll('&quot;', '"'));

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
  server.close();
}

if (problems.length > 0) {
  console.error('\nThe README examples do not work:\n');
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log('\nEvery README example works.');
