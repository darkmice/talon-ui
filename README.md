# Talon UI

React component library and design tokens for the Talon Pilot design system.

![commits](https://img.shields.io/badge/commits-96-blue)
![tag](https://img.shields.io/badge/tag-0.5.0--alpha-orange)
![license](https://img.shields.io/badge/license-MIT-green)

| Mirror | URL |
|---|---|
| GitHub | https://github.com/darkmice/talon-ui |
| x.xgit.pro | https://x.xgit.pro/dark/talon-ui |

## Packages

| Package | Version | Purpose |
|---|---|---|
| `@talon-ui/tokens` | 0.1.1 | Design tokens — CSS vars, JSON, Tailwind preset |
| `@talon-ui/react`  | 0.5.0 | React components — 45 / 45 Phase 1 shipped |
| `@talon-ui/vue`    | —     | Vue components — Phase 2 placeholder |

## Components — 45 / 45 Phase 1

All Ant-Design-parity targets met across four blocks:

- **Block 1 (0.2.0):** Button, Input, Textarea, Tag, Avatar (+ AvatarGroup), Card, Badge, Divider, Space, Typography (Title / Text / Paragraph / Link)
- **Block 2 (0.3.0):** Form (react-hook-form), Checkbox, Radio, Switch, Slider, NumberInput, Rate, Select, Combobox, DatePicker, TimePicker, Upload, ColorPicker
- **Block 3 (0.4.0):** Tabs, Tooltip, Popover, Popconfirm, Menu, Modal, Drawer, Banner, Toast, Pagination, Stepper, Breadcrumb
- **Block 4 (0.5.0):** Skeleton, Spin, Empty, Result, Statistic, Progress (linear + circular), Descriptions, Collapse, KanbanCard, BusinessRows (FileRefRow / RoleRow / RuntimeRow / RiskRow)

## Install

```bash
pnpm add @talon-ui/react @talon-ui/tokens
```

## Quick usage

### With Tailwind CSS

Add the Talon UI preset to your Tailwind config:

```js
// tailwind.config.js
const { talonPreset } = require('@talon-ui/tokens/tailwind.preset.cjs');

module.exports = {
  presets: [talonPreset],
  content: ['./src/**/*.{ts,tsx}'],
};
```

Then import the component stylesheet once at your app entry:

```ts
import '@talon-ui/react/styles.css';
```

### Without Tailwind (CSS variables only)

Import the token stylesheet directly — components will render with Talon design tokens but without Tailwind utility classes:

```ts
import '@talon-ui/tokens/tokens.css';
import '@talon-ui/react/styles.css';
```

### Example

```tsx
import { Button, Tag, Avatar } from '@talon-ui/react';

export default function App() {
  return (
    <div>
      <Avatar alt="Ada Lovelace" fallback="AL" />
      <Tag tone="done">Online</Tag>
      <Button variant="primary">Get started</Button>
    </div>
  );
}
```

## Development quickstart

```bash
pnpm install
pnpm dev          # watch mode, all packages in parallel
pnpm test         # run all tests
pnpm build        # production build, all packages
pnpm preflight    # publish audit — run before any release
```

## Source of truth

**Tokens** live only in `packages/tokens/src/`. `skills/talon-ui/assets/` are reverse-symlinks; do not edit them directly.

**Skills** live only in `skills/`. `.claude/`, `.codex/`, `.agents/` (and any future agent runtime) must reference them via `skills` symlink. CI enforces this.

## Spec / plans / changelog

- Design spec: `docs/superpowers/specs/2026-05-11-talon-ui-library-design.md`
- Foundation plan: `docs/superpowers/plans/2026-05-11-talon-ui-foundation.md`
- Aggregated changelog: `CHANGELOG.md`
- Per-package changelogs: `packages/react/CHANGELOG.md`, `packages/tokens/CHANGELOG.md`

## License

MIT. See `LICENSE`.

## TODO before first public publish

- [ ] Reserve the `@talon-ui` npm scope (if not already done).
- [ ] Add `NPM_TOKEN` secret to the GitHub repository so `release.yml` can publish.
- [ ] Decide whether to make the GitHub repo public.
