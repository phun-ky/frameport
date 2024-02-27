import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getStyle } from '../style';

describe('getStyle', () => {
  it('should return an empty string when no styles are provided', () => {
    const result = getStyle(undefined);

    assert.equal(result, '');
  });

  it('should return the correct style element when styles are provided', () => {
    const styles = 'body { background-color: #fff; }';
    const result = getStyle(styles);
    const expected = `<style type="text/css">${styles}</style>`;

    assert.equal(result, expected);
  });

  it('should handle empty string as input and return an empty style element', () => {
    const result = getStyle('');

    assert.equal(result, '');
  });

  it('should handle valid styles with extra spaces and return the correct style element', () => {
    const styles = 'body   {   background-color:   #fff;   }';
    const result = getStyle(styles);
    const expected = `<style type="text/css">${styles.trim()}</style>`;

    assert.equal(result, expected);
  });
});
