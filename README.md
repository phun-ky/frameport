# @phun-ky/frameport

![logo](./public/logo-frameport-colored-package.svg)

> ⚡ Create interactive, responsive component previews for your style guides using real device viewports and media queries.

[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/phun-ky/frameport/badge)](https://scorecard.dev/viewer/?uri=github.com/phun-ky/frameport) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](http://makeapullrequest.com) [![SemVer 2.0](https://img.shields.io/badge/SemVer-2.0-green.svg)](http://semver.org/spec/v2.0.0.html) ![npm version](https://img.shields.io/npm/v/@phun-ky/frameport) ![issues](https://img.shields.io/github/issues/phun-ky/frameport) ![license](https://img.shields.io/npm/l/@phun-ky/frameport) ![size](https://img.shields.io/bundlephobia/min/@phun-ky/frameport) ![npm](https://img.shields.io/npm/dm/%40phun-ky/frameport) ![GitHub Repo stars](https://img.shields.io/github/stars/phun-ky/frameport) [![codecov](https://codecov.io/gh/phun-ky/frameport/graph/badge.svg?token=VA91DL7ZLZ)](https://codecov.io/gh/phun-ky/frameport)

- [@phun-ky/frameport](#phun-kyframeport)
  - [About](#about)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Script tag](#script-tag)
    - [ES modules](#es-modules)
    - [Lazy loading](#lazy-loading)
  - [Examples](#examples)
    - [One width](#one-width)
    - [Several viewports](#several-viewports)
    - [Content from a template](#content-from-a-template)
  - [Attributes](#attributes)
  - [Security](#security)
  - [API](#api)
  - [Demo](#demo)
  - [Contributing](#contributing)
  - [Sponsor me](#sponsor-me)

## About

Frameport helps you embed live, responsive component previews in your documentation or style guide. It generates iframes with your HTML, CSS and JavaScript at the widths you choose, so media queries apply as they would on a real device.

✅ Zero dependencies<br>
✅ Framework agnostic<br>
✅ Real device viewport emulation<br>
✅ Instant iframe-based previews

## Requirements

A browser. The package is ES modules with types included, plus a UMD build for script tags. Importing it in Node (for example during server-side rendering) works and does nothing until `frameport()` is called in a browser; `require()` needs Node 22.12 or later.

## Installation

```sh
npm i @phun-ky/frameport
```

## Usage

Frameport turns every element with a `data-frameport` attribute into one or more iframes. The element's content, or a template, becomes the body of each iframe.

### Script tag

Place the script at the end of the page:

```html
<script src="https://unpkg.com/@phun-ky/frameport/dist/frameport.js"></script>
```

By default it renders when `DOMContentLoaded` fires. Add one of these attributes to the script element to change that:

| Attribute      | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| `data-manual`  | Renders nothing; call `window.frameport()` when you want to render |
| `data-instant` | Renders right away                                                 |
| `data-dom`     | Renders when `DOMContentLoaded` fires (the default)                |
| `data-lazy`    | Renders each element when it scrolls into view                     |

```html
<div data-frameport data-frameport-vw="320">
  <p>Rendered when you call window.frameport()</p>
</div>
<script
  src="https://unpkg.com/@phun-ky/frameport/dist/frameport.js"
  data-manual
></script>
<script>
  window.frameport();
</script>
<!-- Renders 1 iframe -->
```

Calling `frameport()` again removes the iframes it generated and renders them anew.

### ES modules

```javascript
import frameport from '@phun-ky/frameport';

// Render every [data-frameport] element on the page
frameport();
// Renders 1 iframe
```

### Lazy loading

`modes.lazy()` renders each `[data-frameport]` element when it scrolls into view:

```javascript
import { modes } from '@phun-ky/frameport';

modes.lazy();
// Renders 1 iframe
```

## Examples

### One width

The element's content is rendered in an iframe 667 pixels wide and 375 pixels high, placed right after the element. The element itself is hidden.

```html
<div
  data-frameport
  data-frameport-vw="667"
  data-frameport-vh="375"
  data-frameport-style="body { background-color: #84a295; }"
>
  <button type="button">Primary</button>
</div>
<!-- Renders 1 iframe -->
```

### Several viewports

`data-frameport-viewports` takes `widthxheight` pairs separated by commas. The iframes are placed right after the element. In 2.x they come out in reverse order: the last viewport in the list comes first. This changes in 3.0 ([#240](https://github.com/phun-ky/frameport/issues/240)).

```html
<div data-frameport data-frameport-viewports="375x667,360x740,768x1024">
  <main style="height: 100vh">
    <p>Look, I'm in an iframe</p>
  </main>
</div>
<!-- Renders 3 iframes -->
```

### Content from a template

With `data-frameport-template`, the content comes from the element the selector matches, which is then hidden. The iframe is placed inside the `data-frameport` element.

```html
<div
  data-frameport
  data-frameport-template="#button-template"
  data-frameport-vw="667"
  data-frameport-vh="375"
></div>
<div id="button-template">
  <button type="button">Primary</button>
</div>
<!-- Renders 1 iframe -->
```

## Attributes

| Attribute                  | Description                                                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-frameport`           | **Required.** Marks the element to render.                                                                                                                                                  |
| `data-frameport-vw`        | The iframe width in pixels. **Required** unless `data-frameport-viewports` is set.                                                                                                          |
| `data-frameport-vh`        | The iframe height in pixels.                                                                                                                                                                |
| `data-frameport-viewports` | One iframe per `widthxheight` pair, separated by commas, for example `375x667,768x1024`. Replaces `data-frameport-vw` and `data-frameport-vh`.                                              |
| `data-frameport-template`  | A selector for the element whose content to render, instead of the element's own content.                                                                                                   |
| `data-frameport-css`       | A stylesheet path on the same origin, starting with `/`, for example `/dist/styles.css`. Added to the iframe's `<head>`.                                                                    |
| `data-frameport-style`     | CSS added in a `<style>` element in the iframe's `<head>`.                                                                                                                                  |
| `data-frameport-js`        | A script path on the same origin, starting with `/`, for example `/dist/script.js`. Added at the end of the iframe's `<body>`.                                                              |
| `data-frameport-code`      | JavaScript added in a `<script>` element at the end of the iframe's `<body>`.                                                                                                               |
| `data-frameport-class`     | A class name for the generated iframes. Without it, the iframes get `border: none`.                                                                                                         |
| `data-frameport-headers`   | Extra HTML for the iframe's `<head>`, such as `<meta>` or `<link>` elements, separated by commas (so the HTML itself can't contain a comma). Added after frameport's default `<meta>` tags. |

Generated iframes have a `data-frameport-iframe` attribute.

## Security

The iframes load from `blob:` URLs, which share your page's origin, and have no `sandbox` attribute. Code in the rendered content, `data-frameport-code`, `data-frameport-js` and `data-frameport-headers` can read and change your page. Only render content you control, never user input. See [SECURITY.md](https://github.com/phun-ky/frameport/blob/main/SECURITY.md).

## API

Go [here](https://github.com/phun-ky/frameport/blob/main/docs/api/README.md) to read the full API documentation.

## Demo

Click [here for a demo on codepen.io](https://codepen.io/phun-ky/full/MWWWvLm)

## Contributing

If you want to contribute, please read the [CONTRIBUTING.md](https://github.com/phun-ky/frameport/blob/main/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/phun-ky/frameport/blob/main/CODE_OF_CONDUCT.md)

## Sponsor me

I'm an Open Source evangelist, creating stuff that does not exist yet to help get rid of secondary activities and to enhance systems already in place, be it documentation or web sites.

The sponsorship is an unique opportunity to alleviate more hours for me to maintain my projects, create new ones and contribute to the large community we're all part of :)

[Support me with GitHub Sponsors](https://github.com/sponsors/phun-ky).
