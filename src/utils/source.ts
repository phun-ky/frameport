import { type FrameportOptionsInterface } from '../types';

import { getCode } from './code';
import { getCSS } from './css';
import { getJavaScript } from './js';
import { getStyle } from './style';

/**
 * Generate the source code for an HTML page based on the provided options.
 *
 * @param {FrameportOptionsInterface} options - The options for generating the HTML page source.
 * @returns {string} - The generated HTML source code as a string.
 */
export const getSource = (options: FrameportOptionsInterface): string => {
  let { style, css, code, javascript } = options;

  const { html, headers = [] } = options;

  css = getCSS(css);
  javascript = getJavaScript(javascript);
  code = getCode(code);
  style = getStyle(style);

  return `<!DOCTYPE html>
<html>
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
