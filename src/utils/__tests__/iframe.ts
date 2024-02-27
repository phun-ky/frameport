import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { createIframe } from '../iframe';

describe('createIframe', () => {
  it('should return the created iframe element', () => {
    const iframe = createIframe();

    assert.strictEqual(iframe.tagName, 'IFRAME');
  });

  it('should create a new iframe element each time it is called', () => {
    const iframe1 = createIframe();
    const iframe2 = createIframe();

    assert.notStrictEqual(iframe1, iframe2);
  });
});
