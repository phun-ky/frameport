import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { create } from '../create';

describe('create', () => {
  it('should mark the iframe so frameport() can remove it again', () => {
    const iframe = create({ html: '<p>Hello</p>', width: '320' });

    assert.ok(iframe.hasAttribute('data-frameport-iframe'));
  });

  it('should set the size, and no border without a class name', async () => {
    const iframe = create({ html: '<p>Hello</p>', width: '320', height: 200 });

    await new Promise(requestAnimationFrame);
    assert.equal(iframe.style.width, '320px');
    assert.equal(iframe.style.height, '200px');
    assert.equal(iframe.style.borderStyle || iframe.style.border, 'none');
  });

  it('should add the class name instead of removing the border', async () => {
    const iframe = create({
      html: '<p>Hello</p>',
      width: '320',
      className: 'preview'
    });

    await new Promise(requestAnimationFrame);
    assert.ok(iframe.classList.contains('preview'));
    assert.equal(iframe.style.border, '');
    assert.equal(iframe.style.height, '');
  });
});
