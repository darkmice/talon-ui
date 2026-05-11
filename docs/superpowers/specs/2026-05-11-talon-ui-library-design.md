# @talon-ui Component Library — Design Spec

| Field | Value |
|---|---|
| Date | 2026-05-11 |
| Status | Draft → pending user review |
| Repo root | `/Users/dark/WebstormProjects/talon-ui/` |
| Source skills consulted | `talon-ui` (project-vendored), `shadcn-ui` (global) |

## 0. Scope and Goals

Build `@talon-ui`, an npm-published React component library that operationalises the Talon Pilot design system defined in `skills/talon-ui/`.

**Phase 1 deliverable:** `@talon-ui/react@0.4.0` covering 45 components at Ant Design parity, plus `@talon-ui/tokens@0.4.0` and an Astro 4 + Starlight docs site.

**Out of scope for Phase 1:** `@talon-ui/vue` (scaffold a placeholder package only; ship in Phase 2).

**Success criteria:**
- All 45 components shippable from npm under `@talon-ui` scope.
- Consumers can adopt via either Tailwind preset or one-line precompiled CSS import.
- Token edits propagate to skill assets (and therefore to every connected agent runtime) without manual sync.
- Docs site at production URL; every component has anatomy doc, props table, live demo, light+dark visual regression baseline.
- Token parity, anatomy, a11y, and visual tests green for two consecutive weeks.

---

## 1. Repository / Monorepo Layout

```
/Users/dark/WebstormProjects/talon-ui/        ← git root, monorepo root
├── skills/                                   ← project-vendored skill sources (single source for every agent runtime)
│   ├── talon-ui/                             ← existing skill; assets/* become symlinks into packages/tokens
│   └── shadcn-ui/                            ← restored via `pnpm skills:install` from skills-lock.json
├── skills-lock.json                          ← versions + content hashes of vendored skills
├── .claude/skills    → ../skills             ← symlink (already in place)
├── .codex/
│   ├── skills        → ../skills             ← symlink (already in place)
│   └── .claude/skills→ ../../skills          ← symlink (currently a real empty dir → must convert)
├── .agents/skills    → ../skills             ← symlink (currently a real dir with shadcn-ui residue → must convert)
├── package.json                              ← root: pnpm + turbo + changesets
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── .changeset/                               ← Changesets state
├── packages/
│   ├── tokens/                               ← @talon-ui/tokens
│   ├── react/                                ← @talon-ui/react · Phase 1 primary deliverable
│   └── vue/                                  ← @talon-ui/vue · Phase 2 placeholder, private:true
├── apps/
│   └── docs/                                 ← Astro 4 + Starlight
└── examples/                                 ← integration regression apps (Vite + Next.js minimum)
```

**Skill-directory contract** (written into root README, enforced in CI):
- `skills/` is the only writable skill source directory in the repo.
- Every agent runtime directory (`.claude/`, `.codex/`, `.agents/`, `.codex/.claude/`, future Cursor/Cline/etc.) MUST reference `skills/` only via symlink.
- New agent runtimes are added by `<dir>/skills → ../skills` (or correct relative path).
- CI runs `scripts/verify-skill-symlinks.mjs`; any real `skills/` directory inside an agent runtime dir is a failure.

---

## 2. Package Topology and Public Contracts

### 2.1 `@talon-ui/tokens`

```
packages/tokens/
├── src/
│   ├── tokens.css          ← single source of truth: 3 layers (primitive / semantic / component), [data-theme="dark"] + .dark
│   ├── tokens.json         ← platform-agnostic export (Style Dictionary–compatible shape)
│   ├── tailwind.v4.css     ← @theme inline for Tailwind v4 consumers
│   └── tailwind.preset.js  ← Tailwind v3 preset
├── dist/                   ← CSS files copied verbatim; .d.ts emitted by tsup
└── package.json
```

`package.json#exports`:
- `@talon-ui/tokens` → `tokens.json` + TypeScript types
- `@talon-ui/tokens/css` → `tokens.css`
- `@talon-ui/tokens/tailwind-v4` → `tailwind.v4.css`
- `@talon-ui/tokens/preset` → `tailwind.preset.js`

Zero runtime dependencies, framework-agnostic.

### 2.2 `@talon-ui/react`

```
packages/react/
├── src/
│   ├── primitives/
│   │   ├── cn.ts                       ← clsx + tailwind-merge
│   │   ├── slot.ts                     ← @radix-ui/react-slot wrapper
│   │   ├── use-controllable-state.ts
│   │   └── polymorphic.ts              ← As-prop type helpers
│   ├── components/
│   │   ├── button/
│   │   │   ├── button.tsx              ← React.forwardRef + asChild
│   │   │   ├── button.variants.ts      ← CVA config
│   │   │   ├── button.types.ts         ← public prop interface (also consumed by docs PropsTable)
│   │   │   ├── button.test.tsx
│   │   │   ├── button.anatomy.test.ts
│   │   │   └── index.ts                ← named exports only
│   │   ├── input/  …                   (45 components, identical structure)
│   │   └── index.ts                    ← top-level barrel: `export * from './button'` etc.
│   ├── styles/
│   │   └── react.css                   ← Tailwind entry; @import "@talon-ui/tokens/css"
│   └── index.ts
├── dist/                               ← tsup ESM+CJS+dts; Tailwind CLI → dist/styles.css (tokens.css prepended)
└── package.json
```

`package.json#exports`:
- `@talon-ui/react` → component JS + types
- `@talon-ui/react/styles.css` → pre-compiled stylesheet (tokens inlined)
- `@talon-ui/react/package.json` → for tooling

`peerDependencies`: `react ^18 || ^19`, `react-dom`, plus per-component Radix subpackages (see §4 matrix).

`dependencies`: `@talon-ui/tokens` (workspace, version-locked at publish), `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`.

`sideEffects`: `["**/*.css"]`.

### 2.3 `@talon-ui/vue` (Phase 2 placeholder)

`packages/vue/` ships only `package.json` (`"private": true`) and `README.md` ("coming soon"). Reserves workspace slot to avoid restructuring later.

### 2.4 Dual-track styling contract

| Consumer | Setup | Variable source | Style source |
|---|---|---|---|
| Tailwind v4 project | `@import "@talon-ui/tokens/tailwind-v4";` and add `node_modules/@talon-ui/react/dist/**` to content scan | tokens.css (imported by tailwind.v4.css) | consumer's Tailwind compile |
| Tailwind v3 project | `presets: [require('@talon-ui/tokens/preset')]` + `import '@talon-ui/tokens/css'` | tokens.css | consumer's Tailwind compile |
| Non-Tailwind project | `import '@talon-ui/react/styles.css'` | inlined at top of styles.css | precompiled by us |

---

## 3. Token Data Flow and Authority Migration

### 3.1 Authority chain

```
       ┌─────────────────────────────────────────────────────┐
       │ packages/tokens/src/  ← single source of truth      │
       │   tokens.css                                         │
       │   tokens.json                                        │
       │   tailwind.v4.css                                    │
       │   tailwind.preset.js                                 │
       └───┬──────────────────────────────────────────────┬──┘
           │ relative symlinks                             │
           ▼                                                ▼
   ┌──────────────────────────────┐         ┌─────────────────────────────────┐
   │ skills/talon-ui/assets/      │         │ @talon-ui/react Tailwind compile│
   │ tokens.css       → packages..│         │ - source consumes utilities     │
   │ tokens.json      → packages..│         │ - dist/styles.css prepends      │
   │ tailwind.v4.css  → packages..│         │   tokens.css verbatim           │
   │ tailwind.v3...   → packages..│         └─────────────────────────────────┘
   └──────────────────────────────┘
           │ auto-propagated through agent-dir symlinks
           ▼
   ┌──────────────────────────────┐
   │ Claude / Codex / Cursor /    │
   │ Cline / Antigravity / …      │
   └──────────────────────────────┘
```

### 3.2 One-time migration steps

1. `git mv skills/talon-ui/assets/{tokens.css,tokens.json,tailwind.v4.css,tailwind.v3.config.js} packages/tokens/src/` (rename `tailwind.v3.config.js` → `tailwind.preset.js`).
2. **Reconciliation pass:** walk `design.md` §2–§4 and §6 anatomy; correct any drift in the moved files. The values that land in `packages/tokens/src/` after this pass are authoritative going forward.
3. Re-derive `tokens.json` and `tailwind.preset.js` from the reconciled `tokens.css`. Run `scripts/verify-token-parity.mjs` until green.
4. Create relative symlinks from `skills/talon-ui/assets/`:
   ```
   tokens.css            → ../../../packages/tokens/src/tokens.css
   tokens.json           → ../../../packages/tokens/src/tokens.json
   tailwind.v4.css       → ../../../packages/tokens/src/tailwind.v4.css
   tailwind.v3.config.js → ../../../packages/tokens/src/tailwind.preset.js
   ```
5. Convert `.codex/.claude/skills` to a symlink targeting `../../skills`, and `.agents/skills` to a symlink targeting `../skills` (both resolve to the repo-root `skills/`).
6. Update root `README.md`: "**Edit tokens only in `packages/tokens/src/`. Everything else is a view.**"
7. CI: `scripts/verify-skill-symlinks.mjs` + `scripts/verify-token-parity.mjs` both must pass.

### 3.3 Authoring rules (echoed from skill, made testable)

- Components never write raw hex/px. Only Tailwind utilities backed by tokens.
- Components never use `dark:` variants; theme flips via `[data-theme="dark"]` / `.dark` selectors in `tokens.css`.
- The only allowed hard-pinned colours in component source: danger `#DC2626 / #B91C1C`, star `#F59E0B`, diff bg `#E6F8EC / #FCE3E1`. ESLint custom rule enforces the allowlist.

---

## 4. `@talon-ui/react` Internals

### 4.1 Component module conventions

- Each component lives in its own folder under `src/components/<name>/`.
- Mandatory files per component: `<name>.tsx`, `<name>.variants.ts`, `<name>.types.ts`, `<name>.test.tsx`, `<name>.anatomy.test.ts`, `index.ts`.
- Folder `index.ts` does named re-exports only — no default exports anywhere.
- Every component is `React.forwardRef`-wrapped with explicit `displayName`.
- Every component accepts `className` and composes via `cn(variants(...), className)` so consumers can override.
- `asChild` is exposed wherever the underlying Radix primitive supports it.
- Controlled/uncontrolled dual-mode components route through `primitives/use-controllable-state.ts`.
- No inline `style` API beyond what HTML element accepts; if a use case needs runtime theming, expose a documented CSS variable instead.

### 4.2 Variant authoring (CVA)

CVA is the single declarative source for variants. Prop names follow the skill's vocabulary: `variant / size / tone / leading / trailing / loading`. Example:

```ts
// button/button.variants.ts
export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-tp-2',
    'rounded-md font-medium tp-nums',
    'transition duration-fast ease-tp',
    'focus-visible:tp-focus-ring',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary:   'bg-primary-500 text-text-on-primary hover:bg-primary-600 active:bg-primary-700',
        secondary: 'bg-bg-surface text-text-primary border border-border hover:bg-bg-subtle',
        ghost:     'bg-transparent text-text-primary hover:bg-bg-subtle',
        danger:    'bg-[#DC2626] text-white hover:bg-[#B91C1C]',
      },
      size: {
        sm: 'h-control-sm px-tp-3 text-caption',
        md: 'h-control-md px-tp-4 text-body',
        lg: 'h-control-lg px-tp-5 text-body',
      },
      iconOnly: { true: 'aspect-square px-0' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);
```

### 4.3 Radix integration policy

We wrap rather than re-export Radix. Consumers receive `<Modal>`, `<Menu>`, `<Tabs>` — we decide anatomy and variants; Radix provides accessibility, focus, and portalling.

Per-component peerDeps (declared individually to keep tree-shaken trees small):

| Component | Radix dep |
|---|---|
| Button | `@radix-ui/react-slot` |
| Checkbox | `@radix-ui/react-checkbox` |
| Radio | `@radix-ui/react-radio-group` |
| Switch | `@radix-ui/react-switch` |
| Slider | `@radix-ui/react-slider` |
| Avatar | `@radix-ui/react-avatar` |
| Progress | `@radix-ui/react-progress` |
| Tabs | `@radix-ui/react-tabs` |
| Modal | `@radix-ui/react-dialog` |
| Drawer | `@radix-ui/react-dialog` (controlled `side="right"`) |
| Popover, Popconfirm, DatePicker, TimePicker | `@radix-ui/react-popover` |
| Menu (Dropdown) | `@radix-ui/react-dropdown-menu` |
| Tooltip | `@radix-ui/react-tooltip` |
| Toast | `@radix-ui/react-toast` |
| Collapse | `@radix-ui/react-accordion` |
| Combobox / AutoComplete | `cmdk` (Radix has no combobox primitive) |
| Form | `react-hook-form` (peer) |
| DatePicker | `react-day-picker` (peer) |

### 4.4 Phase 1 component set (45) — sprint blocks

**Block 1 — Foundational primitives (10, ≈3 weeks)**
Button · Input · Textarea · Tag · Avatar (+ Group) · Card · Badge · Divider · Space · Typography (Title/Text/Paragraph/Link)

**Block 2 — Forms & data entry (13, ≈3 weeks)**
Form · Select · Combobox/AutoComplete · Checkbox · Radio · Switch · Slider · NumberInput · Rate · DatePicker · TimePicker · Upload · ColorPicker (compact)

**Block 3 — Navigation & feedback (12, ≈3 weeks)**
Tabs · Breadcrumb · Pagination · Stepper · Menu (Dropdown) · Modal · Drawer · Banner (Alert) · Toast (Notification) · Popconfirm · Popover · Tooltip

**Block 4 — Data display & misc feedback (10, ≈3 weeks)**
KanbanCard · Progress (linear + circular) · Skeleton · Spin · Empty · Result · Statistic · Descriptions · Collapse · BusinessRows (FileRefRow / RoleRow / RiskRow / RuntimeRow as one packaged module)

### 4.5 Risk register (carried into implementation plan)

| Risk | Mitigation |
|---|---|
| Form abstraction shape ripples through every entry component | Land Form public API in Block 2 week 1; freeze before any other Block 2 component begins. |
| DatePicker / TimePicker / Upload each ≈ 1–2 wk of single-component effort | If Block 2 slips, push Upload to Block 4 (it has no API dependency on other entries). |
| Combobox lacks a Radix primitive; depends on cmdk | Wrap cmdk so its public surface conforms to our naming; treat cmdk as a transitive that may be swapped later. |
| Token reconciliation pass uncovers material drift from skill copy | Treat as design fixes inside `packages/tokens/src/`; never edit the skill copy. |

---

## 5. Build Pipeline

### 5.1 Task graph (Turborepo)

```
pnpm install
  └─ tokens:build      (no deps — copy + verify)
        └─ react:build (depends ^tokens:build — tsup + tailwind compile)
              └─ docs:build (depends ^react:build — Astro build)
test, lint, typecheck run on each package, in parallel where independent.
```

`turbo.json` caches by content hash. Local dev uses `pnpm dev` which fan-outs into per-package watch modes.

### 5.2 Library bundler

`tsup` for both packages.

Phase 1 chose tsup for setup minimalism (esbuild speed, ESM+CJS+dts in one config). Vite library mode and unbuild are deliberately deferred; revisit only if we hit a feature gap.

### 5.3 Tailwind compile to `styles.css`

`packages/react/scripts/build-css.mjs`:
1. Read `packages/tokens/src/tokens.css` verbatim.
2. Write a temporary entry to `.tmp/react.entry.css`:
   ```css
   @layer tokens { /* tokens.css contents inlined */ }
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
3. Invoke `tailwindcss` CLI with:
   - `content: ['src/**/*.{ts,tsx}']`
   - inline config that consumes `@talon-ui/tokens/preset`
4. Emit `dist/styles.css` (minified in CI, source-mapped in dev).

A `TAILWIND_VERSION` env var (default `v3`) switches preset vs `@theme inline` mode for future flexibility.

### 5.4 `package.json#exports` (react)

```jsonc
{
  "name": "@talon-ui/react",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles.css": "./dist/styles.css",
    "./package.json": "./package.json"
  },
  "sideEffects": ["**/*.css"],
  "files": ["dist", "README.md"]
}
```

### 5.5 CI / Release workflows (GitHub Actions)

`ci.yml` (every PR):
- setup-node + pnpm
- `pnpm install --frozen-lockfile`
- `pnpm turbo run lint test build`
- `pnpm scripts/verify-skill-symlinks.mjs`
- `pnpm scripts/verify-token-parity.mjs`
- `pnpm changeset status --since=origin/main` (refuses PRs that change package source without an attached changeset)

`release.yml` (push to main):
- `changesets/action@v1` opens or maintains the Version PR
- merging Version PR triggers `pnpm changeset publish` with `NPM_TOKEN`

---

## 6. Documentation Site (`apps/docs`, Astro 4 + Starlight)

### 6.1 Why Astro Starlight

- Native zero-JS for prose; islands hydrate only demo blocks → small bundle.
- MDX with React islands hosts real `<Button />` previews without forking content.
- Starlight ships sidebar/search/dark-mode/version switch out of the box.

### 6.2 Directory

```
apps/docs/
├── astro.config.mjs                    ← integrations: starlight, react, mdx
├── package.json
├── public/                             ← favicon, og-image
├── src/
│   ├── content/
│   │   ├── docs/
│   │   │   ├── index.mdx               ← landing + quick start
│   │   │   ├── getting-started/{installation,theming,dark-mode,tailwind-setup}.mdx
│   │   │   ├── tokens/{overview,colors,spacing,typography,status}.mdx
│   │   │   ├── components/<name>.mdx   ← one per component (×45)
│   │   │   ├── patterns/{dashboard,kanban,settings-shell,ai-chat}.mdx
│   │   │   └── changelog.mdx           ← auto-include CHANGELOG.md
│   │   └── config.ts
│   ├── components/                     ← Astro/React infra components
│   │   ├── ComponentPreview.astro      ← demo container, source toggle, isolated iframe
│   │   ├── PropsTable.astro            ← consumes generated props JSON
│   │   ├── ColorTokenTable.tsx
│   │   ├── DesignTokenSwatch.tsx
│   │   └── DemoFrame.astro
│   ├── styles/global.css               ← @import "@talon-ui/tokens/css"
│   ├── examples/<name>/<variant>.tsx   ← real demo sources referenced by ComponentPreview
│   └── scripts/gen-props-tables.mjs    ← react-docgen-typescript over packages/react/dist/index.d.ts
└── tsconfig.json
```

### 6.3 Per-component page template

Each `components/<name>.mdx` has a fixed shape (when to use → basic → variants → sizes → API → design rationale). PropsTable is auto-generated from `*.types.ts` + JSDoc. Anatomy text is included from `design.md` via MDX include to prevent drift.

### 6.4 Documentation production cost

| Artefact | Source | Per-component cost |
|---|---|---|
| Anatomy prose | design.md include | 0 (referenced) |
| Props table | react-docgen-typescript | 0 (generated) |
| Demo sources (basic, variants, sizes) | hand-written `.tsx` | 30–60 min |
| Visual regression baseline | Playwright auto-capture | 0 (CI) |
| Patterns pages | hand-written | 6–10 h total (4–6 pages) |

Total docs writing budget: ≈ 1 working week for the 45 component pages.

### 6.5 Theming inside docs

The docs site itself consumes `@talon-ui/tokens/css`, so the docs are themselves a Talon Pilot demo. Starlight's theme toggle sets `<html data-theme>` so component demos flip light/dark instantly.

### 6.6 Deployment

Cloudflare Pages or Vercel; main-branch push → preview, release → production. Versioned snapshots saved under `apps/docs/dist-versions/<semver>/` for the Starlight version switcher.

---

## 7. Testing Strategy

### 7.1 Pyramid

| Layer | Tool | Run on |
|---|---|---|
| Unit | Vitest | every PR, 100% on `primitives/` |
| Component / integration | Vitest + React Testing Library + `@axe-core/react` | every PR |
| Visual regression | Playwright screenshot against docs demo pages | every PR |
| End-to-end integration | `examples/*` apps booted via Playwright | weekly + pre-release |

### 7.2 Per-component required matrix

| Test | Concern | Tool |
|---|---|---|
| Rendering | default variant, prop pass-through, forwardRef target | RTL |
| Variants | every `variant × size` snapshot | Vitest inline snapshot |
| Behaviour | click / keyboard / hover / focus / disabled / loading | RTL + user-event |
| Controlled | controlled + uncontrolled + onChange | RTL |
| A11y | axe 0 violations, role, label, ARIA | @axe-core/react |
| Theme | light + dark screenshots | Playwright |
| Anatomy | DOM structure matches design.md §6.x | Vitest (`*.anatomy.test.ts`) |

### 7.3 Anatomy lock

`<name>.anatomy.test.ts` is a structural contract. Any DOM change forces an explicit snapshot update, which in turn forces a CHANGELOG entry — anatomy drift cannot ship silently.

### 7.4 Token parity automation

`scripts/verify-token-parity.mjs` parses `tokens.css`, `tokens.json`, `tailwind.preset.js`, asserts all three carry identical key/value sets. CI fails on any divergence.

### 7.5 Visual regression policy

- Baselines live in `tests/visual/__baseline__/`.
- Diff threshold 0.1%.
- Failures upload diff artefacts to PR.
- Baseline updates require `pnpm test:visual:update` from a maintainer with reviewer sign-off.

### 7.6 A11y gate

`pnpm test:a11y` runs axe across all components and exercises key keyboard flows (Tab / Shift+Tab / Esc / Enter / Arrow keys). Violations fail CI. Suppressions require an inline justification comment.

### 7.7 Coverage gates

| Path | Line | Branch |
|---|---|---|
| `src/primitives/` | 100% | 100% |
| `src/components/*` (Blocks 1–3) | ≥ 85% | ≥ 80% |
| `src/components/*` (Block 4 business rows) | ≥ 70% | ≥ 65% |

---

## 8. Release & Version Governance

### 8.1 Tooling

`@changesets/cli` from day one. PRs include a `.changeset/*.md` describing scope and bump kind. `changesets/action@v1` opens and maintains a "Version PR" automatically; merging that PR triggers npm publish.

### 8.2 Versioning rules

| Change | Bump |
|---|---|
| anatomy bug fix, internal refactor, a11y patch | patch |
| new component, new prop, additive token | minor |
| prop removed or default changed, anatomy change, token value changed or removed | major |

Special rules:
- Adding a token = minor; changing a token value = major; removing = major.
- During 0.x: breaking changes go in minor but are tagged `BREAKING` in CHANGELOG. Strict semver from 1.0.

### 8.3 Phase 1 version cadence

- `@talon-ui/tokens@0.1.0` and `@talon-ui/react@0.1.0` ship at end of Block 1.
- `0.2.0` at end of Block 2 (+13 form components).
- `0.3.0` at end of Block 3 (+12 navigation/feedback).
- `0.4.0` at end of Block 4 (+10 display/feedback; 45 components total).

### 8.4 1.0.0 gate

All four must hold:
1. 45 components complete and documented.
2. At least one internal production project on `@talon-ui` for ≥ 4 weeks with zero P0 bugs.
3. Docs site live; token parity / anatomy / a11y / visual tests green for ≥ 2 weeks.
4. CHANGELOG declares the 1.0 compatibility boundary explicitly.

### 8.5 Publish flow

1. Author opens PR with `.changeset/*.md`.
2. CI runs lint, test, build, verify-symlinks, verify-token-parity, a11y, visual.
3. Merge to main.
4. Changesets bot opens / updates the Version PR (bumps `package.json`, generates CHANGELOG, consumes changesets).
5. Maintainer reviews and merges Version PR.
6. `release.yml`: install → build → `pnpm changeset publish` → git tag → GitHub Release notes from CHANGELOG.

### 8.6 Publish matrix (Phase 1)

| Package | Published? | npm tag |
|---|---|---|
| `@talon-ui/tokens` | yes (0.x+) | `latest` |
| `@talon-ui/react` | yes (0.x+) | `latest` |
| `@talon-ui/vue` | no (`private: true`) | – |

### 8.7 npm scope & permissions

- Register `@talon-ui` npm scope (free, public).
- `NPM_TOKEN` granular access token scoped to `@talon-ui` with publish.
- Publish with `--access public`.

### 8.8 Pre-release channels

| Tag | Trigger | Use |
|---|---|---|
| `next` | main push → `pnpm changeset version --snapshot next && publish --tag next` | internal docs / integration previews |
| `canary` | feature-branch label `canary` | personal validation |
| `latest` | Version PR merge | public stable |

### 8.9 Breaking change communication

CHANGELOG `BREAKING` entries open with **Upgrade impact**: affected files, prop renames or defaults, a11y behaviour changes, and the codemod command (when applicable).

Starting at Block 4 we maintain `packages/codemod/` (not npm-published) running on `jscodeshift`; invoke via `pnpm exec @talon-ui/codemod v1` etc.

### 8.10 License

MIT for all published packages. Each `package.json` declares the license; root `README` notes attributions for Radix UI, react-day-picker, cmdk.

### 8.11 Pre-publish safety

`scripts/preflight.mjs` runs in `prepublishOnly` and aborts publish unless:
1. `dist/` exists and is non-empty.
2. `dist/index.{js,cjs,d.ts}` present.
3. `dist/styles.css` present and ≥ 1 KB.
4. `peerDependencies` declared.
5. `sideEffects` field present.
6. Current branch is `main` and the working tree is clean.
7. Token parity passes.

---

## 9. Open Items Carried Into Implementation Planning

These are intentionally deferred to the implementation plan (writing-plans skill):

- Exact Form public API shape (must land in Block 2 week 1 to unblock everything else).
- Choice of Combobox key navigation contract (cmdk default vs custom).
- Whether `BusinessRows` ships as one module or one component per file.
- Storage backend for visual regression baselines (in-repo vs Git LFS vs external).
- npm 2FA requirements before first publish.

These do not block design approval; they are surfaced so the plan agent will pick them up.
