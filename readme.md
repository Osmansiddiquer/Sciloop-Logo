# SciLoop Logo

Brand assets for **SciLoop** — wordmark and logo mark in light and dark variants.

## Contents

- **`sciloop-logo.html`** — Interactive logo system: view wordmark/mark, toggle between them, and click any variant to download its SVG.
- **Exported SVGs** (updated on every push by CI):
  - `wordmark-dark.svg` — Wordmark for dark backgrounds
  - `wordmark-light.svg` — Wordmark for light backgrounds
  - `mark-dark.svg` — Logo mark (symbol) for dark backgrounds
  - `mark-light.svg` — Logo mark for light backgrounds

## Exporting locally

From the repo root:

```bash
node scripts/export-logos.js
```

This writes the four variants above using the same logic as the HTML page.

## CI

On push to `main` or `master`, the **Export logo SVGs** workflow runs: it exports the four logo variants and commits any changes to the SVG files so the repo always has the latest exports.
