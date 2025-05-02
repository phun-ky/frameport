import { generate } from '../config/generate';
import { generateViewports } from '../config/generate-viewports';
import { HIDE_TEMPLATE_STYLE } from '../constants';
import { type FrameportOptionsInterface } from '../types';
import { add as addStyles } from '../utils/styles';

/**
 * Generate iframes into the DOM, possibly generating viewports.
 *
 * @param {HTMLElement} targetElement - The target HTML element.
 * @param {FrameportOptionsInterface} options - The options for the iframe.
 * @returns {void}
 */
const dom = (
  targetElement: HTMLElement,
  options: FrameportOptionsInterface
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
