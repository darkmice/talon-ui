# @talon-ui/react

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
