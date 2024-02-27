/**
 * Waits for the next animation frame using requestAnimationFrame.
 *
 * @returns {Promise<number>} - A Promise that resolves with the timestamp of the next animation frame.
 *
 * @example
 * ```ts
 * // Wait for the next animation frame and get the rect
 * await waitForFrame();
 * const rect = el.getBoundingClientRect();
 * // Wait for the next animation frame and get the timestamp
 * const timestamp = await waitForFrame();
 * ```
 */
export const waitForFrame = (): Promise<number> =>
  new Promise<number>(requestAnimationFrame);
