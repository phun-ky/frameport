import { getBlobURL } from './blob';
import { getSource } from './source';

/**
 * Get the URL of a generated HTML page based on the provided options.
 *
 * @param {object} options - The options for generating the HTML page.
 * @returns {string} - The URL of the generated HTML page as a Blob URL.
 */
export const getGeneratedPageURL = (options) => {
  const source = getSource(options);

  return getBlobURL(source, 'text/html');
};
