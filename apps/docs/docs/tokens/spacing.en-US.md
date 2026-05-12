---
title: Spacing Tokens
nav:
  title: Tokens
  order: 2
order: 4
---

# Spacing Tokens

---

## Spacing Scale

Spacing uses a 4px base grid, exposed as `--tp-space-*` tokens. The Tailwind preset extends `spacing` with `tp-N` keys, usable with `p-*` / `m-*` / `gap-*` / `w-*` / `h-*` and all other spacing utilities.

| Token | Value | Tailwind (examples) |
| --- | --- | --- |
| `--tp-space-0` | `0px` | `p-tp-0` |
| `--tp-space-1` | `4px` | `p-tp-1` / `gap-tp-1` / `m-tp-1` |
| `--tp-space-2` | `8px` | `p-tp-2` / `gap-tp-2` |
| `--tp-space-3` | `12px` | `p-tp-3` / `gap-tp-3` |
| `--tp-space-4` | `16px` | `p-tp-4` / `gap-tp-4` |
| `--tp-space-5` | `20px` | `p-tp-5` / `gap-tp-5` |
| `--tp-space-6` | `24px` | `p-tp-6` / `gap-tp-6` |
| `--tp-space-8` | `32px` | `p-tp-8` / `gap-tp-8` |
| `--tp-space-10` | `40px` | `p-tp-10` / `gap-tp-10` |
| `--tp-space-14` | `56px` | `p-tp-14` |
| `--tp-space-20` | `80px` | `p-tp-20` |

> The token numbering is non-contiguous (steps 7, 9, 11-13, 15-19 are omitted) — only actually used steps are registered to reduce decision fatigue.

**Common mappings:**

| Context | Recommended step |
| --- | --- |
| Icon-to-text gap | `tp-1` (4px) |
| Inline element horizontal gap | `tp-2` (8px) |
| Component internal padding | `tp-2`–`tp-3` (8–12px) |
| Card padding | `tp-3`–`tp-6` (12–24px) |
| Gap between cards | `tp-4`–`tp-5` (16–20px) |
| Page section spacing | `tp-8`–`tp-10` (32–40px) |

---

## Radius Scale

All component border radii must come from this scale — bare `px` values are not permitted.

| Token | Value | Tailwind |
| --- | --- | --- |
| `--tp-radius-xs` | `4px` | — |
| `--tp-radius-sm` | `6px` | `rounded-sm` |
| `--tp-radius-md` | `10px` | `rounded-md` |
| `--tp-radius-lg` | `14px` | `rounded-lg` |
| `--tp-radius-xl` | `20px` | `rounded-xl` |
| `--tp-radius-pill` | `999px` | `rounded-pill` |

> `--tp-radius-xs` (4px) is not exposed as `rounded-xs` in the preset; reference the CSS variable directly when needed.

**Component mapping:**

| Component | Radius step |
| --- | --- |
| Button (md / lg) | `rounded-md` (10px) |
| Button (sm) | `rounded-sm` (6px) |
| Input / Select | `rounded-md` |
| Card / Panel | `rounded-lg` (14px) |
| Modal / Drawer | `rounded-lg` |
| Menu / Tooltip | `rounded-sm` / `rounded-md` |
| Progress / Badge | `rounded-pill` |
| Tag | `rounded-sm` |

---

## Control Heights

All clickable controls (buttons, inputs, selects, pagination buttons, etc.) must use one of the three standard heights — custom heights are not permitted.

| Token | Value | Tailwind | Applies to |
| --- | --- | --- | --- |
| `--tp-control-h-sm` | `28px` | `h-control-sm` | Compact buttons, small Avatar |
| `--tp-control-h-md` | `36px` | `h-control-md` | Default buttons, inputs, selects, pagination |
| `--tp-control-h-lg` | `44px` | `h-control-lg` | Large buttons, touch targets |
