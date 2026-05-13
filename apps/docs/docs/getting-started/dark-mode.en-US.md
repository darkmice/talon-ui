---
title: Dark Mode
group:
  title: Getting Started
  order: 0
---

# Dark Mode

Dark mode is already built into the token layer.  
Put the switch on the root node or any feature container, and the components will flip automatically.

## 1. Available triggers

Set one of the following on `<html>` or any ancestor element:

| Trigger | Behaviour |
|---|---|
| `<html data-theme="dark">` | Force dark, override system. |
| `<html data-theme="light">` | Force light, override system. |
| `<html class="dark">` | Tailwind-style dark toggle. Equivalent to `data-theme="dark"`. |
| `(no attribute)` | Follow `prefers-color-scheme`. |

For new work, prefer `data-theme`. It maps more cleanly to three states: follow system, force light, force dark.

## 2. The three most common setups

### Follow system

Do nothing.  
By default, the tokens respond to `prefers-color-scheme`.

### Force dark

```html
<html data-theme="dark">
```

### Force light

```html
<html data-theme="light">
```

## 3. Add a user-facing theme toggle

If your product only needs a light / dark toggle, updating `data-theme` on `<html>` is enough:

```ts | pure
const root = document.documentElement;
const current = root.getAttribute('data-theme');
const next = current === 'dark' ? 'light' : 'dark';

root.setAttribute('data-theme', next);
```

If you want the choice to persist:

```ts | pure
const root = document.documentElement;

export function applyTheme(theme: 'light' | 'dark') {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

export function restoreTheme() {
  const saved = localStorage.getItem('theme');

  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
  }
}
```

## 4. How this works with Tailwind

If you followed the installation guide and set:

```ts | pure
darkMode: ['class', '[data-theme="dark"]'],
```

then your own `dark:` utilities and Talon UI components can share the same switch.  
Setting only:

```html
<html data-theme="dark">
```

is enough.

## 5. You can also darken a single area

Because this is all CSS-variable based, the switch does not have to live on `<html>`:

```html
<section data-theme="dark">
  <!-- Talon UI components inside render in dark mode -->
</section>
```

This is useful for previews, embedded workspaces, or side-by-side comparisons.

## 6. Common mistakes

- Do not create conflicting state on the same node, such as `data-theme="light"` plus `class="dark"`
- If your own `dark:` utilities do not respond, check the `darkMode` config first
- If Talon UI components do not flip, make sure the theme attribute is on a real ancestor, not on a sibling

## 7. Quick validation

- `Card` background, border, and text colours should all flip together
- primary button hover / active states should use dark-mode values, not light-mode ones
- overlays such as `Tooltip`, `Popover`, and `Modal` should switch with the same trigger
