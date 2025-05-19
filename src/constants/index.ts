/**
 * @constant
 * @description
 * Inline style used to visually hide an element from layout and screen readers,
 * often used to hide `<template>` elements or accessibility-hidden content.
 *
 * Mimics techniques commonly recommended for a11y-invisible content without removing from DOM.
 *
 * @type {{ clip: string, height: string, margin: string, overflow: string, position: string, width: string }}
 *
 * @example
 * ```ts
 * element.style = { ...HIDE_TEMPLATE_STYLE };
 * ```
 */
export const HIDE_TEMPLATE_STYLE: {
  clip: string;
  height: string;
  margin: string;
  overflow: string;
  position: string;
  width: string;
} = {
  clip: 'rect(1px, 1px, 1px, 1px)',
  height: '1px',
  margin: '0',
  overflow: 'hidden',
  position: 'absolute',
  width: '1px'
};

/**
 * @constant
 * @description
 * Default `<meta>` tags to inject into a dynamically created HTML document.
 * Ensures consistent encoding, responsive layout, and no indexing by robots.
 *
 * Useful when rendering sandboxed `<iframe>` content or initializing virtual DOMs.
 *
 * @type {string[]}
 *
 * @example
 * ```ts
 * const headHtml = DEFAULT_HEADERS.join('\n');
 * iframeDoc.head.innerHTML = headHtml;
 * ```
 */
export const DEFAULT_HEADERS: string[] = [
  '<meta charset="utf-8" />',
  '<meta name="robots" content="none" />',
  '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />',
  '<meta name="viewport" content="width=device-width, initial-scale=1" />'
];
