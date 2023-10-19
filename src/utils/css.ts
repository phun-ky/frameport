/**
 * Generate a CSS link tag based on the provided URL.
 *
 * @param {string | undefined} css - The URL of the CSS file.
 * @returns {string} - A CSS link tag.
 */
export const getCSS = (css: string | undefined): string => {
  if (css) {
    return `<link rel="stylesheet" type="text/css" href="${window.location.protocol}//${window.location.host}${css}" />`;
  }
  return '';
};
