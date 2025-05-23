# @phun-ky/frameport

![logo](./public/logo-frameport-colored-package.svg)

> ⚡ Create interactive, responsive component previews for your style guides using real device viewports and media queries.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](http://makeapullrequest.com) [![SemVer 2.0](https://img.shields.io/badge/SemVer-2.0-green.svg)](http://semver.org/spec/v2.0.0.html) ![npm version](https://img.shields.io/npm/v/@phun-ky/frameport) ![issues](https://img.shields.io/github/issues/phun-ky/frameport) ![license](https://img.shields.io/npm/l/@phun-ky/frameport) ![size](https://img.shields.io/bundlephobia/min/@phun-ky/frameport) ![npm](https://img.shields.io/npm/dm/%40phun-ky/frameport) ![GitHub Repo stars](https://img.shields.io/github/stars/phun-ky/frameport) [![codecov](https://codecov.io/gh/phun-ky/frameport/graph/badge.svg?token=VA91DL7ZLZ)](https://codecov.io/gh/phun-ky/frameport)

- [@phun-ky/frameport](#phun-kyframeport)
  - [About](#about)
  - [Installation \& Setup](#installation--setup)
  - [API](#api)
  - [Demo](#demo)
  - [Options](#options)
  - [Usage](#usage)
    - [Basic usage](#basic-usage)
      - [Typescript](#typescript)
      - [ESM](#esm)
      - [Script](#script)
    - [Advanced usage](#advanced-usage)
      - [Lazy](#lazy)
  - [Features](#features)
    - [Via DOM](#via-dom)
    - [Use templates as a target](#use-templates-as-a-target)
    - [Use targets with different template](#use-targets-with-different-template)
      - [Allowed tags](#allowed-tags)
  - [Contributing](#contributing)
  - [Sponsor me](#sponsor-me)

## About

Frameport helps you embed live, responsive component previews in your documentation or style guide. It works by generating iframes with your HTML/CSS/JS that respect real media queries—so your components behave just like they do in actual devices.

✅ Zero dependencies  
✅ Framework agnostic  
✅ Real device viewport emulation  
✅ Instant iframe-based previews

## Installation & Setup

```shell-session
npm i -S @phun-ky/frameport
```

or with yarn:

```shell-session
yarn add @phun-ky/frameport
```

## API

Go [here](https://github.com/phun-ky/frameport/blob/main/api/README.md) to read the full API documentation.

## Demo

Click [here for a demo on codepen.io](https://codepen.io/phun-ky/full/MWWWvLm)

## Options

| Option           | Type             | Required | Description                                                                                                                                                                                                                                        |
| ---------------- | ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                  |                  |          |                                                                                                                                                                                                                                                    |
| html             | string           | ✓        | The html you want to use in the viewport example                                                                                                                                                                                                   |
| height           | string \| number |          | The height of the viewport, either as a string (e.g., '400') or a number (e.g., 400)                                                                                                                                                               |
| width            | string \| number |          | The width of the viewport, either as a string (e.g., '600') or a number (e.g., 600)                                                                                                                                                                |
| className        | string           |          | Class names to be given the generated iframe                                                                                                                                                                                                       |
| style            | string           |          | Inline styles (CSS) to be inserted into a `<style>` -tag in the `<head>`-tag of the generated html                                                                                                                                                 |
| css              | string           |          | A CSS file to be appended to the `<head>`-tag of the generated html. **NOTE! This needs to be on the same domain and relative to root!**                                                                                                           |
| code             | string           |          | Custom JavaScript code to be inserted into a `<script>`-tag in the `<body>`-tag in the generated html                                                                                                                                              |
| javascript       | string           |          | A JavaScript file to be inserted in the `<body>`-tag of the generated html. **NOTE! This needs to be on the same domain and relative to root!**                                                                                                    |
| headers          | string[]         |          | An array of HTTP headers to include when fetching the HTML content                                                                                                                                                                                 |
| viewports        | string           |          | The viewports to generate for examples. This is a string `wxh` for example: `375x667`. If you want more viewports, you can separate them with a comma: `375x667,360x740,768x1024`. **NOTE!** If not `viewports` are used, you need to set `width`! |
| templateSelector | string           |          | Selector to the template                                                                                                                                                                                                                           |
| templateElement  | HTMLElement      |          | Template element                                                                                                                                                                                                                                   |
| target           | string           |          | To identify this as a target to use to generate the frameports                                                                                                                                                                                     |

## Usage

### Basic usage

#### Typescript

Types can be found in `@phun-ky/frameport/dist/frameport.d.ts`.

#### ESM

Either import and run the required functions:

```javascript
import frameport from '@phun-ky/frameport';

// do stuff
frameport(document.getElementById('target'), {
  width: 667,
  html: '<h1>FOO</h1>'
});
```

#### Script

Or place these `script` in your web page:

```html
<script src="../path/to/frameport.js"></script>
```

And then follow the steps below that suites your needs :)

### Advanced usage

If you want to control frameport a bit more, you have some options. Apply one of these attributes to the script element for different types of initialization:

```html
<script src="../frameport.js" data-<manual|instant|dom|lazy></script>
```

| Tag            | Description                                                           |
| -------------- | --------------------------------------------------------------------- |
| `data-manual`  | Makes `window.frameport()` available to be used when you feel like it |
| `data-instant` | fires off `frameport()` right away                                    |
| `data-dom`     | Waits for `DOMContentLoaded`                                          |
| `data-lazy`    | Lazy loads `frameport()` per specced element                          |

If no attribute is applied, it will default to `data-dom`, as in, it will initialize when `DOMContentLoaded` is fired.

#### Lazy

If you're importing frameport instead of with a script tag, you can use the following approach to apply lazy loading:

```javascript
import frameport from '@phun-ky/frameport';

export const lazy = (): void => {
  const frameportObserverTarget = new IntersectionObserver((els, observer) => {
    els.forEach((el: IntersectionObserverEntry) => {
      if (el.intersectionRatio > 0) {
        const {
          dataset: {
            frameportTemplate: templateSelector,
            frameportVh: height,
            frameportVw: width,
            frameportCss: css,
            frameportStyle: style,
            frameportCode: code,
            frameportJs: javascript,
            frameportClass: className,
            frameportHeaders: headers,
            frameportViewports: viewports,
          },
        } = el.target as HTMLElement;

        let html = el.target.innerHTML;
        let templateElementToUse = el.target as HTMLElement;

        if (templateSelector) {
          const templateElement = document.querySelector(templateSelector);

          if (templateElement) {
            html = templateElement.innerHTML;
            templateElementToUse = templateElement as HTMLElement;
          }
        }

        const options = {
          templateSelector,
          templateElement: templateElementToUse,
          height,
          width,
          html,
          css,
          style,
          code,
          javascript,
          className,
          headers: getHeaders(headers),
          viewports,
        };
        dom(el.target as HTMLElement, options);
        observer.unobserve(el.target);
      }
    });
  });

  document.querySelectorAll('[data-frameport]').forEach((el) => {
    frameportObserverTarget.observe(el);
  });
};
```

## Features

### Via DOM

Place the `script` tag at the bottom of your page, right before the `</body>`-tag:

```html
<script src="../path/to/@phun-ky/frameport/dist/frameport.js"></script>
```

Or with a CDN:

```html
<script src="https://unpkg.com/@phun-ky/frameport/dist/frameport.js"></script>
```

And then follow the steps below to display the frameports you want :)

### Use templates as a target

With this approach, the script will locate given template and produce frameports based on that template and insert them right after the template. The original template will be hidden:

```html
<div
  data-frameport
  data-frameport-css="/css/ph.css"
  data-frameport-style="body{background-color: #84a295 !important;}"
  data-frameport-target
  data-frameport-template="#template"
  data-frameport-vw="667"
  data-frameport-vh="375"
></div>
<div id="template">
  <main class="ph" style="height: 100vh">
    <button class="ph button" type="button">Primary</button>
  </main>
</div>
```

The content of the `[data-frameport]`-container is the html you want to display in the frameport.

### Use targets with different template

With this approach, you decide where the frameports are added. The script will locate given target and produce frameports based on the given template and insert them in that target. The original template will be hidden:

```html
<div
  data-frameport
  data-frameport-css="/css/ph.css"
  data-frameport-style="body{background-color: #84a295 !important;}"
  data-frameport-viewports="375x667,360x740,768x1024"
>
  <main class="ph" style="height: 100vh">
    <div class="ph app">
      <p class="ph lead">Look mah, I'm in an iframe</p>
      <button class="ph button" type="button">Primary</button>
    </div>
  </main>
</div>
```

The above example code will generate 3 iframes with given viewports.

The content of the `#template`-container is the html you want to display in the frameport.

This approach is useful if you want to use a device decorator to mimic appearance of a device.

#### Allowed tags

| tag                          | description                                                                                                                                                                                     | Required |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **data-frameport**           | To identify this as the template to use for generating the responsive examples. **Required**                                                                                                    | 🔸       |
| **data-frameport-width**     | The viewport width. **Required**                                                                                                                                                                | 🔸       |
| **data-frameport-viewports** | The viewports to generate for examples. This is a string `wxh` for example: `375x667`. If you want more viewports, you can separate them with a comma: `375x667,360x740,768x1024`. **Required** | 🔸       |
| data-frameport-target        | To identify this as a target to use to generate the frameports                                                                                                                                  |          |
| data-frameport-template      | Selector to the template                                                                                                                                                                        |          |
| data-frameport-height        | The viewport height.                                                                                                                                                                            |          |
| data-frameport-css           | A CSS file to be appended to the `<head>`-tag of the generated html. **NOTE! This needs to be on the same domain and relative to root!** For example: `/dist/yourcss.css`                       |          |
| data-frameport-style         | Inline styles (CSS) to be inserted into a `<style>` -tag in the `<head>`-tag of the generated html                                                                                              |          |
| data-frameport-code          | Custom JavaScript code to be inserted into a `<script>`-tag in the `<body>`-tag in the generated html                                                                                           |          |
| data-frameport-js            | A JavaScript file to be inserted in the `<body>`-tag of the generated html. **NOTE! This needs to be on the same domain and relative to root!** For example: `/dist/yourjs.js`                  |          |
| data-frameport-class         | Class names to be given the generated iframe                                                                                                                                                    |          |
| data-frameport-headers       | An array of HTTP headers to include when fetching the HTML content                                                                                                                              |          |

## Contributing

If you want to contribute, please read the [CONTRIBUTING.md](https://github.com/phun-ky/frameport/blob/main/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/phun-ky/frameport/blob/main/CODE_OF_CONDUCT.md)

## Sponsor me

I'm an Open Source evangelist, creating stuff that does not exist yet to help get rid of secondary activities and to enhance systems already in place, be it documentation or web sites.

The sponsorship is an unique opportunity to alleviate more hours for me to maintain my projects, create new ones and contribute to the large community we're all part of :)

[Support me with GitHub Sponsors](https://github.com/sponsors/phun-ky).
