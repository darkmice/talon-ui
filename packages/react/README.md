# @talon-ui/react

React components for the Talon Pilot design system.

## Install

```bash
pnpm add @talon-ui/react @talon-ui/tokens
```

## Use (Tailwind project)

```ts
// tailwind.config.ts
import preset from '@talon-ui/tokens/preset';
export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}', './node_modules/@talon-ui/react/dist/**/*.js'],
};
```

Then `import '@talon-ui/tokens/css'` once in your app entry.

## Use (non-Tailwind project)

```ts
import '@talon-ui/react/styles.css';
```

Toggle dark mode by setting `<html data-theme="dark">` or `<html class="dark">`.
