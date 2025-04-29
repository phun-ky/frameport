[@phun-ky/frameport](README.md) / types

# types

> Last updated 2025-04-29T13:05:26.647Z

## Table of Contents

- [Interfaces](#interfaces)
  - [FrameportOptions](#frameportoptions)
- [Type Aliases](#type-aliases)
  - [FrameportFunctionType()](#frameportfunctiontype)

## Interfaces

### FrameportOptions

Defined in: [types/index.ts:6](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L6)

Represents options for creating a Responsive Documentation Example.

FrameportOptions

#### Properties

| Property                                        | Type                                                                    | Description                                                                                                                                                                                                                                                     | Defined in                                                                                   |
| ----------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| <a id="classname" /> `className?`               | `string`                                                                | Class names to be given the generated iframe                                                                                                                                                                                                                    | [types/index.ts:33](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L33)   |
| <a id="code" /> `code?`                         | `string`                                                                | Custom JavaScript code to be inserted into a `<script>`-tag in the `<body>`-tag in the generated html                                                                                                                                                           | [types/index.ts:72](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L72)   |
| <a id="css" /> `css?`                           | `string`                                                                | A CSS file to be appended to the `<head>`-tag of the generated html **NOTE! This needs to be on the same domain and relative to root!** **Example** `const options = { … css: '/dist/yourcss.css', … };`                                                        | [types/index.ts:65](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L65)   |
| <a id="headers" /> `headers?`                   | `string`\[]                                                             | An array of HTTP headers to include when fetching the HTML content                                                                                                                                                                                              | [types/index.ts:96](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L96)   |
| <a id="height" /> `height?`                     | `string` \| `number`                                                    | The height of the viewport, either as a string (e.g., '400') or a number (e.g., 400)                                                                                                                                                                            | [types/index.ts:19](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L19)   |
| <a id="html" /> `html`                          | `string`                                                                | The html you want to use in the viewport example                                                                                                                                                                                                                | [types/index.ts:12](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L12)   |
| <a id="javascript" /> `javascript?`             | `string`                                                                | A JavaScript file to be inserted in the `<body>`-tag of the generated html **NOTE! This needs to be on the same domain and relative to root!** **Example** `const options = { … javascript: '/dist/yourjs.js', … };`                                            | [types/index.ts:89](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L89)   |
| <a id="style" /> `style?`                       | `string`                                                                | Inline styles (CSS) to be inserted into a `<style>` -tag in the `<head>`-tag of the generated html **Example** `const options = { … style: 'button{ color: white;}', … };`                                                                                      | [types/index.ts:48](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L48)   |
| <a id="target" /> `target?`                     | `string`                                                                | To identify this as a target to use to generate the responsive examples                                                                                                                                                                                         | [types/index.ts:128](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L128) |
| <a id="templateelement" /> `templateElement?`   | [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) | Template element                                                                                                                                                                                                                                                | [types/index.ts:122](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L122) |
| <a id="templateselector" /> `templateSelector?` | `string`                                                                | Selector to the template                                                                                                                                                                                                                                        | [types/index.ts:116](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L116) |
| <a id="viewports" /> `viewports?`               | `string`                                                                | The viewports to generate for examples. This is a string `wxh` for example: `375x667`. If you want more viewports, you can separate them with a comma: `375x667,360x740,768x1024` **Example** `const options = { … viewports: `375x667,360x740,768x1024`, … };` | [types/index.ts:110](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L110) |
| <a id="width" /> `width?`                       | `string` \| `number`                                                    | The width of the viewport, either as a string (e.g., '600') or a number (e.g., 600)                                                                                                                                                                             | [types/index.ts:26](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L26)   |

## Type Aliases

### FrameportFunctionType()

```ts
type FrameportFunctionType = () => void;
```

Defined in: [types/index.ts:148](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L148)

Example usage:

```ts
const options: FrameportOptions = {
  html: '<div>Hello, World!</div>',
  height: '300',
  width: 400,
  className: 'my-embed',
  style: 'color: blue;',
  css: '.my-embed { background-color: yellow; }',
  code: 'console.log("Embedded content");',
  javascript: '/dummy.js',
  headers: ['Authorization: Bearer Token']
};
```

#### Returns

`void`

---

**Contributing**

Want to contribute? Please read the [CONTRIBUTING.md](https://github.com/phun-ky/frameport/blob/main/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/phun-ky/frameport/blob/main/CODE_OF_CONDUCT.md)

**Sponsor me**

I'm an Open Source evangelist, creating stuff that does not exist yet to help get rid of secondary activities and to enhance systems already in place, be it documentation or web sites.

The sponsorship is an unique opportunity to alleviate more hours for me to maintain my projects, create new ones and contribute to the large community we're all part of :)

[Support me on GitHub Sponsors](https://github.com/sponsors/phun-ky).

![Speccer banner, with logo and slogan: A zero dependency package to annotate or highlight elements](https://github.com/phun-ky/frameport/blob/main/public/frameport-banner.png?raw=true)

---

This project created by [Alexander Vassbotn Røyne-Helgesen](http://phun-ky.net) is licensed under a [MIT License](https://choosealicense.com/licenses/mit/).
