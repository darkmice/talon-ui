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

Talon UI 的接入路径只有两条，先选一条再往下做：

- 你的项目已经在用 Tailwind：走 `@talon-ui/tokens/preset` + `@talon-ui/tokens/css`
- 你的项目没有 Tailwind，或者你只是想先把组件跑起来：直接引入 `@talon-ui/react/styles.css`

你**不需要**额外的 `Provider`、主题上下文或 CSS-in-JS 运行时。

## 1. 安装依赖

```bash
pnpm add @talon-ui/react @talon-ui/tokens
```

`@talon-ui/react` 把 `react` 与 `react-dom` 声明为 peer 依赖，支持 `^18 || ^19`。

如果你的项目还没装 React，再补一次：

```bash
pnpm add react react-dom
```

## 2. Tailwind 项目（推荐）

适合已经在用 Tailwind 的后台、运营台、AI 工作台项目。  
这条路径的好处是：你自己写的页面和 Talon UI 组件会共用同一套 token、间距、圆角和主题开关。

### 第一步：接入 preset

```ts | pure
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

`content` 里那一行 `./node_modules/@talon-ui/react/dist/**/*.js` 不要漏。  
如果漏掉，组件能渲染出来，但类名不会被 Tailwind 编进最终 CSS，页面会像“没样式”。

### 第二步：在应用入口引入 token

在应用入口引入一次 `@talon-ui/tokens/css`：

```ts | pure
// 例如 src/main.tsx、src/index.tsx、app/layout.tsx、app/globals.css
import '@talon-ui/tokens/css';
```

这一步会给你的应用注入：

- 亮色 / 暗色 CSS 变量
- 所有组件依赖的设计 token
- `data-theme="dark"` 和 `.dark` 的主题切换能力

### 第三步：先渲染一个最小页面

```tsx | pure
import '@talon-ui/tokens/css';
import { Button, Card, Tag } from '@talon-ui/react';

export default function App() {
  return (
    <Card padding="lg" className="max-w-md space-y-tp-4">
      <Tag tone="info">Talon UI</Tag>
      <h1 className="text-h2 text-text-primary">快速接入成功</h1>
      <p className="text-body text-text-secondary">
        如果你能看到正确的颜色、圆角和间距，说明 token 与 Tailwind preset 都已经生效了。
      </p>
      <Button variant="primary">开始使用</Button>
    </Card>
  );
}
```

### 这条路径下不要做的事

- 不要再额外 `import '@talon-ui/react/styles.css'`，否则会把预编译 utility 再带进来一次
- 不要忘记把 `node_modules/@talon-ui/react/dist` 加进 `content`
- 不要为了组件能切暗色，再额外写一套重复的 `dark:` 样式

## 3. 非 Tailwind 项目

如果你的项目没有 Tailwind，最省事的方式是直接引入整份预编译样式：

```ts | pure
import '@talon-ui/react/styles.css';
```

这一行已经包含：

- `@talon-ui/tokens/css`
- 组件依赖的 Tailwind utility 输出
- 亮 / 暗主题切换所需的变量

也就是说，这条路径下**不需要**再单独引入 `@talon-ui/tokens/css`。

最小示例：

```tsx | pure
import '@talon-ui/react/styles.css';
import { Button, Card, Tag } from '@talon-ui/react';

export default function App() {
  return (
    <Card padding="lg" style={{ maxWidth: 420 }}>
      <Tag tone="done">Ready</Tag>
      <p>组件样式已经就位。</p>
      <Button variant="primary">开始使用</Button>
    </Card>
  );
}
```

## 4. 接入后先做这 4 个检查

- `Button` 的主按钮应该是蓝紫色，且有正确的圆角和高度
- `Card` 应该有边框、背景和轻微阴影，而不是裸 `div`
- 把 `<html data-theme="dark">` 打开后，颜色应该整体翻到暗色
- 控制台里不应该再提示缺少 `react` / `react-dom` peer 依赖

## 5. 下一步看哪里

- 想改品牌色、背景和圆角：继续看 [主题](./theming)
- 想接用户切换亮 / 暗：继续看 [暗黑模式](./dark-mode)
