/* eslint-disable import/no-unused-modules */
import { domReady, lazy, manual, activate } from './config/browser';
import dom from './features/dom';
import { getHeaders } from './utils/headers';

/**
 * Available initialization modes for frameport usage.
 * Can be triggered manually or via browser lifecycle hooks.
 */
export const modes = {
  domReady,
  lazy,
  manual,
  activate
};

/**
 * Transforms all DOM elements marked with `[data-frameport]` into embedded iframes
 * with sandboxed content based on HTML templates and associated metadata.
 *
 * Also removes any existing `[data-frameport-iframe]` elements from the document,
 * ensuring re-renders are clean.
 *
 * Reads attributes such as:
 * - `data-frameport-template`
 * - `data-frameport-css`
 * - `data-frameport-style`
 * - `data-frameport-code`
 * - `data-frameport-js`
 * - `data-frameport-class`
 * - `data-frameport-headers`
 * - `data-frameport-viewports`
 * - `data-frameport-vh`
 * - `data-frameport-vw`
 *
 * @example
 * ```html
 * <div
 *   data-frameport
 *   data-frameport-template="#my-template"
 *   data-frameport-vh="100"
 *   data-frameport-vw="100"
 *   data-frameport-css="styles.css"
 *   data-frameport-js="script.js"
 * ></div>
 *
 * <template id="my-template">
 *   <h1>Hello, sandbox!</h1>
 * </template>
 * ```
 *
 * @function frameport
 * @returns void
 */
const frameport = () => {
  // Remove all generated iframes first
  document
    .querySelectorAll('[data-frameport-iframe]')
    .forEach((iframe) => iframe.remove());

  // Find all frameport targets
  const elsToBeTransformedTemplate =
    document.querySelectorAll('[data-frameport]');

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
        frameportViewports: viewports
      }
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
      viewports
    };

    dom(targetElement, options);
  });
};

export default frameport;

// Automatically activate frameport logic
activate(frameport);
