export const isElement = obj => !!(obj && obj.nodeType === 1);

export const getElement = el => {
  if (typeof el === 'string') {
    return document.querySelector(el);
  } else if (isElement(el)) {
    return el;
  }

  return null;
};

export const HIDE_TEMPLATE_STYLE = [
  'clip: rect(1px, 1px, 1px, 1px);',
  'height: 1px;',
  'margin: 0;',
  'overflow: hidden;',
  'position: absolute;',
  'width: 1px;'
].join(' ');

export const DEFAULT_HEADERS = [
  '<meta charset="utf-8" />',
  '<meta name="robots" content="none" />',
  '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />',
  '<meta name="viewport" content="width=device-width, initial-scale=1" />'
];

export const createIframe = () => document.createElement('iframe');

export const getHeaders = rdeHeaders => {
  let headers = [...DEFAULT_HEADERS];
  if (rdeHeaders) {
    if (Array.isArray(rdeHeaders)) {
      headers = [...headers, ...rdeHeaders];
    } else if (rdeHeaders.indexOf(',') !== -1) {
      headers = [...headers, ...rdeHeaders.split(',')];
    } else if (rdeHeaders !== '') {
      headers.push(rdeHeaders);
    }
  }
  return headers;
};

export const getBlobURL = (html, type) => {
  const blob = new Blob([html], { type });
  return URL.createObjectURL(blob);
};

export const getCSS = css => {
  if (css) {
    return `<link rel="stylesheet" type="text/css" href="${window.location.protocol}//${window.location.host}${css}" />`;
  }
  return '';
};

export const getJavaScript = javascript => {
  if (javascript) {
    // eslint-disable-next-line no-useless-escape
    return `<script src="${window.location.protocol}//${window.location.host}${javascript}"><\/script>`;
  }
  return '';
};

export const getSource = options => {
  let { html, style, css, code, javascript, headers = [] } = options;

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

export const getGeneratedPageURL = options => {
  const source = getSource(options);

  return getBlobURL(source, 'text/html');
};
