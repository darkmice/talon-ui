# Block 1 · Foundational Primitives Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Ship the 10 Block 1 components of `@talon-ui/react` and bump to `@talon-ui/react@0.2.0-alpha`. Each component has source, variants, anatomy test, behaviour test, and a one-line addition to the top-level barrel.

**Architecture:** All Block 1 components share the same shape: a folder under `packages/react/src/components/<name>/` with `<name>.tsx`, `<name>.variants.ts`, `<name>.types.ts`, `<name>.test.tsx`, `<name>.anatomy.test.ts`, `index.ts`. Variants use CVA. Class composition uses the `cn` helper. Token-only styling via Tailwind utilities resolved through `@talon-ui/tokens/preset`. Anatomy is locked to `references/design.md` and verified by snapshot.

**Tech Stack:** React 18, TypeScript 5, CVA, clsx, tailwind-merge, Radix Slot (for `asChild`), Vitest + Testing Library + jsdom, Tailwind 3 via preset, lucide-react for icons (already a dep).

**Reference spec:** `docs/superpowers/specs/2026-05-11-talon-ui-library-design.md` §4.4 (Block 1 list), `skills/talon-ui/references/design.md` §6.1–§6.12 + §6.49 + §6.4 (anatomy per component), `skills/talon-ui/references/ui-kit.html` (visual source of truth).

---

## Pre-flight assumptions

- Working from a worktree of `darkmice/talon-ui` / `dark/talon-ui` at tag `foundation-v0.1.0-alpha` (commit `4b926c3`).
- `packages/react/` builds (tsup + Tailwind CLI). `pnpm test` green.
- Issues for all 10 Block 1 components exist on `x.xgit.pro/dark/talon-ui` (created before Task 1 — see Task 0).

---

## Code-file convention (carried over from Foundation)

Every newly-created `.ts` / `.tsx` / `.css` file begins with the MIT block header:

```
/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */
```

JSON / Markdown excluded.

---

## Per-component task template

Each component task follows this template. Substitute `<Name>` / `<file-name>` per component.

### Files

```
packages/react/src/components/<file-name>/
├── <file-name>.tsx          ← React.forwardRef + asChild where applicable
├── <file-name>.variants.ts  ← CVA config (variant / size / tone / iconOnly)
├── <file-name>.types.ts     ← public Props interface (exported)
├── <file-name>.test.tsx     ← rendering + behaviour
├── <file-name>.anatomy.test.ts ← DOM-structure snapshot locked to design.md §<section>
└── index.ts                  ← named exports only
```

Plus one line added to `packages/react/src/index.ts` exporting from the new folder.

### Steps (canonical sequence — every component follows this)

- [ ] **Step 1: Update the x.xgit.pro issue** with the upcoming branch / commit plan (comment, don't close yet).
- [ ] **Step 2: Write `<file-name>.anatomy.test.ts`** — RTL render + inline snapshot that locks the exact DOM that `design.md` §<section> describes (icon size, padding, gap, role, ARIA, status-dot, etc.). Run; expect FAIL (component not implemented).
- [ ] **Step 3: Write `<file-name>.test.tsx`** — minimum 3 behaviour tests (rendering / variants / interaction). Run; expect FAIL (component not implemented).
- [ ] **Step 4: Write `<file-name>.variants.ts`** with CVA config. Reference `design.md` for size / variant / tone enums. Token-only (Tailwind utilities resolved by preset). Hard-pinned hex (danger red, star amber, diff bg) allowed where the design demands.
- [ ] **Step 5: Write `<file-name>.types.ts`** — public Props (extends matching HTML attrs; includes `className`, `asChild` if applicable, all CVA props).
- [ ] **Step 6: Write `<file-name>.tsx`** — forwardRef, `displayName`, `cn(...variants, className)`, `asChild` via `@radix-ui/react-slot` if applicable.
- [ ] **Step 7: Write `<file-name>/index.ts`** — named re-export only.
- [ ] **Step 8: Add export line to `packages/react/src/index.ts`**: `export * from './components/<file-name>/index.js';`.
- [ ] **Step 9: Run tests** — `pnpm --filter @talon-ui/react test` — all green (4+ existing + new).
- [ ] **Step 10: Run typecheck + lint** — `pnpm --filter @talon-ui/react typecheck && pnpm --filter @talon-ui/react lint`.
- [ ] **Step 11: Build** — `pnpm --filter @talon-ui/react build`. Verify `dist/styles.css` still > 1KB and new component is exported in `dist/index.d.ts`.
- [ ] **Step 12: Commit** — `feat(react): add <Name> component (Block 1)`. Single commit per component.
- [ ] **Step 13: Comment on the x.xgit.pro issue** with the commit SHA + commit URL. Close the issue.
- [ ] **Step 14: Push both remotes** — `git push origin main && git push github main`.

---

## Task 0: Create Block 1 issues on x.xgit.pro

**Why first:** project memory enforces "one ticket per component before implementation".

**File:** none (creates 10 issues remotely; no local diff).

- [ ] **Step 1: For each Block 1 component, post a new issue** to `dark/talon-ui` on `x.xgit.pro` with the standard template:

  ```
  Title: <Name>: implement Block 1 primitive
  Body:
  ## Background
  Block 1 of the @talon-ui/react Phase-1 rollout. Spec carries through from foundation.

  ## Problem
  Component does not yet exist. Need source + variants + anatomy + behaviour tests.

  ## Acceptance
  - [ ] design.md §<section> anatomy snapshot locked
  - [ ] CVA variants enumerate every `variant × size × tone` listed in the spec
  - [ ] forwardRef + displayName + asChild (where Radix supports it)
  - [ ] 3+ behaviour tests, all passing
  - [ ] exported from `@talon-ui/react`
  - [ ] commit + push, comment SHA back here, close

  ## Source
  Plan: docs/superpowers/plans/2026-05-12-talon-ui-block-1-primitives.md
  Spec: skills/talon-ui/references/design.md §<section>
  ```

  Components and their spec sections:

  | # | Component | design.md § | Token highlights |
  |---|---|---|---|
  | 1 | Button | §6.1 | variant: primary/secondary/ghost/danger · size: sm/md/lg · iconOnly · loading · leading |
  | 2 | Input | §6.2 | prefix/suffix slots · focus-ring · disabled |
  | 3 | Textarea | §6.2 | autosize hook · same focus rules |
  | 4 | Tag | §6.3 | 6 status pairs · chip variant · removable |
  | 5 | Avatar | §6.4 | sizes 28/32/40 · status dot · group + overflow chip |
  | 6 | Card | §6.5 | hoverable variant · radius lg · padding 20 |
  | 7 | Badge | §6.49 | number 12-tall, min-width 12, red bg white fg, tabular-nums; dot 8×8 |
  | 8 | Divider | §4 | h / v, color border-default |
  | 9 | Space | §4 | gap container, direction × size × align/justify |
  | 10 | Typography | §3 | `Title (h1/h2/h3) / Text / Paragraph / Link` semantic level |

- [ ] **Step 2: Record the issue numbers** in a local note `docs/superpowers/notes/block-1-issues.md` (one line per component: `Button → #N`). This file is committed.
- [ ] **Step 3: Commit the note** — `docs(notes): track Block 1 x.xgit.pro issue numbers`.

---

## Task 1: Button (design.md §6.1)

**Files:**
- Create: `packages/react/src/components/button/{button.tsx,button.variants.ts,button.types.ts,button.test.tsx,button.anatomy.test.ts,index.ts}`
- Modify: `packages/react/src/index.ts` — append `export * from './components/button/index.js';`

Apply the per-component task template above with these specifics:

**Variants (CVA):**

```ts
// packages/react/src/components/button/button.variants.ts
import { cva } from 'class-variance-authority';

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

**Props (types.ts):**

```ts
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from './button.variants.js';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  loading?: boolean;
}
```

**Component (tsx):**

```tsx
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { buttonVariants } from './button.variants.js';
import type { ButtonProps } from './button.types.js';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, iconOnly, asChild, leading, trailing, loading, disabled, children, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : 'button'}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, iconOnly }), className)}
      {...rest}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : leading}
      {children}
      {!loading && trailing}
    </Comp>
  );
});
```

**Behaviour tests (test.tsx):** rendering each variant; click handler; disabled/loading state; asChild renders as anchor; leading/trailing slots render.

**Anatomy test (anatomy.test.ts):** snapshot of `<Button leading={<Plus />}>新建</Button>` matches design.md §6.1.

**peerDependency note:** `@radix-ui/react-slot` becomes a real dep — add to `packages/react/package.json` `peerDependencies` (with optional flag false). Mention this in the commit message.

---

## Task 2: Input (design.md §6.2)

Files: `packages/react/src/components/input/{...}` and barrel update.

Variants: tones `default | invalid` × sizes `sm | md | lg` (heights 28/36/44). Prefix/suffix `ReactNode` slots in the wrapper. focus ring via `focus-within:tp-focus-ring` on the wrapper.

Component anatomy:
```
<label class="tp-input" data-size="md">
  {prefix}
  <input class="tp-input__field" ref={ref} {...rest} />
  {suffix}
</label>
```

Behaviour tests: typing fires onChange, disabled prevents typing, invalid tone adds `aria-invalid`. Prefix/suffix render in DOM.

---

## Task 3: Textarea (design.md §6.2)

Files: `packages/react/src/components/textarea/{...}` and barrel update.

Same focus/tone rules as Input but `<textarea>` underlying. `autosize` boolean prop: when true, attach a small layout-effect that adjusts `rows` based on `scrollHeight`. Otherwise plain controlled textarea.

Behaviour tests: typing extends rows when `autosize`; without autosize the rows prop wins.

---

## Task 4: Tag (design.md §6.3)

Files: `packages/react/src/components/tag/{...}` and barrel update.

Variants: `tone` = `progress | pending | done | blocked | idle | info` (status pairs in tokens.css) plus `neutral` (skill chip default). Optional `removable` prop adds an `X` icon button with `aria-label`.

Anatomy:
```
<span class="tp-tag" data-tone="done">
  {leading-dot?}
  <span class="tp-tag__label">{children}</span>
  {removable && <button class="tp-tag__remove" aria-label="Remove">×</button>}
</span>
```

---

## Task 5: Avatar + AvatarGroup (design.md §6.4)

Files: `packages/react/src/components/avatar/{avatar.tsx, avatar-group.tsx, avatar.variants.ts, avatar.types.ts, avatar.test.tsx, avatar.anatomy.test.ts, index.ts}` and barrel update.

Uses `@radix-ui/react-avatar` for `<Avatar.Root>`/`<Avatar.Image>`/`<Avatar.Fallback>`. Sizes `sm | md | lg` map to 28/32/40. Status dot positioned bottom-right via `data-status` attribute. AvatarGroup overlaps up to 3, renders `+N` chip for overflow.

`@radix-ui/react-avatar` becomes a new peer dependency.

---

## Task 6: Card (design.md §6.5)

Files: `packages/react/src/components/card/{...}` and barrel update.

Variants: `padding` (`sm | md | lg`), `hoverable` (boolean), `interactive` (boolean — applies role=button + focus ring). All Tailwind utilities resolved by preset (`p-tp-5`, `rounded-lg`, `bg-bg-surface`, `border border-border`, `hover:border-primary-200`).

---

## Task 7: Badge (design.md §6.49)

Files: `packages/react/src/components/badge/{...}` and barrel update.

Variants: `kind` = `number | dot`. Number variant: 12-tall, min-width 12, `bg-[#DC2626]` (hard-pin allowed for danger red), text-white, `tp-nums`. Dot variant: 8×8 absolute positioned at top-right (`-top-1 -right-1`). Wraps children when given; standalone when not.

Behaviour tests: `count > 99` renders as `99+`. Dot variant exposes `aria-label` for screen readers.

---

## Task 8: Divider (design.md §4)

Files: `packages/react/src/components/divider/{...}` and barrel update.

Variants: `orientation` = `horizontal | vertical`, `tone` = `default | strong`. Default uses `border-border`; strong uses `border-border-strong`. Horizontal = `<hr>` with `role="separator"` (the default); vertical = a `<span>` styled as a 1px-wide rule.

---

## Task 9: Space (design.md §4)

Files: `packages/react/src/components/space/{...}` and barrel update.

Variants: `direction` = `horizontal | vertical`, `size` = `xs | sm | md | lg | xl` (mapped to spacing tokens 1/2/3/4/5), `align` and `justify` for flex alignment. Renders a `<div class="flex">` with Tailwind `gap-tp-N`.

---

## Task 10: Typography (design.md §3)

Files: `packages/react/src/components/typography/{title.tsx, text.tsx, paragraph.tsx, link.tsx, typography.variants.ts, typography.test.tsx, typography.anatomy.test.ts, index.ts}` and barrel update.

`<Title level={1|2|3}>` renders `<h1|h2|h3>` with `text-h1` / `text-h2` / `text-h3`. `<Text>` renders `<span>` with `text-body`; supports `tone` = `primary | secondary | tertiary | inverse` mapped to `text-text-*`. `<Paragraph>` = `<p>` with `text-body` and bottom margin. `<Link>` = `<a>` with primary colour and underline-on-hover, supports `asChild`.

Each sub-component is exported by name from `packages/react/src/components/typography/index.ts`.

---

## Task 11: Bump to 0.2.0-alpha and tag

- [ ] **Step 1: Write changeset** — `.changeset/block-1.md` bumping `@talon-ui/react` `minor` (0.1.0 → 0.2.0). `@talon-ui/tokens` does NOT bump (no token changes in Block 1).
- [ ] **Step 2: Run version** — `pnpm version-packages`. Verify `packages/react/package.json` at `0.2.0`.
- [ ] **Step 3: Build** — `pnpm build`.
- [ ] **Step 4: Preflight** — `pnpm preflight`.
- [ ] **Step 5: Commit** — `chore: release @talon-ui/react@0.2.0-alpha (Block 1)`.
- [ ] **Step 6: Tag** — `git tag -a block-1-v0.2.0-alpha -m "Talon UI Block 1 — 10 foundational primitives"`.
- [ ] **Step 7: Push commits + tag to both remotes.**

---

## Plan Self-Review

**1. Spec coverage:** All 10 components from spec §4.4 Block 1 covered. Each component task references its `design.md` section. Anatomy locking enforced via `*.anatomy.test.ts` per component.

**2. Placeholder scan:** No TBD/TODO. Sub-component variant lists (Tag tones, Avatar sizes, Typography level) are explicit. The full anatomy DOM for Input / Tag / Avatar / Badge is described.

**3. Type consistency:**
- `ButtonProps` defined in `button.types.ts`, references `buttonVariants` from `button.variants.ts`. Consistent with foundation `cn` import path.
- `forwardRef` + `displayName` used uniformly.
- Barrel pattern (`export * from './components/<x>/index.js'`) identical for every component.
- Peer dep additions called out per component that introduces a new Radix subpackage (Slot for Button, Avatar primitive for Avatar).

**4. Issue-ticketing contract:** Task 0 creates 10 issues before any code. Each component task's Step 1 + Step 13 reference the issue. Matches the memory contract recorded on 2026-05-12.
