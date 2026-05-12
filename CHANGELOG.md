# Talon UI · Release log

This is the aggregated changelog. Per-package detail lives at:

- `packages/react/CHANGELOG.md`
- `packages/tokens/CHANGELOG.md`

## 2026-05-12 · scaffold — Visual regression
- Visual regression scaffold added (Playwright + per-page screenshots, 0.1% pixel diff threshold). Run `pnpm test:visual` locally; `pnpm test:visual:update` regenerates baselines.

## 2026-05-12 · 0.5.0-alpha — Block 4 + Phase 1 complete
- @talon-ui/react@0.5.0 — Data display & misc feedback: Skeleton, Spin, Empty, Result, Statistic, Progress (linear + circular), Descriptions, Collapse, KanbanCard, BusinessRows (FileRefRow / RoleRow / RuntimeRow / RiskRow).
- **Milestone:** 45/45 components shipped. Ant-Design-parity target met.

## 2026-05-12 · 0.4.0-alpha — Block 3
- @talon-ui/react@0.4.0 — Navigation & feedback: Tabs, Tooltip, Popover, Popconfirm, Menu, Modal, Drawer, Banner, Toast, Pagination, Stepper, Breadcrumb.

## 2026-05-12 · 0.3.0-alpha — Block 2
- @talon-ui/react@0.3.0 — Forms & data entry: Form (over react-hook-form), Checkbox, Radio, Switch, Slider, NumberInput, Rate, Select, Combobox, DatePicker, TimePicker, Upload, ColorPicker.

## 2026-05-12 · 0.2.0-alpha — Block 1
- @talon-ui/react@0.2.0 — Foundational primitives: Button, Input, Textarea, Tag, Avatar (+ AvatarGroup), Card, Badge, Divider, Space, Typography (Title / Text / Paragraph / Link).

## 2026-05-11 · 0.1.0-alpha — Foundation
- @talon-ui/tokens@0.1.0 / @talon-ui/react@0.1.0 — monorepo scaffold, design-token single source of truth, build pipeline, CI / release workflows, Vite smoke example, `cn` primitive.
