---
title: Theming
group:
  title: Getting Started
  order: 0
---

# Theming

Talon UI theming is a CSS-variable contract, not a runtime theme API.  
In practice that means: **you do not need a ThemeProvider to restyle the library.**

## 1. Understand the three token layers first

Tokens live in CSS variables under three layers:

| Layer | Example | Purpose |
|---|---|---|
| Primitive | `--tp-gray-500`, `--tp-primary-500` | Raw scales. Theme-stable. |
| Semantic | `--tp-bg-app`, `--tp-text-primary` | Usage-named. Flips on dark mode. |
| Component | `--tp-btn-h-md`, `--tp-input-radius` | Per-component locked-down values. |

Recommended override order:

- start with `Semantic` when you want the app to feel different
- move to `Primitive` when you want to replace the core brand scale
- touch `Component` only when you truly want to change a component-level size or radius

`@talon-ui/react` components mostly consume `Semantic` and `Component` tokens, which is why dark mode can flip automatically.

## 2. The most common change: replace the brand colour

If you want to keep the system structure but swap the core accent, overriding the primary ramp is usually enough:

```css
:root {
  --tp-primary-500: #2563eb;
  --tp-primary-600: #1d4ed8;
  --tp-primary-700: #1e40af;
  --tp-shadow-focus: 0 0 0 3px rgba(37, 99, 235, 0.2);
}
```

Buttons, selected states, links, and focus rings will all follow.

## 3. To change the overall feel, start from semantic tokens

If your goal is “make the app calmer”, “make it denser”, or “make it feel more like our admin product”, do not start at the component layer. Start here:

```css
:root {
  --tp-bg-app: #f5f7fb;
  --tp-bg-surface: #ffffff;
  --tp-bg-subtle: #eef2f8;
  --tp-border-default: #d8e0ea;
  --tp-text-primary: #0f172a;
  --tp-text-secondary: #516074;
}
```

This changes the behaviour of cards, form controls, overlays, borders, and text together, so the result stays coherent.

## 4. You can scope overrides to a single product area

Because these are ordinary CSS variables, you can override them on a container instead of globally:

```css
.ops-shell {
  --tp-primary-500: #0f766e;
  --tp-primary-600: #0d5f59;
  --tp-bg-surface: #f7fffd;
  --tp-border-default: #cde9e4;
}
```

Every Talon UI component inside `.ops-shell` will inherit that palette, while the rest of the app stays untouched.

## 5. Only then consider component-level overrides

Component tokens are best when you intentionally want to change specific mechanics, such as:

- making medium controls taller
- shrinking or expanding radius across inputs
- creating a deliberately denser or roomier version of the same UI kit

Example:

```css
:root {
  --tp-control-h-md: 40px;
  --tp-input-radius: 12px;
}
```

These changes are more explicit and more likely to ripple across multiple components, so use them deliberately.

## 6. Practical guidance

- For app-wide visual tone, start with `Semantic`
- For brand replacement, override the `Primitive` primary ramp
- For one specific module, prefer container-scoped overrides over editing global `:root`
- Avoid jumping straight into many `Component` overrides unless you already know the desired density and sizing system

## 7. Continue reading

- Need to wire light / dark switching: see [Dark Mode](./dark-mode)
- Need the full token inventory: see [/en-US/tokens/overview](/en-US/tokens/overview)
