import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { DEFAULT_HEADERS } from '../../constants';
import { getHeaders } from '../headers';


describe('getHeaders', () => {
  it('should return default headers when no custom headers are provided', () => {
    const result = getHeaders(null);

    assert.deepStrictEqual(result, DEFAULT_HEADERS);
  });

  it('should include custom headers when provided as a string', () => {
    const customHeaders = 'Authorization: Bearer Token, Content-Type: application/json';
    const result = getHeaders(customHeaders);
    const expected = [...DEFAULT_HEADERS, ...customHeaders.split(',')].map(h => h.trim());

    assert.deepStrictEqual(result, expected);
  });

  it('should include custom headers when provided as an array', () => {
    const customHeaders = ['Authorization: Bearer Token', 'Content-Type: application/json'];
    const result = getHeaders(customHeaders);
    const expected = [...DEFAULT_HEADERS, ...customHeaders].map(h => h.trim());

    assert.deepStrictEqual(result, expected);
  });

  it('should handle empty string as custom headers and return default headers', () => {
    const result = getHeaders('');

    assert.deepStrictEqual(result, DEFAULT_HEADERS);
  });

  it('should handle custom headers with extra spaces and return the correct headers', () => {
    const customHeaders = '   Authorization: Bearer Token,  Content-Type: application/json   ';
    const result = getHeaders(customHeaders);
    const expected = [...DEFAULT_HEADERS, ...customHeaders.split(',')].map(h => h.trim());

    assert.deepStrictEqual(result, expected);
  });
});
