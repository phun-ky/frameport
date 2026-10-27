# Roadmap

What frameport intends to do, and not do, from October 2026 to October 2027.
It's a plan, not a promise: priorities can change, and changes to this file are
made in pull requests like any other. Individual pieces of work are tracked as
[GitHub issues](https://github.com/phun-ky/frameport/issues), grouped in
milestones.

## Planned

### Keeping 2.x stable

Since 2.0.87, `import` and `require` of the package work in Node.js, and every
change is checked by installing the packed package and calling it from each
entry point, and by running the README examples in a browser. From here:

- **No breaking changes in 2.x.** The current major is supported as a whole and
  the previous one gets high and critical security fixes for 6 months; see the
  [security policy](SECURITY.md#supported-versions).
- **Deprecations before removals:** a deprecated API keeps working through one
  full major.

### 3.0

Changes that are breaking, collected in the
[3.0 milestone](https://github.com/phun-ky/frameport/milestone/5):

- **An API review** ([#239](https://github.com/phun-ky/frameport/issues/239)):
  rendering one element, typing `window.frameport`, the unused `target` option,
  escaping attribute values, an option for sandboxed iframes, freeing `blob:`
  URLs, and input validation.
- **Viewports in the order given**
  ([#240](https://github.com/phun-ky/frameport/issues/240)).
- **ES modules only, with `engines.node` `>=22.12.0`**
  ([#241](https://github.com/phun-ky/frameport/issues/241)).

### Project health

- **OpenSSF Best Practices:** the passing badge, then silver and OSPS Baseline.
- **TypeScript 7**, once the tools the build and docs depend on support it
  ([#265](https://github.com/phun-ky/frameport/issues/265)).
- **A second maintainer**, so that pull requests get a review from someone other
  than the author and access to the project doesn't rest on one person; see
  [governance](GOVERNANCE.md#continuity).

## Not planned

- **Runtime dependencies.** frameport has none, and adding one would need a
  strong reason, discussed in an issue first.
- **Collecting data.** The package doesn't collect, store or send data anywhere.
