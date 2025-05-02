import { type FrameportOptionsInterface } from '../types';
import { createIframe } from '../utils/iframe';
import { getGeneratedPageURL } from '../utils/page';
import { add as addStyles } from '../utils/styles';

/**
 * Create an iframe element with specified options and styles.
 *
 * @param {FrameportOptionsInterface} options - The options for creating the iframe.
 * @returns {HTMLIFrameElement} - The created iframe element.
 */
export const create = (
  options: FrameportOptionsInterface
): HTMLIFrameElement => {
  const { className, height, width } = options;
  const url = getGeneratedPageURL(options);
  const iframeElement = createIframe();
  const iframeStyle = {};

  iframeElement.src = url;
  iframeElement.setAttribute('data-rde-iframe', '');

  if (!className || className === '') {
    iframeStyle['border'] = 'none';
  } else {
    iframeElement.classList.add(className);
  }

  iframeStyle['width'] = `${width}px`;

  if (height) {
    iframeStyle['height'] = `${height}px`;
  }

  addStyles(iframeElement, iframeStyle);

  return iframeElement;
};
