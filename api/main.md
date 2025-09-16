[@phun-ky/frameport](README.md) / main

# main

> Last updated 2025-09-15T19:59:32.327Z

## Variables

### modes

```ts
const modes: {
  activate: (frameport) => void;
  domReady: (frameport) => void;
  lazy: () => void;
  manual: (frameport) => void;
};
```

Defined in: [main.ts:10](https://github.com/phun-ky/frameport/blob/main/src/main.ts#L10)

Available initialization modes for frameport usage.
Can be triggered manually or via browser lifecycle hooks.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="activate"></a> `activate()`

</td>
<td>

(`frameport`) => `void`

</td>
<td>

A function to activate frameport based on script attributes.

**Example**

```ts
// Usage example:
// activate(myRDE);
```

</td>
<td>

[main.ts:14](https://github.com/phun-ky/frameport/blob/main/src/main.ts#L14)

</td>
</tr>
<tr>
<td>

<a id="domready"></a> `domReady()`

</td>
<td>

(`frameport`) => `void`

</td>
<td>

A function to initialize frameport when the DOM is ready.

**Example**

```ts
// Usage example:
// domReady(myRDE);
```

</td>
<td>

[main.ts:11](https://github.com/phun-ky/frameport/blob/main/src/main.ts#L11)

</td>
</tr>
<tr>
<td>

<a id="lazy"></a> `lazy()`

</td>
<td>

() => `void`

</td>
<td>

A function to initialize lazy frameport functionality.

**Example**

```ts
// Usage example:
// lazy();
```

</td>
<td>

[main.ts:12](https://github.com/phun-ky/frameport/blob/main/src/main.ts#L12)

</td>
</tr>
<tr>
<td>

<a id="manual"></a> `manual()`

</td>
<td>

(`frameport`) => `void`

</td>
<td>

A function to manually activate frameport.

**Example**

```ts
// Usage example:
// manual(myRDE);
```

</td>
<td>

[main.ts:13](https://github.com/phun-ky/frameport/blob/main/src/main.ts#L13)

</td>
</tr>
</tbody>
</table>

## Functions

### frameport()

```ts
function frameport(): void;
```

Defined in: [main.ts:55](https://github.com/phun-ky/frameport/blob/main/src/main.ts#L55)

Transforms all DOM elements marked with `[data-frameport]` into embedded iframes
with sandboxed content based on HTML templates and associated metadata.

Also removes any existing `[data-frameport-iframe]` elements from the document,
ensuring re-renders are clean.

Reads attributes such as:

- `data-frameport-template`
- `data-frameport-css`
- `data-frameport-style`
- `data-frameport-code`
- `data-frameport-js`
- `data-frameport-class`
- `data-frameport-headers`
- `data-frameport-viewports`
- `data-frameport-vh`
- `data-frameport-vw`

#### Returns

`void`

void

#### Example

```html
<div
  data-frameport
  data-frameport-template="#my-template"
  data-frameport-vh="100"
  data-frameport-vw="100"
  data-frameport-css="styles.css"
  data-frameport-js="script.js"
></div>

<template id="my-template">
  <h1>Hello, sandbox!</h1>
</template>
```

frameport

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
