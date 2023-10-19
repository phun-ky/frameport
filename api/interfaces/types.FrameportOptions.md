[@phun-ky/frameport](../README.md) / [types](../modules/types.md) / FrameportOptions

# Interface: FrameportOptions

[types](../modules/types.md).FrameportOptions

Represents options for creating a Responsive Documentation Example.

 FrameportOptions

## Properties

### className

• `Optional` **className**: `string`

Class names to be given the generated iframe

#### Defined in

[types/index.ts:33](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L33)

___

### code

• `Optional` **code**: `string`

Custom JavaScript code to be inserted into a `<script>`-tag in the `<body>`-tag in the generated html

#### Defined in

[types/index.ts:72](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L72)

___

### css

• `Optional` **css**: `string`

A CSS file to be appended to the `<head>`-tag of the generated html

**NOTE! This needs to be on the same domain and relative to root!**

**`Example`**

```ts
const options = {
  …
  css: '/dist/yourcss.css',
  …
};
```

#### Defined in

[types/index.ts:65](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L65)

___

### headers

• `Optional` **headers**: `string`[]

An array of HTTP headers to include when fetching the HTML content

#### Defined in

[types/index.ts:96](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L96)

___

### height

• `Optional` **height**: `string` \| `number`

The height of the viewport, either as a string (e.g., '400') or a number (e.g., 400)

#### Defined in

[types/index.ts:19](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L19)

___

### html

• **html**: `string`

The html you want to use in the viewport example

#### Defined in

[types/index.ts:12](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L12)

___

### javascript

• `Optional` **javascript**: `string`

A JavaScript file to be inserted in the `<body>`-tag of the generated html

**NOTE! This needs to be on the same domain and relative to root!**

**`Example`**

```ts
const options = {
  …
  javascript: '/dist/yourjs.js',
  …
};
```

#### Defined in

[types/index.ts:89](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L89)

___

### style

• `Optional` **style**: `string`

Inline styles (CSS) to be inserted into a `<style>` -tag in the `<head>`-tag of the generated html

**`Example`**

```ts
const options = {
  …
  style: 'button{ color: white;}',
  …
};
```

#### Defined in

[types/index.ts:48](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L48)

___

### target

• `Optional` **target**: `string`

To identify this as a target to use to generate the responsive examples

#### Defined in

[types/index.ts:128](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L128)

___

### templateElement

• `Optional` **templateElement**: `HTMLElement`

Template element

#### Defined in

[types/index.ts:122](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L122)

___

### templateSelector

• `Optional` **templateSelector**: `string`

Selector to the template

#### Defined in

[types/index.ts:116](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L116)

___

### viewports

• `Optional` **viewports**: `string`

The viewports to generate for examples. This is a string `wxh` for example: `375x667`. If you want more viewports, you can separate them with a comma: `375x667,360x740,768x1024`

**`Example`**

```ts
const options = {
  …
  viewports: `375x667,360x740,768x1024`,
  …
};
```

#### Defined in

[types/index.ts:110](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L110)

___

### width

• `Optional` **width**: `string` \| `number`

The width of the viewport, either as a string (e.g., '600') or a number (e.g., 600)

#### Defined in

[types/index.ts:26](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L26)
