const HIDE_TEMPLATE_STYLE = [
  'clip: rect(1px, 1px, 1px, 1px);',
  'height: 1px;',
  'margin: 0;',
  'overflow: hidden;',
  'position: absolute;',
  'width: 1px;'
].join(' ');

const createIframe = () => document.createElement('iframe');

const getHeaders = rdeHeaders => {
  let headers = [];
  if (rdeHeaders) {
    if (rdeHeaders.indexOf(',') !== -1) {
      headers = [...headers, ...rdeHeaders.split(',')];
    } else if (rdeHeaders !== '') {
      headers.push(rdeHeaders);
    }
  }
  return headers;
};

const getBlobURL = (html, type) => {
  const blob = new Blob([html], { type });
  return URL.createObjectURL(blob);
};

const getCSS = css => {
  if (css) {
    return `<link rel="stylesheet" type="text/css" href="${window.location.protocol}//${window.location.host}${css}" />`;
  }
  return '';
};

const getJavaScript = javascript => {
  if (javascript) {
    // eslint-disable-next-line no-useless-escape
    return `<script src="${window.location.protocol}//${window.location.host}${javascript}"><\/script>`;
  }
  return '';
};

const getSource = options => {
  const DEFAULT_HEADERS = [
    '<meta charset="utf-8" />',
    '<meta name="robots" content="none" />',
    '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />'
  ];
  let { html, style, css, code, javascript, headers = [] } = options;

  headers = [...headers, ...DEFAULT_HEADERS];

  css = getCSS(css);
  javascript = getJavaScript(javascript);

  /*eslint-disable */
  return `<html>
  <head>
    ${headers.join('\n')}
    <style type="text/css">
      ${style || ''}
    </style>
  </head>
  <body>
    ${css}
    ${html || ''}
    ${javascript}
    <script>
      ${code || ''}
    <\/script>
  </body>
</html>`;
  /*eslint-enable */
};

const getGeneratedPageURL = options => {
  const source = getSource(options);

  return getBlobURL(source, 'text/html');
};

const fromTarget = target => {
  if (!target) return;

  const {
    dataset: { rdeTemplate, rdeVh, rdeVw, rdeCss, rdeStyle, rdeCode, rdeJs, rdeClass, rdeHeaders }
  } = target;

  if (!rdeVw || !rdeTemplate) return;

  const template = document.querySelector(rdeTemplate);

  if (!template) return;

  const html = template.innerHTML;

  if (!html || html === '') return;

  template.style = HIDE_TEMPLATE_STYLE;

  let headers = getHeaders(rdeHeaders);

  const options = {
    html,
    style: rdeStyle,
    css: rdeCss,
    code: rdeCode,
    javascript: rdeJs,
    headers
  };

  const iframe = createIframe();
  const style = [];
  if (!rdeClass || rdeClass === '') {
    style.push('border: none;');
  }
  style.push(`width: ${rdeVw}px;`);
  if (rdeVh) {
    style.push(`height: ${rdeVh}px;`);
  }

  const url = getGeneratedPageURL(options);

  iframe.setAttribute('data-rde-iframe', '');
  iframe.style = style.join(' ');
  iframe.class = rdeClass;
  iframe.src = url;

  target.append(iframe);
};

const fromTemplate = template => {
  if (!template) return;

  const {
    dataset: { rdeViewports, rdeCss, rdeStyle, rdeCode, rdeJs, rdeClass, rdeHeaders, rdeNoHeight = false }
  } = template;

  if (!rdeViewports) return;

  const html = template.innerHTML;

  if (!html || html === '') return;

  template.style = HIDE_TEMPLATE_STYLE;

  let viewPorts = [];
  let headers = getHeaders(rdeHeaders);

  if (rdeViewports.indexOf(',') !== -1) {
    viewPorts = [...viewPorts, ...rdeViewports.split(',')];
  } else if (rdeViewports !== '') {
    viewPorts.push(rdeViewports);
  } else {
    viewPorts.push('375x667');
  }

  const options = {
    html,
    style: rdeStyle,
    css: rdeCss,
    code: rdeCode,
    javascript: rdeJs,
    headers
  };

  viewPorts.forEach(viewPort => {
    const iframe = createIframe();
    const values = viewPort.split('x');
    const width = values[0];
    const height = values[1];
    const style = [];
    if (!rdeClass || rdeClass === '') {
      style.push('border: none;');
    }
    style.push(`width: ${width}px;`);
    if (!rdeNoHeight || rdeNoHeight === 'false') {
      style.push(`height: ${height}px;`);
    }

    const url = getGeneratedPageURL(options);

    iframe.setAttribute('data-rde-iframe', '');
    iframe.style = style.join(' ');
    iframe.class = rdeClass;
    iframe.src = url;

    template.insertAdjacentElement('afterend', iframe);
  });
};

const init = () => {
  document.querySelectorAll('[data-rde-iframe]').forEach(iframe => iframe.remove());
  document.querySelectorAll('[data-rde]').forEach(fromTemplate);
  document.querySelectorAll('[data-rde-target]').forEach(fromTarget);
};

init();

document.addEventListener('DOMContentLoaded', init);
