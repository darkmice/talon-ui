# Block 3 · Navigation & Feedback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Ship the 12 Block 3 components of `@talon-ui/react` and bump to `@talon-ui/react@0.4.0-alpha`. Overlay-heavy block: Modal, Drawer, Popover, Tooltip, Menu, Popconfirm, Toast all share Radix portal patterns; we standardise the dismissal / focus-trap / animation surface across them.

**Architecture:** Continued per-component shape from Block 1 / 2. New shared utility: `<DismissibleOverlay>` is NOT introduced — each overlay component wraps its own Radix primitive directly. Standardised CVA classes for popover-like content surfaces are extracted into `packages/react/src/primitives/overlay.ts` for reuse across Popover / Popconfirm / Tooltip / Menu / Modal / Drawer where applicable.

**Tech Stack:** Radix subpackages (`react-tabs`, `react-dialog`, `react-popover`, `react-tooltip`, `react-dropdown-menu`, `react-toast`); CVA; existing primitives.

**Reference spec:** `docs/superpowers/specs/2026-05-11-talon-ui-library-design.md` §4.4 Block 3 list; `skills/talon-ui/references/design.md` §6.x anatomy per component.

---

## Pre-flight assumptions

- Working from `dark/talon-ui` at tag `block-2-v0.3.0-alpha`.
- All Block 1 + Block 2 components shipped.
- 12 issues created at `x.xgit.pro/dark/talon-ui` (#24–#35 expected) before Task 1 starts.

---

## Code-file convention (unchanged)

MIT header on every new code file. Anatomy test files use `.tsx`. JSON / Markdown / YAML excluded.

---

## Per-component task template

Same 16-step sequence as Block 1 / 2 plans. Subagent dispatches per component, controller pushes + closes.

---

## Task 0: Create Block 3 issues on x.xgit.pro

Controller creates 12 issues via the same template used for Block 1 / 2.

| # | Component | design.md § | Radix / dep | Notes |
|---|---|---|---|---|
| 1 | Tabs | §6.6 / §6.21 | `@radix-ui/react-tabs` | underline indicator 2px primary-500; supports detail-page tabs |
| 2 | Breadcrumb | §6.43 | – (DIY) | caption + slash separator; folded middle dropdown; truncation |
| 3 | Pagination | §6.42 | – (DIY) | 32×32 squares; current primary; per-page size select |
| 4 | Stepper | §6.9 | – (DIY) | 28px circle indices; complete=blue tick, current=primary, idle=outline |
| 5 | Menu (Dropdown) | §6.34 | `@radix-ui/react-dropdown-menu` | submenu chevron, danger items, separator, shortcut text |
| 6 | Modal | §6.36 | `@radix-ui/react-dialog` | sizes 480/640/800, ESC + first-focus, overlay rgba |
| 7 | Drawer | §6.37 | `@radix-ui/react-dialog` | side=right (also top/left/bottom), widths 400/520/720 |
| 8 | Banner (Alert) | §6.10 | – (DIY) | 4 tones, 4px status bar left, dismissable, action slot |
| 9 | Toast (Notification) | §6.44 | `@radix-ui/react-toast` | top-right stack, 4s auto / 8s error; ToastProvider + useToast |
| 10 | Popconfirm | §6.35 | `@radix-ui/react-popover` | confirm + cancel buttons, ok/cancel labels, danger variant |
| 11 | Popover | §6.35 | `@radix-ui/react-popover` | bare API + arrow + close button |
| 12 | Tooltip | §6.35 | `@radix-ui/react-tooltip` | dark bg #0F172A white text 12px, 6px arrow |

---

## Tasks 1–12

Follow per-component template. Order suggestion (lightest first):

1. **Tabs** (Radix-wrap, simplest)
2. **Tooltip** (Radix-wrap, almost trivial)
3. **Popover** (Radix-wrap, simple)
4. **Popconfirm** (composes Popover + Button)
5. **Menu** (Radix-wrap, medium — submenu + danger + shortcut)
6. **Modal** (Radix-wrap dialog)
7. **Drawer** (sibling of Modal; sides)
8. **Banner** (DIY)
9. **Toast** (Radix-wrap + provider/hook)
10. **Pagination** (DIY, internal state)
11. **Stepper** (DIY composite)
12. **Breadcrumb** (DIY)

Group 1–4 are "popover-likes" sharing visual contract; ship together early.

---

## Task 13: cut 0.4.0-alpha tag

- [ ] `.changeset/block-3.md` bumping `@talon-ui/react` minor.
- [ ] `pnpm version-packages`.
- [ ] `pnpm build && pnpm preflight`.
- [ ] Commit: `chore: release @talon-ui/react@0.4.0-alpha (Block 3)`.
- [ ] Tag `block-3-v0.4.0-alpha` annotated.

---

## Plan Self-Review

**Spec coverage:** All 12 Block 3 components from spec §4.4 covered. Each ties back to its design.md section.

**Placeholder scan:** None. Each component's dep + scope is explicit.

**Type consistency:** Continues Block 1/2 conventions (forwardRef + displayName + asChild + className). Toast introduces a `useToast` hook + `ToastProvider`; Modal/Drawer/Popover/Popconfirm all wrap their Radix primitive directly.

**Issue-ticketing contract:** Task 0 creates 12 issues; each task comments + closes via xgit-ticketing.
