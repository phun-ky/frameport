import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getCSS } from '../css';


describe('getCSS', () => {
  it('should generate a CSS link tag with the correct CSS file URL', () => {
    const cssPath = '/path/to/styles.css';
    const result = getCSS(cssPath);
    const expected = `<link rel="stylesheet" type="text/css" href="http://localhost:3000${cssPath}" />`;

    assert.strictEqual(result, expected);
  });

  it('should return an empty string when no CSS file URL is provided', () => {
    const result = getCSS(undefined);

    assert.strictEqual(result, '');
  });

  it('should handle an empty string as input and return an empty CSS link tag', () => {
    const result = getCSS('');

    assert.strictEqual(result, '');
  });

  it('should handle valid path with extra spaces and return the correct CSS link tag', () => {
    const cssPath = '  /path/to/styles.css   ';
    const result = getCSS(cssPath);
    const expected = `<link rel="stylesheet" type="text/css" href="http://localhost:3000${cssPath.trim()}" />`;

    assert.strictEqual(result, expected);
  });
});
