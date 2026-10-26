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

  it('should render the content of the template a target points at', async () => {
    document.body.innerHTML = `
      <div id="target" data-frameport data-frameport-template="#template" data-frameport-vw="320"></div>
      <div id="template"><p>From the template</p></div>
    `;

    frameport();

    const template = document.getElementById('template') as HTMLElement;

    assert.equal(document.querySelectorAll('iframe').length, 1);
    // The template is hidden, the target is not
    await new Promise(requestAnimationFrame);
    assert.equal(template.style.position, 'absolute');
  });

  it('should use the target itself when the template is missing', () => {
    document.body.innerHTML =
      '<div data-frameport data-frameport-template="#missing" data-frameport-viewports="100x100"><p>Own</p></div>';

    frameport();
    assert.equal(document.querySelectorAll('iframe').length, 1);
  });

  it('should render nothing without a width or viewports', () => {
    document.body.innerHTML = '<div data-frameport><p>No size</p></div>';

    frameport();
    assert.equal(document.querySelectorAll('iframe').length, 0);
  });

  it('should skip elements that are not HTML elements', () => {
    document.body.innerHTML =
      '<svg data-frameport data-frameport-vw="320"><text>SVG</text></svg>';

    frameport();
    assert.equal(document.querySelectorAll('iframe').length, 0);
  });
});
