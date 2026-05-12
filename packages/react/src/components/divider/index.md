---
title: Divider 分割线
nav: 组件
group: 基础组件
order: 8
---

# Divider 分割线

1px 分隔线，支持水平、垂直方向和可选中间标签。水平方向渲染 `<hr>`；垂直方向渲染内联 `<span>`，可直接放入 flex 子元素之间。

## 水平

<code src="./demos/horizontal.tsx"></code>

## 垂直

<code src="./demos/vertical.tsx"></code>

通过 className 设置高度（默认 `className="h-4"`，可改为 `h-5`、`h-6` 等）。

## 带标签

<code src="./demos/labelled.tsx"></code>

## API

<API id="Divider"></API>

始终设置 `role="separator"` 和对应的 `aria-orientation`。

## 禁忌

- 不要连续使用三条或更多水平分割线 — 应增加空白间距代替。
- 不要在流式文本段落中放置垂直分割线；仅在 flex / inline-flex 工具栏中使用。
