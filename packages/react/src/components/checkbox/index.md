---
title: Checkbox 复选框
nav: 组件
group: 表单录入
order: 12
---

# Checkbox 复选框

封装 Radix Checkbox 的二态或三态选择器。`Checkbox` 是带勾选标记（或不确定状态时为减号）的小方框，封装 `@radix-ui/react-checkbox` 以提供无障碍访问。

## 基础

<code src="./demos/basic.tsx"></code>

## 所有状态

<code src="./demos/states.tsx"></code>

## 表单内使用

<code src="./demos/form.tsx"></code>

## API

<API id="Checkbox"></API>

## 禁忌

- 不要用两个可点击的包裹层包住 `<Checkbox>` — 一个 `<label>` 已经足够。
- 不要将不确定状态作为永久状态使用，它表示"部分选中"，应最终确定。
