import { getCode } from './code';
import { getCSS } from './css';
import { getJavaScript } from './js';
import { FrameportOptions } from '../types';
import { getStyle } from './style';

/**
 * Generate the source code for an HTML page based on the provided options.
 *
 * @param {FrameportOptions} options - The options for generating the HTML page source.
 * @returns {string} - The generated HTML source code as a string.
 */
export const getSource = (options: FrameportOptions): string => {
  let { html, style, css, code, javascript, headers = [] } = options;

  css = getCSS(css);
  javascript = getJavaScript(javascript);
  code = getCode(code);
  style = getStyle(style);

  return `<html>
  <head>
    ${headers.join('\n')}
    ${style}
    ${css}
  </head>
  <body>
    ${html || ''}
    ${javascript}
    ${code}
  </body>
</html>`;
};
