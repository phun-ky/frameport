import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { FrameportOptions } from '../../types';
import { getSource } from '../source';

describe('getSource', () => {
  it('should generate basic HTML structure with default options', () => {
    const options = {
      html: '<div>Hello, World!</div>'
    };
    const result = getSource(options);
    const expected = `<!DOCTYPE html>
<html>
<head>



</head>
<body>
<div>Hello, World!</div>


</body>
</html>`;

    assert.equal(result, expected);
  });

  it('should include provided CSS, JavaScript, and code in the generated HTML', () => {
    const options = {
      style: 'body { background-color: #fff; }',
      javascript: '/path-to-js.js',
      code: 'alert("Hello, World!");'
    };
    const result = getSource(options as FrameportOptions);
    const expected = `<!DOCTYPE html>
<html>
<head>

<style type="text/css">${options.style}</style>

</head>
<body>

<script src="http://localhost:3000${options.javascript}"></script>
<script>${options.code}</script>
</body>
</html>`;

    assert.equal(result, expected);
  });

  it('should handle missing options and generate minimal HTML structure', () => {
    const options = {};
    const result = getSource(options as FrameportOptions);
    const expected = `<!DOCTYPE html>
<html>
<head>



</head>
<body>



</body>
</html>`;

    assert.equal(result, expected);
  });

  it('should handle custom headers in the generated HTML', () => {
    const options = {
      headers: ['<meta charset="UTF-8">', '<title>My Page</title>']
    };
    const result = getSource(options as FrameportOptions);
    const expected = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>My Page</title>


</head>
<body>



</body>
</html>`;

    assert.equal(result, expected);
  });
});
