import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';

import frameport from '../main';

describe('frameport', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should not duplicate iframes when called again', () => {
    document.body.innerHTML = `
      <div data-frameport data-frameport-vw="320"><p>One</p></div>
      <div data-frameport data-frameport-viewports="100x100,200x200"><p>Two</p></div>
    `;

    frameport();
    assert.equal(document.querySelectorAll('iframe').length, 3);

    frameport();
    assert.equal(document.querySelectorAll('iframe').length, 3);
  });
});
