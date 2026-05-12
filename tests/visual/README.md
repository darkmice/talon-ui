# Visual regression

Per-page screenshot regression for the docs site.

## Bootstrap (first time on a clean checkout)

```bash
pnpm install
pnpm exec playwright install chromium       # macOS: no sudo needed
pnpm --filter @talon-ui/docs build           # build docs once so `astro preview` has dist/
pnpm test:visual:update                      # generate initial PNG baselines
git add tests/visual/__baseline__
git commit -m "test(visual): regenerate baselines"
```

## On every PR

```bash
pnpm test:visual
```

- Threshold: 0.1% pixel diff (`maxDiffPixelRatio: 0.001`).
- Failures upload `tests/visual/.report/` and diff PNGs.
- To update baselines after an intentional visual change, run `pnpm test:visual:update`, review the diff, and commit the new PNGs.

## CI

`.github/workflows/visual.yml` runs this on every PR. The runner installs Chromium, builds docs, starts preview, runs the spec. Diff artifacts are uploaded on failure.

## What's covered

All 45 component pages in light theme.

## What's NOT covered yet

- Dark theme (planned for v2 of this scaffold).
- Landing / Getting Started / Tokens / Gallery pages.
- Interactive states (hover, focus). Those would require per-component `.spec.ts` files with `page.hover()` etc.
