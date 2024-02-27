import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getBlobURL } from '../blob';


describe('getBlobURL', () => {
  it('should generate a Blob URL with the specified HTML content and MIME type', () => {
    const html = '<div>Hello, World!</div>';
    const type = 'text/html';
    const result = getBlobURL(html, type);

    assert.strictEqual(typeof result, 'string');
    assert.ok(result.startsWith('blob:'));
  });

  it('should generate a Blob URL with different HTML content and MIME type', () => {
    const html = '<p>This is a test.</p>';
    const type = 'text/plain';
    const result = getBlobURL(html, type);

    assert.strictEqual(typeof result, 'string');
    assert.ok(result.startsWith('blob:'));
  });

  it('should handle HTML content with special characters', () => {
    const html = '<h1>&lt;Hello, World!&gt;</h1>';
    const type = 'text/html';
    const result = getBlobURL(html, type);

    assert.strictEqual(typeof result, 'string');
    assert.ok(result.startsWith('blob:'));
  });

  it('should handle different MIME types', () => {
    const html = '<div>Testing MIME types</div>';
    const type = 'image/jpeg';
    const result = getBlobURL(html, type);

    assert.strictEqual(typeof result, 'string');
    assert.ok(result.startsWith('blob:'));
  });
});
