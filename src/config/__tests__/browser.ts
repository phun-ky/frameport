import assert from 'node:assert/strict';
import { describe, it, before, after, afterEach, mock } from 'node:test';

import { activate, domReady, lazy, manual } from '../browser';

/** Make `document.currentScript` return the given element, or null. */
const setCurrentScript = (script: HTMLScriptElement | null): void => {
  Object.defineProperty(document, 'currentScript', {
    configurable: true,
    get: () => script
  });
};
/** Install a fake IntersectionObserver; jsdom has none. Returns a remover. */
const fakeIntersectionObserver = (
  create: (callback: unknown) => object
): (() => void) => {
  (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver =
    function (callback: unknown) {
      return create(callback);
    };

  return () => {
    delete (globalThis as { IntersectionObserver?: unknown })
      .IntersectionObserver;
  };
};
const script = (attributes: Record<string, string>): HTMLScriptElement => {
  const element = document.createElement('script');

  for (const [name, value] of Object.entries(attributes))
    element.setAttribute(name, value);

  return element;
};

describe('activate', () => {
  describe('without a DOM', () => {
    let descriptor: PropertyDescriptor | undefined;

    before(() => {
      // Remove the document global-jsdom registered, as in plain Node
      descriptor = Object.getOwnPropertyDescriptor(globalThis, 'document');
      delete (globalThis as { document?: Document }).document;
    });

    after(() => {
      if (descriptor) Object.defineProperty(globalThis, 'document', descriptor);
    });

    it('should not throw', () => {
      assert.equal(typeof document, 'undefined');
      assert.doesNotThrow(() => activate(() => {}));
    });

    it('should not call frameport', () => {
      let called = false;

      activate(() => {
        called = true;
      });

      assert.equal(called, false);
    });
  });

  describe('with a script element', () => {
    afterEach(() => {
      // Back to jsdom's own getter on the prototype
      delete (document as { currentScript?: unknown }).currentScript;
      delete (window as { frameport?: unknown }).frameport;
    });

    it('should do nothing outside a script', () => {
      const frameport = mock.fn();

      setCurrentScript(null);
      activate(frameport);
      assert.equal(frameport.mock.callCount(), 0);
    });

    it('should do nothing for a script that is not frameport.js', () => {
      const frameport = mock.fn();

      setCurrentScript(script({ src: '/other.js', 'data-instant': '' }));
      activate(frameport);
      assert.equal(frameport.mock.callCount(), 0);
    });

    it('should render right away with data-instant', () => {
      const frameport = mock.fn();

      setCurrentScript(script({ src: '/frameport.js', 'data-instant': '' }));
      activate(frameport);
      assert.equal(frameport.mock.callCount(), 1);
    });

    it('should expose window.frameport with data-manual', () => {
      const frameport = mock.fn();

      setCurrentScript(script({ src: '/frameport.js', 'data-manual': '' }));
      activate(frameport);
      assert.equal(frameport.mock.callCount(), 0);
      assert.equal(window.frameport, frameport);
    });

    for (const attributes of [
      { src: '/frameport.js', 'data-dom': '' },
      { src: '/frameport.js' }
    ] as Record<string, string>[]) {
      it(`should render when the DOM is ready (${Object.keys(attributes).join(', ')})`, () => {
        const frameport = mock.fn();

        // global-jsdom's document has finished loading
        setCurrentScript(script(attributes));
        activate(frameport);
        assert.equal(frameport.mock.callCount(), 1);
      });
    }

    it('should observe the targets with data-lazy', () => {
      const observe = mock.fn();

      const remove = fakeIntersectionObserver(() => ({
        observe,
        unobserve: () => {}
      }));

      document.body.innerHTML = '<div data-frameport></div>';
      setCurrentScript(script({ src: '/frameport.js', 'data-lazy': '' }));
      activate(() => {});
      assert.equal(observe.mock.callCount(), 1);
      document.body.innerHTML = '';
      remove();
    });
  });
});

describe('domReady', () => {
  afterEach(() => {
    delete (document as { readyState?: unknown }).readyState;
  });

  it('should wait for DOMContentLoaded while the document is loading', () => {
    const frameport = mock.fn();

    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => 'loading'
    });
    domReady(frameport);
    assert.equal(frameport.mock.callCount(), 0);
    document.dispatchEvent(new window.Event('DOMContentLoaded'));
    assert.equal(frameport.mock.callCount(), 1);
  });

  it('should render at once when the document has loaded', () => {
    const frameport = mock.fn();

    domReady(frameport);
    assert.equal(frameport.mock.callCount(), 1);
  });
});

describe('manual', () => {
  it('should expose frameport as window.frameport', () => {
    const frameport = (): void => {};

    manual(frameport);
    assert.equal(window.frameport, frameport);
    delete (window as { frameport?: unknown }).frameport;
  });
});

describe('lazy', () => {
  type Callback = (
    entries: Partial<IntersectionObserverEntry>[],
    observer: { unobserve: (target: Element) => void }
  ) => void;

  let callback: Callback;
  let remove: () => void;
  const unobserve = mock.fn();

  before(() => {
    remove = fakeIntersectionObserver((fn) => {
      callback = fn as Callback;

      return { observe: () => {}, unobserve };
    });
  });

  after(() => {
    remove();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    unobserve.mock.resetCalls();
  });

  it('should render a target once it intersects', () => {
    document.body.innerHTML =
      '<div id="target" data-frameport data-frameport-vw="320"><p>Hello</p></div>';

    const target = document.getElementById('target') as HTMLElement;

    lazy();
    callback([{ intersectionRatio: 0, target }], { unobserve });
    assert.equal(document.querySelectorAll('iframe').length, 0);

    callback([{ intersectionRatio: 1, target }], { unobserve });
    assert.equal(document.querySelectorAll('iframe').length, 1);
    assert.equal(unobserve.mock.callCount(), 1);
  });

  it('should use the template a target points at', () => {
    document.body.innerHTML = `
      <div id="target" data-frameport data-frameport-template="#template" data-frameport-vw="320"></div>
      <div id="template"><p>From the template</p></div>`;

    const target = document.getElementById('target') as HTMLElement;

    lazy();
    callback([{ intersectionRatio: 1, target }], { unobserve });

    const iframe = target.querySelector('iframe');

    assert.ok(iframe, 'the iframe is placed inside the target');
  });

  it('should fall back to the target when the template is missing', () => {
    document.body.innerHTML =
      '<div id="target" data-frameport data-frameport-template="#missing" data-frameport-viewports="100x100"><p>Own</p></div>';

    const target = document.getElementById('target') as HTMLElement;

    lazy();
    callback([{ intersectionRatio: 1, target }], { unobserve });
    assert.equal(document.querySelectorAll('iframe').length, 1);
  });
});
