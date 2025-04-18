[@phun-ky/frameport](README.md) / main

# main

> Last updated 2025-04-15T08:28:32.714Z

## Table of Contents

- [Variables](#variables)
  - [modes](#modes)
- [Functions](#functions)
  - [frameport()](#frameport)

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

Defined in: [main.ts:6](https://github.com/phun-ky/frameport/blob/main/src/main.ts#L6)

#### Type declaration

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
        <a id="activate" /> `activate()`
      </td>

      <td>
        (`frameport`) => `void`
      </td>

      <td>
        [main.ts:10](https://github.com/phun-ky/frameport/blob/main/src/main.ts#L10)
      </td>
    </tr>

    <tr>
      <td>
        <a id="domready" /> `domReady()`
      </td>

      <td>
        (`frameport`) => `void`
      </td>

      <td>
        [main.ts:7](https://github.com/phun-ky/frameport/blob/main/src/main.ts#L7)
      </td>
    </tr>

    <tr>
      <td>
        <a id="lazy" /> `lazy()`
      </td>

      <td>
        () => `void`
      </td>

      <td>
        [main.ts:8](https://github.com/phun-ky/frameport/blob/main/src/main.ts#L8)
      </td>
    </tr>

    <tr>
      <td>
        <a id="manual" /> `manual()`
      </td>

      <td>
        (`frameport`) => `void`
      </td>

      <td>
        [main.ts:9](https://github.com/phun-ky/frameport/blob/main/src/main.ts#L9)
      </td>
    </tr>

  </tbody>
</table>

## Functions

### frameport()

```ts
function frameport(): void;
```

Defined in: [main.ts:13](https://github.com/phun-ky/frameport/blob/main/src/main.ts#L13)

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
