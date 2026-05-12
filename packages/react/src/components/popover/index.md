---
title: Popover 气泡卡片
nav: 组件
group: 反馈与导航
order: 34
---

# Popover 气泡卡片

锚定到触发元素的持久浮层。与 `Tooltip` 不同，`Popover` 需要显式点击才能打开，并保持展开直至用户主动关闭。

## 基础

<code src="./demos/basic.tsx"></code>

## 带显式关闭按钮

<code src="./demos/close-button.tsx"></code>

## 锚点定位

<code src="./demos/anchor.tsx"></code>

## 导出列表

`Popover`、`PopoverTrigger`、`PopoverAnchor`、`PopoverContent`（带 `width` prop 的浮动表面）、`PopoverClose`、`PopoverArrow`。

## API

### PopoverContent

<API id="PopoverContent"></API>

### PopoverClose

<API id="PopoverClose"></API>

### PopoverArrow

<API id="PopoverArrow"></API>

## 禁忌

- 不要在 `Popover` 中放长篇表单 — 请使用 `Modal` 或 `Drawer`。
- 不要嵌套两个 Popover；将内容合并为一个。
