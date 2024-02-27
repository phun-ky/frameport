/* eslint no-console:0 */
import dom from '../features/dom';
import { FrameportFunctionType } from '../types';
import { getHeaders } from '../utils/headers';

/**
 * A function to initialize frameport when the DOM is ready.
 *
 * @param {FrameportFunctionType} frameport - The frameport function to execute.
 *
 * @example
 * ```ts
 * // Usage example:
 * // domReady(myRDE);
 * ```
 */
export const domReady = (frameport: FrameportFunctionType): void => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      frameport();
    });
  } else {
    // `DOMContentLoaded` already fired
    frameport();
  }
};

/**
 * A function to initialize lazy frameport functionality.
 *
 * @example
 * ```ts
 * // Usage example:
 * // lazy();
 * ```
 */
export const lazy = (): void => {
  const frameportObserverTarget = new IntersectionObserver((els, observer) => {
    els.forEach((el: IntersectionObserverEntry) => {
      if (el.intersectionRatio > 0) {
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
        } = el.target as HTMLElement;

        let html = el.target.innerHTML;
        let templateElementToUse = el.target as HTMLElement;

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

        dom(el.target as HTMLElement, options);
        observer.unobserve(el.target);
      }
    });
  });

  document.querySelectorAll('[data-frameport]').forEach((el) => {
    frameportObserverTarget.observe(el);
  });
};

/**
 * A function to manually activate frameport.
 *
 * @param {FrameportFunctionType} frameport - The frameport function to execute.
 *
 * @example
 * ```ts
 * // Usage example:
 * // manual(myRDE);
 * ```
 */
export const manual = (frameport: FrameportFunctionType): void => {
  window.frameport = frameport;
};

/**
 * A function to activate frameport based on script attributes.
 *
 * @param {FrameportFunctionType} frameport - The frameport function to execute.
 *
 * @example
 * ```ts
 * // Usage example:
 * // activate(myRDE);
 * ```
 */
export const activate = (frameport: FrameportFunctionType): void => {
  const script = document.currentScript;

  if (script) {
    const frameportScriptSrc = script.getAttribute('src');

    if (frameportScriptSrc && frameportScriptSrc.includes('frameport.js')) {
      if (script.hasAttribute('data-manual')) {
        manual(frameport);
      } else if (script.hasAttribute('data-instant')) {
        frameport();
      } else if (script.hasAttribute('data-dom')) {
        domReady(frameport);
      } else if (script.hasAttribute('data-lazy')) {
        lazy();
      } else {
        domReady(frameport);
      }
    }
  }
};
