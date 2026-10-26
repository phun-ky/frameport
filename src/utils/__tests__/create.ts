import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { create } from '../create';

describe('create', () => {
  it('should mark the iframe so frameport() can remove it again', () => {
    const iframe = create({ html: '<p>Hello</p>', width: '320' });

    assert.ok(iframe.hasAttribute('data-frameport-iframe'));
  });
});
