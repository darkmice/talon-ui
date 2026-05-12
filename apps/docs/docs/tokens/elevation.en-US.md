---
title: Elevation Tokens
nav:
  title: Tokens
  order: 2
order: 5
---

# Elevation Tokens

The elevation system covers three dimensions: **shadows** (visual depth), **focus ring** (keyboard accessibility), and **z-index layers** (stacking order).

---

## Shadows

Four shadow steps correspond to different UI layers. Both light and dark themes have explicit values.

### `--tp-shadow-card`

Used for cards, panels, and table rows — a subtle lift from the page surface.

| Theme | Value |
| --- | --- |
| Light | `0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 0 rgba(15, 23, 42, 0.02)` |
| Dark | `0 1px 0 rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.32)` |

Tailwind: `shadow-card`

### `--tp-shadow-pop`

Used for dropdowns, popovers, tooltips, and toasts — layers that float above the page plane.

| Theme | Value |
| --- | --- |
| Light | `0 12px 32px -12px rgba(15, 23, 42, 0.18)` |
| Dark | `0 16px 40px -12px rgba(0, 0, 0, 0.6)` |

Tailwind: `shadow-pop`

### `--tp-shadow-modal`

Used for modals and drawers — the highest layer, requiring strong visual separation.

| Theme | Value |
| --- | --- |
| Light | `0 24px 64px -16px rgba(15, 23, 42, 0.28)` |
| Dark | `0 32px 80px -16px rgba(0, 0, 0, 0.7)` |

> `--tp-shadow-modal` is not exposed separately in the Tailwind preset; consume it directly via `var(--tp-shadow-modal)`.

### `--tp-shadow-focus`

Used exclusively for keyboard focus rings — not intended as a decorative shadow.

| Theme | Value |
| --- | --- |
| Light | `0 0 0 3px rgba(79, 96, 255, 0.18)` |
| Dark | `0 0 0 3px rgba(129, 140, 248, 0.32)` |

Tailwind: `shadow-focus`

---

## Focus Ring

`.tp-focus-ring` is the single implementation of keyboard accessibility, injected by the preset via `addComponents`:

```css
.tp-focus-ring {
  outline: none;
  box-shadow: var(--tp-shadow-focus);
}
```

**Usage rules:**

- Always trigger via the `focus-visible:` variant, not `focus:` (avoids the ring appearing on mouse click):
  ```html
  <button class="focus-visible:tp-focus-ring">...</button>
  ```
- Focus ring color switches automatically with the theme (light: brand blue `rgba(79,96,255,0.18)`, dark: `rgba(129,140,248,0.32)`).
- Every interactive control (buttons, inputs, links, options) must wire up the focus ring. Never use bare `outline: none` without providing an alternative.

---

## Z-index Layers

All component `z-index` values must come from this system — magic numbers like `9999` are not permitted.

| Token | Value | Tailwind | Usage |
| --- | --- | --- | --- |
| `--tp-z-dropdown` | `1000` | `z-dropdown` | Dropdown menus, Combobox panels |
| `--tp-z-sticky` | `1020` | `z-sticky` | Fixed headers, sticky sidebars |
| `--tp-z-overlay` | `1040` | `z-overlay` | Modal backdrop |
| `--tp-z-modal` | `1050` | `z-modal` | Modal and drawer bodies |
| `--tp-z-toast` | `1080` | `z-toast` | Toast notifications (must sit above everything) |

**Rationale:**

1. Dropdown (1000) is above normal content but below any overlay.
2. Sticky (1020) is slightly above dropdown to ensure fixed headers are not obscured.
3. Overlay (1040) is the modal backdrop, covering all normal content and dropdowns.
4. Modal (1050) sits on top of the backdrop so dialog content is reachable.
5. Toast (1080) is always the topmost layer so notifications are never blocked by any floating panel.

> Popovers typically share the Dropdown layer (1000). If a popover is triggered from within a Modal, mount it via a Portal on `document.body` to avoid z-index conflicts.
