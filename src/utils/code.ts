/**
 * Get a script element containing the provided code if available.
 *
 * @param {string | undefined} code - The code to include in the script element.
 * @returns {string} - The script element or an empty string if code is not available.
 */
export const getCode = (code: string | undefined): string => {
  if (code) {
    return `<script>${code}</script>`;
  }
  return '';
};
