---
title: 安装
nav:
  title: 快速上手
  order: 1
group:
  title: 快速上手
  order: 0
---

# 安装

```bash
pnpm add @talon-ui/react @talon-ui/tokens
```

`@talon-ui/react` 把 `react` 与 `react-dom` 声明为 peer 依赖（`^18 || ^19`），单独装一次即可。

## Tailwind 项目（推荐）

```ts
// tailwind.config.ts
import preset from '@talon-ui/tokens/preset';

export default {
  presets: [preset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@talon-ui/react/dist/**/*.js',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
};
```

在 app 入口引入一次 token：

```ts
import '@talon-ui/tokens/css';
```

## 非 Tailwind 项目

```ts
import '@talon-ui/react/styles.css';
```

一行 import 拿到 token（明暗自动）和组件用到的全部 utility。
