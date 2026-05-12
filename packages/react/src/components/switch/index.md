---
title: Switch 开关
nav: 组件
group: 表单录入
order: 14
---

# Switch 开关

轨道与滑块结构的二态开/关切换组件。`Switch` 是开/关切换控件，封装 `@radix-ui/react-switch` 以提供无障碍访问和键盘支持。

## 基础

<code src="./demos/basic.tsx"></code>

## 尺寸与状态

<code src="./demos/sizes.tsx"></code>

## 表单内使用

<code src="./demos/form.tsx"></code>

## API

<API id="Switch"></API>

## 禁忌

- 不要用 `Switch` 在多个选项中做选择 — 请用 `RadioGroup`。
- 不要在没有明确确认的情况下配合破坏性标签使用。开关暗示即时生效。
