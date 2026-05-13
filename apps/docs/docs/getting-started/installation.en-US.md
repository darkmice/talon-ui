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

Talon UI has two integration paths. Pick one first:

- Your app already uses Tailwind: use `@talon-ui/tokens/preset` + `@talon-ui/tokens/css`
- Your app does not use Tailwind, or you just want the fastest setup: import `@talon-ui/react/styles.css`

You do **not** need a provider, theme runtime, or CSS-in-JS setup.

## 1. Install dependencies

```bash
pnpm add @talon-ui/react @talon-ui/tokens
```

`@talon-ui/react` declares `react` and `react-dom` as peer dependencies and supports `^18 || ^19`.

If your project does not already have React installed:

```bash
pnpm add react react-dom
```

## 2. Tailwind project (recommended)

This is the right path for dashboards, admin apps, and AI workspaces that already use Tailwind.

### Step 1: add the preset

```ts | pure
// tailwind.config.ts
import preset from '@talon-ui/tokens/preset';

export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}', './node_modules/@talon-ui/react/dist/**/*.js'],
  darkMode: ['class', '[data-theme="dark"]'],
};
```

Do not forget `./node_modules/@talon-ui/react/dist/**/*.js` in `content`.  
If it is missing, components will render, but Tailwind will not emit the utility classes they rely on.

### Step 2: import tokens once at the app entry

```ts | pure
// e.g. src/main.tsx, src/index.tsx, app/layout.tsx, or app/globals.css
import '@talon-ui/tokens/css';
```

This gives you:

- light / dark CSS variables
- all design tokens used by the component library
- support for `data-theme="dark"` and `.dark`

### Step 3: render a first page

```tsx | pure
import '@talon-ui/tokens/css';
import { Button, Card, Tag } from '@talon-ui/react';

export default function App() {
  return (
    <Card padding="lg" className="max-w-md space-y-tp-4">
      <Tag tone="info">Talon UI</Tag>
      <h1 className="text-h2 text-text-primary">Setup complete</h1>
      <p className="text-body text-text-secondary">
        If the spacing, radius, and colours look correct, your tokens and Tailwind preset are wired up.
      </p>
      <Button variant="primary">Get started</Button>
    </Card>
  );
}
```

### Do not do this on the Tailwind path

- Do not also import `@talon-ui/react/styles.css`, or you will ship the precompiled utilities twice
- Do not omit the `node_modules/@talon-ui/react/dist` content glob
- Do not add a second dark-mode implementation just for Talon UI components

## 3. Non-Tailwind project

If your app does not use Tailwind, the fastest path is to import the precompiled stylesheet:

```ts | pure
import '@talon-ui/react/styles.css';
```

That single import already includes:

- `@talon-ui/tokens/css`
- the Tailwind utility output used by the components
- light / dark theme variables

So on this path, do **not** import `@talon-ui/tokens/css` again.

Minimal example:

```tsx | pure
import '@talon-ui/react/styles.css';
import { Button, Card, Tag } from '@talon-ui/react';

export default function App() {
  return (
    <Card padding="lg" style={{ maxWidth: 420 }}>
      <Tag tone="done">Ready</Tag>
      <p>Component styles are in place.</p>
      <Button variant="primary">Get started</Button>
    </Card>
  );
}
```

## 4. Quick validation checklist

- `Button` should render with the correct brand colour, height, and radius
- `Card` should have a surface background, border, and subtle shadow
- switching `<html data-theme="dark">` should flip the whole palette
- the console should not complain about missing `react` or `react-dom` peer deps

## 5. Where to go next

- Need to customise colours, surfaces, or radius: see [Theming](./theming)
- Need a real light / dark toggle: see [Dark Mode](./dark-mode)
