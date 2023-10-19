import { FrameportOptions } from 'types';
import { create } from 'utils/create';

/**
 * Generate multiple iframe elements for different viewports and append them to a target element.
 *
 * @param {HTMLElement} target - The target HTML element to insert iframes after.
 * @param {FrameportOptions} options - The options for generating the iframes.
 * @returns {void}
 */
export const generateViewports = (
  target: HTMLElement,
  options: FrameportOptions
): void => {
  const { viewports } = options;

  if (!viewports || viewports === '') return;

  let screens: string[] = [];

  if (viewports.indexOf(',') !== -1) {
    screens = [...screens, ...viewports.split(',')];
  } else {
    screens.push(viewports);
  }

  screens.forEach((viewPort: string) => {
    const values = viewPort.split('x');
    const width = values[0];
    const height = values[1];

    const iframeElement = create({ ...options, height, width });

    target.insertAdjacentElement('afterend', iframeElement);
  });
};
