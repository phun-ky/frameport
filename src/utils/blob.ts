/**
 * Generates a Blob URL from HTML content with the specified MIME type.
 *
 * @param {string} html - The HTML content to create a Blob from.
 * @param {string} type - The MIME type of the Blob (e.g., 'text/html', 'image/jpeg').
 * @returns {string} - The generated Blob URL.
 */
export const getBlobURL = (html: string, type: string): string => {
  const blob = new Blob([html], { type });

  return URL.createObjectURL(blob);
};
