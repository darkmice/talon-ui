---
title: Input 输入框
nav: 组件
group: 基础组件
order: 2
---

# Input 输入框

带前缀/后缀插槽和色调变体的单行文本输入框。`Input` 将裸 `<input>` 包裹在 `<label>` 内，由外层容器管理焦点边界及图标/单位的插槽。

## 基础

<code src="./demos/basic.tsx"></code>

## 前缀与后缀

<code src="./demos/prefix-suffix.tsx"></code>

## API

<API id="Input"></API>

所有原生 `<input>` 属性均可使用（`size` 除外，它被视觉 `size` 变体遮蔽）。

## 禁忌

- 不要将 `<Input>` 嵌套在另一个 `<Input>` 内 — label 包裹层假设内部只有一个输入元素。
- 不要覆盖焦点环；包裹层已提供。
