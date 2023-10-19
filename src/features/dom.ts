import { generate } from 'config/generate';
import { generateViewports } from 'config/generate-viewports';
import { FrameportOptions } from 'types';
import { HIDE_TEMPLATE_STYLE } from 'utils/constants';
import { add as addStyles } from 'utils/styles';

/**
 * Generate iframes into the DOM, possibly generating viewports.
 *
 * @param {HTMLElement} targetElement - The target HTML element.
 * @param {FrameportOptions} options - The options for the iframe.
 * @returns {void}
 */
const dom = (
  targetElement: HTMLElement,
  options: FrameportOptions
): void => {
  if (
    !targetElement ||
    !options ||
    (options && Object.keys(options).length === 0)
  )
    return;

  const { html, viewports, templateElement } = options;

  if (!html || html === '') return;

  addStyles(templateElement as HTMLElement, HIDE_TEMPLATE_STYLE);

  if (viewports) {
    generateViewports(targetElement, options);
  } else {
    generate(targetElement, options);
  }
};

export default dom;
