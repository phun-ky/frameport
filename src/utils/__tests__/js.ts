import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getJavaScript } from '../js';

// Mock window.location for testing purposes
// global.window = {
//   location: {
//     protocol: 'http:',
//     host: 'localhost:3000'
//   }
// };

describe('getJavaScript', () => {
  it('should generate a script tag with the correct JavaScript file path', () => {
    const javascriptPath = '/path/to/script.js';
    const result = getJavaScript(javascriptPath);
    const expected = `<script src="http://localhost:3000${javascriptPath.trim()}"></script>`;

    assert.strictEqual(result, expected);
  });

  it('should return an empty string when no JavaScript path is provided', () => {
    const result = getJavaScript(undefined);

    assert.strictEqual(result, '');
  });

  it('should handle an empty string as input and return an empty script tag', () => {
    const result = getJavaScript('');

    assert.strictEqual(result, '');
  });

  it('should handle valid path with extra spaces and return the correct script tag', () => {
    const javascriptPath = '  /path/to/script.js   ';
    const result = getJavaScript(javascriptPath);
    const expected = `<script src="http://localhost:3000${javascriptPath.trim()}"></script>`;

    assert.strictEqual(result, expected);
  });
});
