---
title: Banner 横幅提示
nav: 组件
group: 反馈与导航
order: 31
---

# Banner 横幅提示

带色调、可选操作和可选关闭的行内状态提示框。`Banner` 是行内状态提示框 — 嵌入页面流中，而非像 `Toast` 那样悬浮展示。用于页面级状态信息。

## 基础

<code src="./demos/basic.tsx"></code>

## 色调

<code src="./demos/tones.tsx"></code>

## 带操作和关闭

<code src="./demos/action.tsx"></code>

## API

<API id="Banner"></API>

## 禁忌

- 不要将 `Banner` 用于瞬时确认（请用 `Toast`）。
- 不要堆叠超过 2 个 Banner — 将它们合并为单个复合提示，或转换为通知列表。
