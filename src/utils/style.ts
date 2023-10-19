/**
 * Generate a style element based on the provided CSS styles.
 *
 * @param {string | undefined} style - The CSS styles to include in the style element.
 * @returns {string} - The style element as a string or an empty string if no styles are provided.
 */
export const getStyle = (style: string | undefined): string => {
  if (style) {
    return `<style type="text/css">
    ${style}
  </style>`;
  }
  return '';
};
