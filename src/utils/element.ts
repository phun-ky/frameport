/**
 * Check if an object is an HTML element.
 *
 * @param {any} obj - The object to check.
 * @returns {boolean} - True if the object is an HTML element, false otherwise.
 */
export const isElement = (obj: any): boolean => !!(obj && obj.nodeType === 1);

/**
 * Get an HTML element based on a selector string or an existing element.
 *
 * @param {string | HTMLElement} el - The selector string or HTML element.
 * @returns {HTMLElement | null} - The selected HTML element, or null if not found.
 */
export const getElement = (el: string | HTMLElement): HTMLElement | null => {
  if (typeof el === 'string') {
    return document.querySelector(el);
  } else if (isElement(el)) {
    return el;
  }

  return null;
};
