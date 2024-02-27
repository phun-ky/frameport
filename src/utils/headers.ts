import { DEFAULT_HEADERS } from '../constants';

/**
 * Get headers for the iframe generated
 *
 * @param {string|string[]|null|undefined} rdeHeaders - The custom headers to include.
 * @returns {string[]} - An array of headers, including default and custom headers.
 */
export const getHeaders = (rdeHeaders: string | string[] | null | undefined): string[] => {
  let headers: string[] = [...DEFAULT_HEADERS];

  if (rdeHeaders) {
    if (Array.isArray(rdeHeaders)) {
      headers = [...headers, ...rdeHeaders].map(h => h.trim());
    } else if (rdeHeaders.indexOf(',') !== -1) {
      headers = [...headers, ...rdeHeaders.split(',')].map(h => h.trim());
    } else if (rdeHeaders !== '') {
      headers.push(rdeHeaders.trim());
    }
  }

  return headers;
};
