import fc from 'fast-check';

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { DEFAULT_HEADERS } from '../../constants';
import { getHeaders } from '../headers';

const DEFAULTS = [...DEFAULT_HEADERS];
// Commas would split one header into several in the string form
const header = fc.string().filter((value) => !value.includes(','));
const headers = fc.array(header);

describe('getHeaders properties', () => {
  it('starts with the default headers and never changes them', () => {
    fc.assert(
      fc.property(fc.oneof(headers, fc.string()), (custom) => {
        const result = getHeaders(custom);

        assert.deepEqual(result.slice(0, DEFAULTS.length), DEFAULTS);
        assert.deepEqual(DEFAULT_HEADERS, DEFAULTS);
      })
    );
  });

  it('adds every custom header in order, trimmed', () => {
    fc.assert(
      fc.property(headers, (custom) => {
        assert.deepEqual(
          getHeaders(custom).slice(DEFAULTS.length),
          custom.map((value) => value.trim())
        );
      })
    );
  });

  it('gives the same headers for a list and its comma separated string', () => {
    fc.assert(
      fc.property(
        // An empty string means no headers, while [''] is one empty header
        headers.filter((custom) => custom.join(',') !== ''),
        (custom) => {
          assert.deepEqual(getHeaders(custom.join(',')), getHeaders(custom));
        }
      )
    );
  });
});
