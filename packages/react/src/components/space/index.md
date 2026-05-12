---
title: Space 间距
nav: 组件
group: 基础组件
order: 9
---

# Space 间距

为子元素提供统一间距的 flex 容器。在间距属于文档化表面的情况下，使用 `Space` 代替临时的 `flex` + `gap-*` 工具类。

## 水平

<code src="./demos/horizontal.tsx"></code>

## 垂直

<code src="./demos/vertical.tsx"></code>

## 自动换行

<code src="./demos/responsive.tsx"></code>

## 尺寸

| Token | 像素 |
|---|---|
| `xs` | 4 |
| `sm` | 8 |
| `md`（默认） | 12 |
| `lg` | 16 |
| `xl` | 20 |

## API

<API id="Space"></API>

## 禁忌

- 不要将 `Space` 用于网格布局 — 二维结构请直接使用 CSS grid。
- 不要通过内联 `style={{ gap: ... }}` 传入任意间距 — 请通过 `size` prop 保持 Token 化。
