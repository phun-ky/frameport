import { type FrameportOptionsInterface } from '../types';
import { create } from '../utils/create';

/**
 * Generate an iframe with the given options and append it to a target element.
 * When the target is its own template, it is hidden, so the iframe goes right
 * after it instead.
 *
 * @param {HTMLElement} targetElement - The target HTML element to append the iframe to.
 * @param {FrameportOptionsInterface} options - The options for generating the iframe.
 * @returns {void}
 */
export const generate = (
  targetElement: HTMLElement,
  options: FrameportOptionsInterface
): void => {
  const { width, templateElement } = options;

  if (!width) return;

  const iframeElement = create(options);

  if (templateElement === targetElement) {
    targetElement.insertAdjacentElement('afterend', iframeElement);
  } else {
    targetElement.append(iframeElement);
  }
};
