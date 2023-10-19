import { FrameportOptions } from 'types';
import { create } from 'utils/create';

/**
 * Generate an iframe with the given options and append it to a target element.
 *
 * @param {HTMLElement} targetElement - The target HTML element to append the iframe to.
 * @param {FrameportOptions} options - The options for generating the iframe.
 * @returns {void}
 */
export const generate = (
  targetElement: HTMLElement,
  options: FrameportOptions
): void => {
  const { width } = options;

  if (!width) return;

  const iframeElement = create(options);

  targetElement.append(iframeElement);
};
