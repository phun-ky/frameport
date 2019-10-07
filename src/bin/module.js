import { getHeaders, createIframe, getGeneratedPageURL } from '../lib/helpers';

const fromTarget = (target, options) => {
  if (!target || !options || (options && Object.keys(options).length === 0)) return;

  const { html, vh, vw, className, headers } = options;

  if (!vw || !html || (html && html === '')) return;

  options.headers = getHeaders(headers);

  const iframe = createIframe();
  const iframeStyle = [];

  if (!className || className === '') {
    iframeStyle.push('border: none;');
  }

  iframeStyle.push(`width: ${vw}px;`);

  if (vh) {
    iframeStyle.push(`height: ${vh}px;`);
  }

  const url = getGeneratedPageURL(options);

  iframe.setAttribute('data-rde-iframe', '');
  iframe.style = iframeStyle.join(' ');
  iframe.class = className;
  iframe.src = url;

  target.append(iframe);
};

export default fromTarget;
