# @talon-ui/react

## 0.5.0

### Minor Changes

- Block 4 — data display & misc feedback: Skeleton, Spin, Empty, Result, Statistic, Progress (linear + circular), Descriptions, Collapse, KanbanCard, BusinessRows (FileRefRow / RoleRow / RuntimeRow / RiskRow). 550+ tests, anatomy locks per design.md, docs pages with live demos.

  This release closes Phase 1: 45 components shipped, Ant-Design-parity target met.

  New runtime deps: `@radix-ui/react-accordion` (Collapse). All other Block 4 components are DIY.

## 0.4.0

### Minor Changes

- Block 3 — navigation & feedback: Tabs, Tooltip, Popover, Popconfirm, Menu (Dropdown), Modal, Drawer, Banner (Alert), Toast (with ToastProvider + useToast imperative API), Pagination, Stepper, Breadcrumb. 400+ tests, anatomy locks per design.md, docs pages with live demos.

  New runtime deps: `@radix-ui/react-tabs`, `@radix-ui/react-tooltip`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-toast`. (`@radix-ui/react-popover` already in deps from Block 2.)

## 0.3.0

### Minor Changes

- Block 2 — forms & data entry: Form (FormItem/FormLabel/FormControl/FormDescription/FormMessage/FormField + useFormField), Checkbox, Radio (RadioGroup + Item), Switch, Slider, NumberInput, Rate, Select (composition primitives), Combobox (cmdk-backed), DatePicker (single + range), TimePicker (24h scrolling columns), Upload (drag-drop with progress hook), ColorPicker (compact preset + hex). 300+ tests, anatomy locks per design.md, docs pages with live demos and Form-integrated examples.

  New peer / runtime deps: `react-hook-form` (peer), `@radix-ui/react-checkbox`, `@radix-ui/react-radio-group`, `@radix-ui/react-switch`, `@radix-ui/react-slider`, `@radix-ui/react-select`, `@radix-ui/react-popover`, `cmdk`, `react-day-picker`, `date-fns`.

## 0.2.0

### Minor Changes

- Block 1 — foundational primitives: Button, Input, Textarea, Tag, Avatar (+ AvatarGroup), Card, Badge, Divider, Space, Typography (Title / Text / Paragraph / Link). 130 tests, anatomy locks per design.md, docs pages with live demos. Light + dark themes via interactive tokens. Talon brand red (#C8322B) for Danger.

  Internal twMerge config extended to recognise Talon's custom utility groups (control heights, status colours, type scale). `@radix-ui/react-slot` and `@radix-ui/react-avatar` added as runtime dependencies.

### Patch Changes

- Updated dependencies
  - @talon-ui/tokens@0.1.1

## 0.1.0

### Minor Changes

- f33bd69: Initial alpha bring-up: tokens package owns design-token source-of-truth (reverse-symlinked into skills/talon-ui/assets/), React package ships an empty barrel + `cn` helper, dual-track styling (Tailwind preset + precompiled CSS) infrastructure landed.

### Patch Changes

- Updated dependencies [f33bd69]
  - @talon-ui/tokens@0.1.0
