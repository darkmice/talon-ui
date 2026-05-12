# Block 4 · Data Display & Misc Feedback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Ship the final 10 Block 4 components of `@talon-ui/react` and bump to `@talon-ui/react@0.5.0-alpha`. After this, Phase 1 reaches the Ant Design parity target (45 components total).

**Architecture:** Continued per-component shape from Blocks 1–3. Mostly DIY visual components; only Collapse uses Radix (`react-accordion`). `BusinessRows` ships as a single component module exporting 4 Talon-Pilot-specific row helpers (FileRefRow, RoleRow, RiskRow, RuntimeRow).

**Tech Stack:** Radix `react-accordion` (Collapse). CVA. Existing primitives.

**Reference spec:** `docs/superpowers/specs/2026-05-11-talon-ui-library-design.md` §4.4 Block 4; `skills/talon-ui/references/design.md` §6.x anatomy.

---

## Pre-flight assumptions

- Working from `dark/talon-ui` at tag `block-3-v0.4.0-alpha`.
- All Block 1–3 components shipped.
- 10 issues created at `x.xgit.pro/dark/talon-ui` (#36–#45) before Task 1.

---

## Code-file convention (unchanged)

MIT header on every new code file. Anatomy test files use `.tsx`. JSON / Markdown / YAML excluded.

---

## Task 0: Create Block 4 issues on x.xgit.pro

| # | Component | design.md § | Radix / dep | Notes |
|---|---|---|---|---|
| 1 | KanbanCard | §6.8 | – (DIY composite) | id + title + tags + assignee + progress + timestamp |
| 2 | Progress | §6.7 | – (DIY) | linear + circular; height 6 / size 32-120; status colour map |
| 3 | Skeleton | §6.11 | – (DIY) | 1.4s breathing animation; size variants; line/rect/circle |
| 4 | Spin | §6.11 | – (DIY) | Loader2 spinner + optional wrap-content overlay |
| 5 | Empty | §6.11 | – (DIY) | inline icon/image + description + CTA |
| 6 | Result | – | – (DIY) | success / error / 403 / 404 / 500 with icon + title + sub + actions |
| 7 | Statistic | §6.19 | – (DIY) | tabular-nums value + label + delta + trend arrow |
| 8 | Descriptions | §6.18 | – (DIY) | key-value panel; row height 32; mono for IDs |
| 9 | Collapse | §6.47 | `@radix-ui/react-accordion` | row 44; chevron rotates 90° on open |
| 10 | BusinessRows | §6.20 / §6.25 / §6.28 / §6.31 | – (DIY) | FileRefRow / RoleRow / RuntimeRow / RiskRow as a single module |

---

## Tasks 1–10

Per-component template same as Block 3. Order (lightest first):

1. **Skeleton** (DIY, animation only)
2. **Spin** (DIY, wraps content with overlay)
3. **Empty** (DIY, layout)
4. **Result** (DIY, layout)
5. **Statistic** (DIY, layout + tabular-nums)
6. **Progress** (linear + circular, two display modes)
7. **Descriptions** (DIY key-value rows)
8. **Collapse** (Radix-wrap)
9. **KanbanCard** (DIY composite of Tag/Avatar/Progress)
10. **BusinessRows** (4 sub-components in one module)

---

## Task 11: cut 0.5.0-alpha tag

- [ ] `.changeset/block-4.md` bumping `@talon-ui/react` minor.
- [ ] `pnpm version-packages`.
- [ ] Build + preflight.
- [ ] Commit + annotated tag `block-4-v0.5.0-alpha`.

After Block 4, total Phase 1 ≈ **45 components shipped**.

---

## Plan Self-Review

**Spec coverage:** All 10 Block 4 components covered.

**Placeholder scan:** None.

**Type consistency:** Continues Blocks 1–3 conventions. `BusinessRows` ships 4 named exports from a single file.

**Issue-ticketing contract:** Task 0 creates 10 issues; each task closes its issue via xgit-ticketing.
