import { HIDE_TEMPLATE_STYLE, getHeaders, createIframe, getGeneratedPageURL } from '../lib/helpers';

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
