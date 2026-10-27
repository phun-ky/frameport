# Security Policy

`@phun-ky/frameport` has no runtime dependencies. How development dependencies
are chosen, tracked and kept clear of known vulnerabilities is described under
[Dependencies](#dependencies).

## Supported Versions

Support follows the major version:

| Release                  | Supported |
| ------------------------ | --------- |
| `2.x`, the current major | ✅        |
| `1.x` and older          | ❌        |

- **The current major is supported as a whole.** Fixes are released as a new
  patch or minor of it, and upgrading within a major never breaks your code.
- **The previous major gets fixes for high and critical vulnerabilities for 6
  months** after the next major is released, as a patch on its latest release.
- **Security comes before the deprecation grace period.** If a vulnerability
  can't be fixed without breaking an API, the fix may change or remove it in a
  patch or minor release instead of waiting for a major. The change is kept as
  small as possible, and the advisory and the release notes say what changed and
  why.

To get a fix, upgrade to the newest release of your major.

## Reporting a Vulnerability

Report vulnerabilities privately, either with GitHub's
[private vulnerability reporting](https://github.com/phun-ky/frameport/security/advisories/new)
or by email to <security@phun-ky.net>. Please don't open a public issue for a
security problem.

## How Reports Are Handled

1. **Acknowledgement:** you'll get a reply within 7 days confirming the report
   was received.
2. **Assessment:** the maintainer reproduces the issue and judges its severity,
   and may ask you for details.
3. **Fix:** a fix is developed in a private GitHub security advisory and
   released as a new version. The aim is a fix within 30 days for serious
   issues.
4. **Disclosure:** the advisory is published when the fix is released, with a
   CVE where one applies. Please keep the issue private until then.
5. **Credit:** reporters are credited in the advisory and the release notes,
   unless they ask to stay anonymous.

## Security Expectations

Frameport turns elements with a `data-frameport` attribute into iframes. Each
iframe loads a page built from the element's content (or a template) and its
`data-frameport-*` attributes, through a `blob:` URL.

What you can rely on:

- **No network requests of its own.** Frameport fetches nothing and sends
  nothing, and collects no data. The iframes load only the stylesheet and script
  paths you give in `data-frameport-css` and `data-frameport-js`, from your
  page's origin.
- **No dynamic code in frameport itself.** No `eval`, `new Function` or loading
  of code; the code you put in `data-frameport-code` runs inside the iframe.
- **One global at most.** The UMD build defines `window.frameport` when loaded
  with a script tag. Importing the ES module build defines nothing and renders
  nothing until you call `frameport()`.
- **Releases are traceable.** Every release is built and published from GitHub
  Actions, with signed provenance (see below).

What you can't rely on:

- **Isolation.** The iframes have no `sandbox` attribute, and `blob:` URLs share
  your page's origin. Code in the rendered content, `data-frameport-code`,
  `data-frameport-js` and `data-frameport-headers` can read and change your page,
  its cookies and its storage. Only render content you control, never user
  input.
- **Escaping.** Attribute values are inserted into the generated page as they
  are: `data-frameport-headers` is raw HTML, and a quote in
  `data-frameport-css` or `data-frameport-js` ends the attribute it is written
  into.
- **Freed memory.** The `blob:` URLs are not revoked, so each render keeps its
  page in memory until the document is unloaded.

An option for sandboxed iframes is being considered for the next major
([#239](https://github.com/phun-ky/frameport/issues/239)).

## Verifying Releases

Every release is published from GitHub Actions and carries a signed provenance
attestation (Sigstore) that links it to the commit and workflow run that built
it. To verify the package you've installed:

```sh
npm audit signatures
```

The provenance must name the repository `phun-ky/frameport` and the workflow
`.github/workflows/publish.yml`. The package's page on npm shows this under
"Provenance", and `npm view @phun-ky/frameport@<version> dist.attestations`
lists the attestations.

New GitHub releases also have a software bill of materials attached, in
CycloneDX format (`frameport-<version>.cdx.json`); releases made before the
SBOM step was added in October 2026 don't.

## Dependencies

**Choosing them.** No runtime dependencies is the goal; a new one is discussed in
an issue first. A runtime dependency would be declared in `dependencies` and
kept external in the ES module build, never bundled into it; only the UMD build
for script tags and CDNs, which can't resolve dependencies, may include one.
`npm run check:pack` fails a build that breaks this rule. A dependency must be
widely used, actively maintained and under an OSI-approved licence compatible
with MIT; strong copyleft licences (GPL, AGPL) are not accepted. Development
dependencies follow the same rules, judged more loosely.

**Obtaining them.** Packages come only from the npm registry, with exact
versions locked in `package-lock.json` and installed with `npm ci` in CI. GitHub
Actions are pinned to commit SHAs.

**Tracking them.** Dependabot proposes version updates weekly, two weeks after a
version is published, and security updates as soon as an advisory is published.
Every pull request runs
[dependency review](https://github.com/phun-ky/frameport/blob/main/.github/workflows/dependency-review.yml),
and every release runs `npm audit` on runtime dependencies first.

**Fixing known vulnerabilities.** Findings are checked against the GitHub
Advisory Database:

| Finding                    | Where                             | What happens                                                                                     |
| -------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------ |
| Critical or high           | Runtime or bundled dependency     | Blocks merging (dependency review) and releasing (`npm audit`); fixed and released within 7 days |
| Critical or high           | Development dependency            | Blocks merging when introduced; an existing one is fixed within 30 days                          |
| Moderate or low            | Any dependency                    | Fixed with the next update, within 90 days                                                       |
| Licence outside the policy | New runtime or bundled dependency | Not merged                                                                                       |

**Accepted exceptions.** A vulnerability that can't be fixed yet and can't be
exploited through this project is allowed in dependency review and listed here.
Each one is removed as soon as a fix is reachable:

| Advisory                                                                       | Package      | Why it is accepted                                                                                                                                                                               | Remove when                                               |
| ------------------------------------------------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| [GHSA-238p-pmpm-9mq7](https://github.com/advisories/GHSA-238p-pmpm-9mq7) (low) | `katex` 0.16 | Development only, through `eslint-config-phun-ky` > `@eslint/markdown` > `micromark-extension-math`. ESLint loads katex but never calls it: lint parses Markdown and never renders math to HTML. | `micromark-extension-math` allows `katex` 0.18.2 or later |

## Code Scanning

CodeQL analyses every pull request and every push to `main`. The ruleset on
`main` blocks merging while CodeQL reports an error, or a security alert of high
or critical severity. Other CodeQL alerts are fixed within 90 days, or dismissed
with the reason when they are false positives. OpenSSF Scorecard runs on every
push to `main`, with results at
<https://scorecard.dev/viewer/?uri=github.com/phun-ky/frameport>.

## Secrets

The project keeps as few secrets as possible:

| Secret          | Used by       | For                                                   |
| --------------- | ------------- | ----------------------------------------------------- |
| `GH_TOKEN`      | `publish.yml` | Pushing release commits and tags, and GitHub releases |
| `CODECOV_TOKEN` | `check.yml`   | Uploading coverage reports                            |

Publishing to npm needs no secret: it uses short-lived OIDC tokens from GitHub
(npm trusted publishing).

- **Storage:** secrets are kept only as encrypted GitHub Actions secrets, never
  in the repository. Secret scanning with push protection is being turned on.
- **Access:** only the maintainer can view or change them, and they are not
  available to workflows run from forks.
- **Rotation:** at least once a year, and immediately if one may have been
  exposed.
