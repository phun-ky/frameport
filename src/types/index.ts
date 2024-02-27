/**
 * Represents options for creating a Responsive Documentation Example.
 *
 * @interface FrameportOptions
 */
export interface FrameportOptions {
  /**
   * The html you want to use in the viewport example
   *
   * @type {string}
   */
  html: string;

  /**
   * The height of the viewport, either as a string (e.g., '400') or a number (e.g., 400)
   *
   * @type {string | number}
   */
  height?: string | number;

  /**
   * The width of the viewport, either as a string (e.g., '600') or a number (e.g., 600)
   *
   * @type {string | number}
   */
  width?: string | number;

  /**
   * Class names to be given the generated iframe
   *
   * @type {string}
   */
  className?: string;

  /**
   * Inline styles (CSS) to be inserted into a `<style>` -tag in the `<head>`-tag of the generated html
   *
   * @type {string}
   * @example
   * ```ts
   * const options = {
   *   …
   *   style: 'button{ color: white;}',
   *   …
   * };
   * ```
   */
  style?: string;

  /**
   * A CSS file to be appended to the `<head>`-tag of the generated html
   *
   * **NOTE! This needs to be on the same domain and relative to root!**
   * @example
   * ```ts
   * const options = {
   *   …
   *   css: '/dist/yourcss.css',
   *   …
   * };
   * ```
   *
   * @type {string}
   */
  css?: string;

  /**
   * Custom JavaScript code to be inserted into a `<script>`-tag in the `<body>`-tag in the generated html
   *
   * @type {string}
   */
  code?: string;

  /**
   * A JavaScript file to be inserted in the `<body>`-tag of the generated html
   *
   * **NOTE! This needs to be on the same domain and relative to root!**
   * @example
   * ```ts
   * const options = {
   *   …
   *   javascript: '/dist/yourjs.js',
   *   …
   * };
   * ```
   *
   * @type {string}
   */
  javascript?: string;

  /**
   * An array of HTTP headers to include when fetching the HTML content
   *
   * @type {string[]}
   */
  headers?: string[];
  /**
   * The viewports to generate for examples. This is a string `wxh` for example: `375x667`. If you want more viewports, you can separate them with a comma: `375x667,360x740,768x1024`
   * @example
   * ```ts
   * const options = {
   *   …
   *   viewports: `375x667,360x740,768x1024`,
   *   …
   * };
   * ```
   *
   * @type {string}
   */
  viewports?: string;
  /**
   * Selector to the template
   *
   * @type {string}
   */
  templateSelector?: string;
  /**
   * Template element
   *
   * @type {HTMLElement}
   */
  templateElement?: HTMLElement;
  /**
   * To identify this as a target to use to generate the responsive examples
   *
   * @type {string}
   */
  target?: string;
}

/**
 * Example usage:
 * ```ts
 * const options: FrameportOptions = {
 *   html: '<div>Hello, World!</div>',
 *   height: '300',
 *   width: 400,
 *   className: 'my-embed',
 *   style: 'color: blue;',
 *   css: '.my-embed { background-color: yellow; }',
 *   code: 'console.log("Embedded content");',
 *   javascript: '/dummy.js',
 *   headers: ['Authorization: Bearer Token']
 * };
 * ```
 */

export type FrameportFunctionType = () => void;

export {};

/**
 * Extends the global Window interface to add custom properties.
 */
declare global {
  interface Window {
    /**
     * Represents the frameport object for additional functionality.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    frameport: any;
  }
}
