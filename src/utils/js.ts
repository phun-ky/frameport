/**
 * Generate a script tag for the specified JavaScript file.
 *
 * @param {string | undefined} javascript - The path to the JavaScript file.
 * @returns {string} - The generated script tag or an empty string if no JavaScript path is provided.
 */
export const getJavaScript = (javascript: string | undefined): string => {
  if (javascript) {
    return `<script src="${window.location.protocol}//${window.location.host}${javascript}"></script>`;
  }
  return '';
};
