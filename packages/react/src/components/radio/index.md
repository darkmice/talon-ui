---
title: Radio 单选框
nav: 组件
group: 表单录入
order: 13
---

# Radio 单选框

基于 Radix RadioGroup 构建的单选选项组。`RadioGroup` 和 `RadioGroupItem` 封装 `@radix-ui/react-radio-group`，推荐配合 `<label>` 使用。

## 垂直（默认）

<code src="./demos/basic.tsx"></code>

## 水平

<code src="./demos/horizontal.tsx"></code>

## 表单内使用

<code src="./demos/form.tsx"></code>

## API

### RadioGroup

<API id="RadioGroup"></API>

### RadioGroupItem

<API id="RadioGroupItem"></API>

## 禁忌

- 不要将 `RadioGroup` 与 `Checkbox` 语义混用 — 单选框是单选的。需要多选时请用多个 `Checkbox` 组合。
