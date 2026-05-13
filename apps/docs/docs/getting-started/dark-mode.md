---
title: 暗黑模式
group:
  title: 快速上手
  order: 0
---

# 暗黑模式

Talon UI 的暗黑模式已经内建在 token 里。  
你只要把开关放在根节点或业务容器上，组件会自己翻转，不需要逐个组件写 `dark:`。

## 1. 怎么触发

在 `<html>` 或任意祖先容器上设置以下之一即可：

| 触发器 | 效果 |
|---|---|
| `<html data-theme="dark">` | 强制暗色，覆盖系统设定 |
| `<html data-theme="light">` | 强制亮色，覆盖系统设定 |
| `<html class="dark">` | Tailwind 风格暗色开关。等价于 `data-theme="dark"`。 |
| 无任何属性 | 跟随 `prefers-color-scheme` |

推荐你在项目里**统一只用一种方式**。  
如果没有历史包袱，优先用 `data-theme`，语义更清楚，也更适合做“跟随系统 / 强制亮 / 强制暗”三态。

## 2. 最简单的三种用法

### 跟随系统

什么都不设置即可。  
默认情况下，token 会跟着 `prefers-color-scheme` 自动切换。

### 手动强制暗色

```html
<html data-theme="dark">
```

### 手动强制亮色

```html
<html data-theme="light">
```

## 3. 给用户做一个主题切换按钮

如果你的应用只需要“亮 / 暗”两态切换，最直接的做法就是改 `<html>` 上的 `data-theme`：

```ts | pure
const root = document.documentElement;
const current = root.getAttribute('data-theme');
const next = current === 'dark' ? 'light' : 'dark';

root.setAttribute('data-theme', next);
```

如果你还想记住用户选择，可以再配一个 `localStorage`：

```ts | pure
const root = document.documentElement;

export function applyTheme(theme: 'light' | 'dark') {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

export function restoreTheme() {
  const saved = localStorage.getItem('theme');

  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
  }
}
```

## 4. Tailwind 项目怎么和它配合

如果你在安装阶段已经用了这个配置：

```ts | pure
darkMode: ['class', '[data-theme="dark"]'],
```

那么你自己的 `dark:` utility 和 Talon UI 组件可以共用同一个开关。  
也就是说，你只设置：

```html
<html data-theme="dark">
```

就够了，不需要再同时维护第二套状态。

## 5. 也可以只让某一块区域进入暗色

因为 token 是普通 CSS 变量，所以不一定非要挂在 `<html>` 上。  
比如文档预览区、嵌入式面板、对比 Demo，都可以局部切暗：

```html
<section data-theme="dark">
  <!-- 这里面的 Talon UI 组件会按暗色渲染 -->
</section>
```

## 6. 常见坑

- 不要在同一个节点上同时写互相冲突的状态，比如 `data-theme="light"` 又配 `class="dark"`
- Tailwind 项目里如果你的 `dark:` 样式没反应，先检查 `darkMode` 配置是不是和文档一致
- 如果组件颜色没有切换，多半是主题属性没有挂到真正的祖先节点上

## 7. 接入完成后的自检

- `Card` 背景、边框、文字颜色在暗色下都应该整体翻转
- `Button` 的主按钮 hover / active 不应该仍然沿用亮色逻辑
- `Tooltip`、`Popover`、`Modal` 这类浮层也应该跟着一起切
