# @talon-ui/tokens

## 0.1.2

### Patch Changes

- [`fdc9174`](https://github.com/darkmice/talon-ui/commit/fdc91747dbf4a253fdff0d48c0c1579f26dbea6b) Thanks [@darkmice](https://github.com/darkmice)! - 深色模式适配:SegmentedControl 等组件由硬编码 `bg-white`/hex 改为语义 token + `dark:`
  变体;Tooltip 白块根治;表单 hex→token;遮罩与 accent 深色处理;tokens 深色值 /
  preset 补齐。修复手动 `data-theme=dark` 下组件不变深色的问题。

## 0.1.1

### Patch Changes

- Block 1 — foundational primitives: Button, Input, Textarea, Tag, Avatar (+ AvatarGroup), Card, Badge, Divider, Space, Typography (Title / Text / Paragraph / Link). 130 tests, anatomy locks per design.md, docs pages with live demos. Light + dark themes via interactive tokens. Talon brand red (#C8322B) for Danger.

  Internal twMerge config extended to recognise Talon's custom utility groups (control heights, status colours, type scale). `@radix-ui/react-slot` and `@radix-ui/react-avatar` added as runtime dependencies.

## 0.1.0

### Minor Changes

- f33bd69: Initial alpha bring-up: tokens package owns design-token source-of-truth (reverse-symlinked into skills/talon-ui/assets/), React package ships an empty barrel + `cn` helper, dual-track styling (Tailwind preset + precompiled CSS) infrastructure landed.
