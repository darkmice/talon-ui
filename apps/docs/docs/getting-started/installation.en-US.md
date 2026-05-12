---
title: Installation
nav:
  title: Getting Started
  order: 1
group:
  title: Getting Started
  order: 0
---

# Installation

```bash
pnpm add @talon-ui/react @talon-ui/tokens
```

`@talon-ui/react` declares `react` and `react-dom` as peer dependencies (`^18 || ^19`).

## Tailwind project (recommended)

```ts
// tailwind.config.ts
import preset from '@talon-ui/tokens/preset';

export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}', './node_modules/@talon-ui/react/dist/**/*.js'],
  darkMode: ['class', '[data-theme="dark"]'],
};
```

Then in your app entry:

```ts
import '@talon-ui/tokens/css';
```

## Non-Tailwind project

```ts
import '@talon-ui/react/styles.css';
```

A single import gives you tokens (light + dark) plus every Tailwind utility the components use.
