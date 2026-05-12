# Block 2 · Forms & Data Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Ship the 13 Block 2 components of `@talon-ui/react` and bump to `@talon-ui/react@0.3.0-alpha`. Land `Form` first (it freezes the public API that every other entry component consumes), then the rest mostly in parallel-able order.

**Architecture:** Same per-component shape as Block 1 (`packages/react/src/components/<name>/<name>.{tsx,variants.ts,types.ts,test.tsx,anatomy.test.tsx,index.ts}` + docs page + 2–3 demos in a single commit per component). `Form` follows the shadcn/ui pattern: a thin layer over `react-hook-form` with `<FormItem>` / `<FormLabel>` / `<FormDescription>` / `<FormMessage>` / `<FormField>` and a `useField()` hook for child controls to render error state. Other entry controls (Select, Checkbox, etc.) work standalone AND inside `<FormField>`.

**Tech Stack:** React 18, TypeScript 5, CVA, Radix UI subpackages (`react-checkbox`, `react-radio-group`, `react-switch`, `react-slider`, `react-popover`), `cmdk` (Combobox/AutoComplete), `react-day-picker` (DatePicker), `react-hook-form` (Form peerDep), Vitest + Testing Library.

**Reference spec:** `docs/superpowers/specs/2026-05-11-talon-ui-library-design.md` §4.4 Block 2 list; `skills/talon-ui/references/design.md` §6.x anatomy per component.

---

## Pre-flight assumptions

- Working from `dark/talon-ui` at tag `block-1-v0.2.0-alpha`.
- All Block 1 components shipped (Button → Typography). Form's `<FormLabel>` reuses `Title`/`Text`; `<FormMessage>` reuses `Text` with `caption` variant.
- 13 issues created at `x.xgit.pro/dark/talon-ui` (#11–#23 expected) before Task 1 starts.

---

## Code-file convention (unchanged)

Every new code file begins with:

```
/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */
```

Anatomy test files use `.tsx` extension. JSON / Markdown / YAML excluded.

---

## Per-component task template (carried from Block 1)

Same 16-step sequence as Block 1 plan: comment issue → write tests RED → write impl → barrel append → pipeline green → write 2–3 demos + mdx → docs build green → commit `feat(react): add <Name> component + docs (Block 2)` closing the issue → controller pushes + closes.

---

## Task 0: Create Block 2 issues on x.xgit.pro

Issue creation script in controller. Components and their spec sections:

| # | Component | design.md § | Radix / dep | Notes |
|---|---|---|---|---|
| 1 | Form | – | `react-hook-form` peer | Wrappers: `FormItem`, `FormLabel`, `FormDescription`, `FormMessage`, `FormField`. `useField()` hook for context. |
| 2 | Select | §6.33 | (custom popover + listbox) | size sm/md/lg; multi-select with chip count; danger tone; option groups |
| 3 | Combobox / AutoComplete | §6.46 | `cmdk` | search field + grouped results, keyboard nav, highlight matches |
| 4 | Checkbox | §6.3 generic | `@radix-ui/react-checkbox` | sm/md sizes, indeterminate, disabled |
| 5 | Radio (group) | – | `@radix-ui/react-radio-group` | horizontal/vertical orientation |
| 6 | Switch | §6.x | `@radix-ui/react-switch` | sm/md sizes |
| 7 | Slider | §6.40 | `@radix-ui/react-slider` | track 4px, thumb 16, single + range |
| 8 | NumberInput | §6.41 | – (DIY) | up/down arrows on right, hold-to-step, unit suffix |
| 9 | Rate | §6.48 | – (DIY) | 5 stars, half-step support, hover preview |
| 10 | DatePicker | §6.38 | `react-day-picker` + popover | single + range modes |
| 11 | TimePicker | §6.39 | popover | three scrolling columns (h/m/s) |
| 12 | Upload | §6.45 | – | dashed drop zone + file list with progress |
| 13 | ColorPicker | – | – (compact) | hue + saturation board, simple swatch picker |

---

## Tasks 1–13: one per component

Follow the per-component template. Order:

1. **Form** (foundational; lands first; freezes API)
2. Checkbox, Radio, Switch, Slider (Radix-backed, ~1 day each)
3. NumberInput, Rate (DIY simple, ~½ day each)
4. Select (medium — custom popover + listbox)
5. Combobox (depends on cmdk)
6. DatePicker, TimePicker, Upload (heavy — each 1–2 days; ColorPicker can ship compact)
7. ColorPicker (compact)

Each task's mdx, variants, props follow Block 1 conventions.

---

## Task 14: cut 0.3.0-alpha tag

Mirror Block 1 Task 11:

- [ ] Write `.changeset/block-2.md` bumping `@talon-ui/react` minor (0.2.0 → 0.3.0). `@talon-ui/tokens` patch if any token added/changed.
- [ ] `pnpm version-packages`.
- [ ] `pnpm build && pnpm preflight`.
- [ ] Commit: `chore: release @talon-ui/react@0.3.0-alpha (Block 2)`.
- [ ] Tag: `block-2-v0.3.0-alpha` annotated.
- [ ] Controller pushes commits + tag to both remotes.

---

## Plan Self-Review

**Spec coverage:** All 13 Block 2 components from spec §4.4 covered. Form API anchored to react-hook-form (shadcn pattern). Anatomy locking per component continues via `*.anatomy.test.tsx`.

**Placeholder scan:** No TBD/TODO. Component scope and dep matrix explicit.

**Type consistency:** Names match Block 1 conventions (forwardRef + displayName + asChild + className). Form sub-components reuse `Title`/`Text` from Typography. Radix subpackage peer/dep policy carried over (Slot/Avatar already in deps; Block 2 additions land as `dependencies`).

**Issue-ticketing contract:** Task 0 creates 13 issues before any code; each component task's Step 1 comments + Step 13–15 close the issue.
