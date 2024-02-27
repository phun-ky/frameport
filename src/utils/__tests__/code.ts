import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getCode } from '../code';

describe('getCode', () => {
  it('should return an empty string when no code is provided', () => {
    const result = getCode(undefined);

    assert.strictEqual(result, '');
  });

  it('should generate a script element with the provided code', () => {
    const code = 'console.log("Hello, World!");';
    const result = getCode(code);
    const expected = `<script>${code}</script>`;

    assert.strictEqual(result, expected);
  });

  it('should handle an empty string as input and return an empty script element', () => {
    const result = getCode('');

    assert.strictEqual(result, '');
  });

  it('should handle valid code with extra spaces and return the correct script element', () => {
    const code = '  console.log(  "Hello, World!"  );   ';
    const result = getCode(code);
    const expected = `<script>${code.trim()}</script>`;

    assert.strictEqual(result, expected);
  });
});
