---
hero:
  title: Talon UI
  description: Clean · disciplined · engineering-grade React UI for AI-native control planes.
  actions:
    - text: Get started
      link: /getting-started/installation
    - text: Components
      link: /components/button
features:
  - title: Block 1 · Foundational primitives
    description: 10 components — Button, Input, Textarea, Tag, Avatar (+ Group), Card, Badge, Divider, Space, Typography. Every anatomy locked to spec.
  - title: Block 2 · Forms & data entry
    description: 13 components — Form (react-hook-form), Checkbox, Radio, Switch, Slider, NumberInput, Rate, Select, Combobox, DatePicker, TimePicker, Upload, ColorPicker.
  - title: Block 3 · Navigation & feedback
    description: 12 components — Tabs, Tooltip, Popover, Popconfirm, Menu, Modal, Drawer, Banner, Toast, Pagination, Stepper, Breadcrumb.
  - title: Block 4 · Data display
    description: 10 components — Skeleton, Spin, Empty, Result, Statistic, Progress (linear + circular), Descriptions, Collapse, KanbanCard, BusinessRows.
---

## Phase 1 complete · 45 / 45 components

Talon UI is a React component library that operationalises the Talon Pilot design system: clean, disciplined, engineering-grade UI for AI-native control planes.

Install with:

```bash
pnpm add @talon-ui/react @talon-ui/tokens
```

Browse the [component catalogue](/components/button) or read the [tokens overview](/tokens/overview) to understand the three-layer token model.

## Design language

Tokens follow a three-layer model: primitive → semantic → component. Components consume only the semantic layer, so light / dark / future white-label themes flip via CSS variables — no `dark:` Tailwind variants anywhere in component source.

## Status

- **45 / 45** Phase 1 components shipped
- **550+** unit, anatomy, and a11y tests
- **MIT** licensed — tag `block-4-v0.5.0-alpha`
