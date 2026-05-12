---
title: Tokens Overview
nav:
  title: Tokens
  order: 2
order: 1
---

# Tokens Overview

Talon Pilot's design token system is expressed as CSS Custom Properties and organized in three layers. Theme switching only rewrites the thin Semantic layer — component code never needs to change.

---

## Three-Layer Model

```
Primitive  ─→  Semantic  ─→  Component
(raw constants)  (purpose-based)  (component-bound)
```

### Layer 1: Primitive

Theme-agnostic fixed constants — color ramps, type scale, spacing, radius, and motion parameters. Naming: `--tp-<category>-<scale>`.

Examples:

```css
--tp-gray-50: #f6f7f9;
--tp-primary-500: #4f60ff;
--tp-space-4: 16px;
--tp-radius-md: 10px;
```

### Layer 2: Semantic

Assigns purpose to Primitive values. Consumers always reference this layer — never reference Primitive directly (except when a full ramp is needed, such as gradient borders or charts).

Examples:

```css
--tp-bg-app:       var(--tp-gray-50);      /* page background */
--tp-text-primary: var(--tp-gray-900);     /* body text */
--tp-interactive-primary: var(--tp-primary-500);
```

Theme switching only rewrites Semantic. Primitive and Component layers remain stable.

### Layer 3: Component

Components consume Semantic tokens and lock in their own sizing, spacing, and visual details. Naming: `--tp-<component>-<property>`.

Examples:

```css
--tp-btn-h-md:    var(--tp-control-h-md);  /* 36px */
--tp-btn-radius:  var(--tp-radius-md);     /* 10px */
--tp-input-px:    12px;
```

---

## Authoring Rules

1. **Color** — Always consume the Semantic layer (`--tp-bg-*` / `--tp-text-*` / `--tp-interactive-*`). Reference Primitive ramps only when a full ramp is required (e.g., gradients, chart series).
2. **Size / Radius** — Components consume Component-layer tokens (`--tp-btn-h-md`, `--tp-input-radius`, etc.); never write bare `px` values.
3. **Spacing** — Layout code consumes `--tp-space-*` or the Tailwind helpers `p-tp-N` / `gap-tp-N`.
4. **Fallback policy** — Direct Primitive ramp references (`--tp-primary-200`) are permitted only in data-visualization, chart, or gradient contexts.
5. **No literal color values** — Component code must never contain a hex literal like `#4f60ff`; always use a variable reference.

---

## Theme Switching

The token file handles theming at three selector levels, from lowest to highest priority:

```css
/* 1. Follow system preference (default) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) { … }
}

/* 2. Force dark mode (explicit) */
:root[data-theme='dark'],
.dark { … }

/* 3. Force light mode (override system dark) */
:root[data-theme='light'] { color-scheme: light; }
```

**How to switch:**

- Follow system → leave `data-theme` unset; the browser responds to `prefers-color-scheme`.
- Force light → `document.documentElement.dataset.theme = 'light'`
- Force dark → `document.documentElement.dataset.theme = 'dark'` or add `.dark` class to the root element.

Only Semantic-layer variable values change during a theme switch; Primitive and Component tokens stay constant across all themes.

---

## Tailwind Exposure

`packages/tokens/dist/tailwind.preset.cjs` maps CSS tokens to Tailwind utilities across four dimensions:

### Colors

| Token prefix | Tailwind utility example |
| --- | --- |
| `--tp-bg-app` | `bg-bg-app` |
| `--tp-bg-surface` | `bg-bg-surface` |
| `--tp-text-primary` | `text-text-primary` |
| `--tp-primary-500` | `bg-primary-500` / `text-primary-500` |
| `--tp-danger-500` | `bg-danger-500` / `text-danger-500` |
| `--tp-status-done-fg` | `text-status-done-fg` |
| `--tp-accent-violet` | `bg-accent-violet` |

### Spacing / Radius / Control heights

| Purpose | Tailwind utility |
| --- | --- |
| Spacing (4px – 80px) | `p-tp-1` / `gap-tp-4` / `m-tp-6` etc. |
| Border radius | `rounded-sm` / `rounded-md` / `rounded-lg` / `rounded-xl` / `rounded-pill` |
| Control heights | `h-control-sm` / `h-control-md` / `h-control-lg` |

### Shadows

| Token | Tailwind utility |
| --- | --- |
| `--tp-shadow-card` | `shadow-card` |
| `--tp-shadow-pop` | `shadow-pop` |
| `--tp-shadow-focus` | `shadow-focus` |

> `--tp-shadow-modal` is not exposed separately in the preset; consume it directly via the CSS variable.

### Motion

| Purpose | Tailwind utility |
| --- | --- |
| Easing function | `ease-tp` |
| Fast duration | `duration-fast` (150ms) |
| Mid duration | `duration-mid` (220ms) |

### Custom component classes

The preset injects three classes via `addComponents` / `addUtilities`:

| Class | Effect |
| --- | --- |
| `.tp-focus-ring` | Removes outline, applies `var(--tp-shadow-focus)` as focus ring |
| `.tp-nums` | Enables `font-variant-numeric: tabular-nums` for aligned digits |
| `.tp-tag` | Tag base style: inline-flex, height 22px, padding 0 8px, radius sm, 12px/500 |

Status color shorthand classes (`addUtilities`): `.tp-status-progress` / `.tp-status-pending` / `.tp-status-done` / `.tp-status-blocked` / `.tp-status-idle` / `.tp-status-info` — each sets both `background-color` and `color` together.

---

## Component-Level Tokens Summary

The following components register dedicated token namespaces in `:root`. These tokens **must only be consumed inside their respective component CSS** — never in layout or cross-component code.

| Namespace | Representative tokens |
| --- | --- |
| `--tp-btn-*` | Button heights × 3 sizes, padding, font size, radius, icon size |
| `--tp-input-*` | Input / Select / Combobox height, padding, border, background |
| `--tp-tag-*` | Tag height, font size, radius, dot size |
| `--tp-card-*` | Card / Panel background, border, radius, shadow, padding |
| `--tp-modal-*` | Modal radius, width, shadow, overlay |
| `--tp-drawer-*` | Drawer default width |
| `--tp-menu-*` | Menu / Dropdown / Popover background, border, shadow, item height |
| `--tp-tooltip-*` | Tooltip background, foreground, radius, padding, font size |
| `--tp-toast-*` | Toast radius, shadow, min/max width |
| `--tp-pagination-*` | Pagination item size, radius, gap, font size, icon size |
| `--tp-sidebar-*` | Sidebar width (expanded/collapsed), item height, radius |
| `--tp-progress-*` | Progress track height, radius, fill color |
| `--tp-slider-*` | Slider track height, thumb size, border width |
| `--tp-switch-*` | Switch total width/height, thumb size |
| `--tp-avatar-*` | Avatar four sizes (sm/md/lg/xl) |
| `--tp-badge-*` | Badge height, min-width, padding, font size, radius |
| `--tp-stepper-*` | Stepper dot size |
| `--tp-tab-*` | Tabs height, indicator thickness |

See each component's API table on its dedicated documentation page.
