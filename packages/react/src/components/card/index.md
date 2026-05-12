---
title: Card 卡片
nav: 组件
group: 基础组件
order: 6
---

# Card 卡片

带内边距、可悬停和可交互变体的表面容器。`Card` 是标准表面容器：白色背景、1px 边框、14px 圆角、柔和阴影。

## 基础

<code src="./demos/basic.tsx"></code>

## 内边距

<code src="./demos/padding.tsx"></code>

| 内边距 | 间距 Token |
|---|---|
| `sm` | 12 |
| `md`（默认） | 20 |
| `lg` | 24 |
| `none` | 0（全出血子元素时使用） |

## 可交互

<code src="./demos/interactive.tsx"></code>

- `hoverable` 在悬停时将边框改为 indigo-200 并提升阴影。
- `interactive` 添加 `role="button"`，使卡片可键盘聚焦，并在 `:focus-visible` 时显示焦点环。

## API

<API id="Card"></API>

所有原生 `<div>` 属性均可使用；`interactive` 时 `role` 自动为 `button`（可显式覆盖）。

## 禁忌

- 不要在没有父级网格的情况下堆叠可悬停卡片 — 过多可交互卡片并排会产生视觉噪音。
- 不要将 `interactive` 与无明显视觉提示结合使用 — 用户需要知道卡片可点击。
