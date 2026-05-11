# Talon UI

React (Phase 1) component library and design tokens for the Talon Pilot design system.

| Mirror | URL |
|---|---|
| GitHub | https://github.com/darkmice/talon-ui |
| x.xgit.pro | https://x.xgit.pro/dark/talon-ui |

## Packages

| Package | Purpose | Status |
|---|---|---|
| `@talon-ui/tokens` | Design tokens (CSS vars + JSON + Tailwind preset) | 0.x alpha |
| `@talon-ui/react`  | React components | 0.x alpha (Block 1 in progress) |
| `@talon-ui/vue`    | Vue components | Phase 2 placeholder |

## Develop

```bash
pnpm install
pnpm build       # all packages
pnpm test        # all tests
pnpm preflight   # publish audit (run before release)
```

## Source of truth

**Tokens** live only in `packages/tokens/src/`. `skills/talon-ui/assets/` are reverse-symlinks; do not edit them directly.

**Skills** live only in `skills/`. `.claude/`, `.codex/`, `.agents/` (and any future agent runtime) must reference them via `skills` symlink. CI enforces this.

## Spec & plans

- Design spec: `docs/superpowers/specs/2026-05-11-talon-ui-library-design.md`
- Foundation plan: `docs/superpowers/plans/2026-05-11-talon-ui-foundation.md`

## License

MIT. See `LICENSE`.

## TODO before first public publish

- [ ] Reserve the `@talon-ui` npm scope (if not already done).
- [ ] Add `NPM_TOKEN` secret to the GitHub repository so `release.yml` can publish.
- [ ] Decide whether to make the GitHub repo public.
