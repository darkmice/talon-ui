---
title: Motion Tokens
nav:
  title: Tokens
  order: 2
order: 6
---

# Motion Tokens

---

## Easing

| Token | Value | Tailwind |
| --- | --- | --- |
| `--tp-ease` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | `ease-tp` |

**Curve rationale:** Fast acceleration (0.2 start control point) combined with strong deceleration (0.8 end control point) produces a "confident landing" feel — elements leave their origin quickly and settle naturally. This matches the system's "engineering / trustworthy" character, avoiding over-springy physics or mechanical linear easing.

---

## Durations

| Token | Value | Tailwind | When to use |
| --- | --- | --- | --- |
| `--tp-duration-fast` | `150ms` | `duration-fast` | Button / input hover and active, color state transitions |
| `--tp-duration-mid` | `220ms` | `duration-mid` | Modal, drawer, sidebar enter/exit |
| `--tp-duration-slow` | `320ms` | — | Page-level transitions (route changes, skeleton dissolve) |

> `--tp-duration-slow` (320ms) is not exposed as `duration-slow` in the Tailwind preset (only `fast` and `mid` are registered). Consume it directly via the CSS variable.

---

## Conventions

### Buttons and interactive controls

All buttons and interactive controls use the fast duration with Talon easing:

```html
<button class="transition duration-fast ease-tp ...">...</button>
```

Typical transition properties: `background-color`, `border-color`, `color`, `box-shadow`, `opacity`.

### Modals and drawers

Enter and exit animations use the mid duration (220ms) with `ease-tp`:

- **Enter:** transition from `opacity-0 translate-y-2` (or `translate-x-full` for drawers) to `opacity-100 translate-y-0`.
- **Exit:** the reverse; same duration as enter.

```css
/* Example: drawer enter */
transition: transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
            opacity   220ms cubic-bezier(0.2, 0.8, 0.2, 1);
```

### Toast notifications

- **Enter:** 150ms `ease-tp` slide in from the right (`translateX(100%)` → `translateX(0)`).
- **Auto-dismiss:**
  - Regular Toast: closes after `4000ms`.
  - Error Toast: closes after `8000ms`.
- **Exit:** 150ms fade out + shift up 4px.
- Maximum 3 toasts visible simultaneously; additional messages queue.

### Skeleton / loading states

Skeleton uses a `1400ms` breathing animation (`opacity: 0.5 ↔ 1`) — this duration is not drawn from motion tokens, because its purpose is to simulate "ongoing loading" rather than a transient state transition.

### Reduced motion

All animations must respect the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
