import { domReady, lazy, manual, activate } from 'config/browser';
import dom from 'features/dom';
import { getHeaders } from 'utils/headers';

export const modes = {
  domReady,
  lazy,
  manual,
  activate,
};

const frameport = () => {
  document
    .querySelectorAll('[data-frameport-iframe]')
    .forEach((iframe) => iframe.remove());

  const elsToBeTransformedTemplate = document.querySelectorAll('[data-frameport]');

  elsToBeTransformedTemplate.forEach((targetElement: HTMLElement) => {
    const {
      dataset: {
        frameportTemplate: templateSelector,
        frameportVh: height,
        frameportVw: width,
        frameportCss: css,
        frameportStyle: style,
        frameportCode: code,
        frameportJs: javascript,
        frameportClass: className,
        frameportHeaders: headers,
        frameportViewports: viewports,
      },
    } = targetElement;

    let html = targetElement.innerHTML;
    let templateElementToUse = targetElement;

    if (templateSelector) {
      const templateElement = document.querySelector(templateSelector);

      if (templateElement) {
        html = templateElement.innerHTML;
        templateElementToUse = templateElement as HTMLElement;
      }
    }

    const options = {
      templateSelector,
      templateElement: templateElementToUse,
      height,
      width,
      html,
      css,
      style,
      code,
      javascript,
      className,
      headers: getHeaders(headers),
      viewports,
    };

    dom(targetElement, options);
  });
};

export default frameport;

activate(frameport);
