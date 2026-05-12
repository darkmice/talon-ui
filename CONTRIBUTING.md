# Contributing to Talon UI

Thanks for considering a contribution. This guide covers the local dev loop, conventions, and the review flow.

## Local setup

```bash
git clone https://github.com/darkmice/talon-ui.git
cd talon-ui
pnpm install
pnpm dev
```

Node 20+ and pnpm 9 are required (see `engines` in root `package.json`).

## Repository layout

- `packages/tokens` — design tokens (CSS vars + JSON + Tailwind preset)
- `packages/react` — React component library
- `packages/vue` — Phase 2 placeholder (private)
- `apps/docs` — Astro + Starlight docs site
- `examples/` — integration test apps
- `skills/talon-ui` — design-system skill source (mirror of `packages/tokens/src` via symlinks)

## Conventions

- **Tokens** live only in `packages/tokens/src/`. Skill assets are reverse-symlinks; never edit them directly.
- **No raw hex** in component source except the spec's allowlist (Talon brand red, danger red, star amber, diff bg). ESLint enforces this.
- **No `dark:` Tailwind variants**. Components consume semantic tokens; tokens auto-flip on `[data-theme="dark"]` and `.dark`.
- **MIT license header** required on every new `.ts/.tsx/.css/.mjs/.vue/.scss/.cjs` file.
- **One commit per component** in feature work; release commits go through Changesets.
- **TDD** for any new component: write the anatomy + behaviour tests before the implementation.

## Adding a component

1. Open a GitHub issue (or x.xgit.pro mirror) describing the component and its acceptance criteria.
2. Create `packages/react/src/components/<name>/` with: `<name>.tsx`, `<name>.variants.ts`, `<name>.types.ts`, `<name>.test.tsx`, `<name>.anatomy.test.tsx`, `index.ts`.
3. Add a barrel export to `packages/react/src/index.ts`.
4. Add a docs page at `apps/docs/src/content/docs/components/<name>.mdx` + 2–3 demos under `apps/docs/src/examples/<name>/`.
5. Run `pnpm test typecheck lint build` (per-filter or via `turbo run`) — all green.
6. Add a Changeset describing the change (`pnpm changeset`).
7. Open a PR.

## Tests

- Per-component: anatomy test (DOM-structure snapshot) + behaviour test (user-event-driven).
- Repo-wide: `pnpm tokens:verify` (token parity), `pnpm skills:verify` (symlink contract), `pnpm preflight` (publish audit), `pnpm test:visual` (Playwright; baselines under `tests/visual/__baseline__/`).

## Commit style

Conventional Commits — `feat(react): …`, `fix(tokens): …`, `docs: …`, `chore: …`, `test: …`.

## Release flow

1. Land changes with a Changeset in each PR.
2. `changesets` bot opens / updates the "Version PR" automatically.
3. Maintainer reviews + merges the Version PR.
4. `release.yml` publishes to npm.

## Code of conduct

Be excellent to each other. Disagreements stay technical, never personal.
