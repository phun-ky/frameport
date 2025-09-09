[@phun-ky/frameport](README.md) / constants

# constants

> Last updated 2025-09-09T07:55:40.226Z

## Variables

### DEFAULT_HEADERS

```ts
const DEFAULT_HEADERS: string[];
```

Defined in: [constants/index.ts:48](https://github.com/phun-ky/frameport/blob/main/src/constants/index.ts#L48)

#### Constant

#### Description

Default `<meta>` tags to inject into a dynamically created HTML document.
Ensures consistent encoding, responsive layout, and no indexing by robots.

Useful when rendering sandboxed `<iframe>` content or initializing virtual DOMs.

#### Example

```ts
const headHtml = DEFAULT_HEADERS.join('\n');
iframeDoc.head.innerHTML = headHtml;
```

---

### HIDE_TEMPLATE_STYLE

```ts
const HIDE_TEMPLATE_STYLE: {
  clip: string;
  height: string;
  margin: string;
  overflow: string;
  position: string;
  width: string;
};
```

Defined in: [constants/index.ts:16](https://github.com/phun-ky/frameport/blob/main/src/constants/index.ts#L16)

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="clip"></a> `clip`

</td>
<td>

`string`

</td>
<td>

[constants/index.ts:17](https://github.com/phun-ky/frameport/blob/main/src/constants/index.ts#L17)

</td>
</tr>
<tr>
<td>

<a id="height"></a> `height`

</td>
<td>

`string`

</td>
<td>

[constants/index.ts:18](https://github.com/phun-ky/frameport/blob/main/src/constants/index.ts#L18)

</td>
</tr>
<tr>
<td>

<a id="margin"></a> `margin`

</td>
<td>

`string`

</td>
<td>

[constants/index.ts:19](https://github.com/phun-ky/frameport/blob/main/src/constants/index.ts#L19)

</td>
</tr>
<tr>
<td>

<a id="overflow"></a> `overflow`

</td>
<td>

`string`

</td>
<td>

[constants/index.ts:20](https://github.com/phun-ky/frameport/blob/main/src/constants/index.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="position"></a> `position`

</td>
<td>

`string`

</td>
<td>

[constants/index.ts:21](https://github.com/phun-ky/frameport/blob/main/src/constants/index.ts#L21)

</td>
</tr>
<tr>
<td>

<a id="width"></a> `width`

</td>
<td>

`string`

</td>
<td>

[constants/index.ts:22](https://github.com/phun-ky/frameport/blob/main/src/constants/index.ts#L22)

</td>
</tr>
</tbody>
</table>

#### Constant

#### Description

Inline style used to visually hide an element from layout and screen readers,
often used to hide `<template>` elements or accessibility-hidden content.

Mimics techniques commonly recommended for a11y-invisible content without removing from DOM.

#### Example

```ts
element.style = { ...HIDE_TEMPLATE_STYLE };
```

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
