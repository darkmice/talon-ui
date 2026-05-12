---
title: Select 选择器
nav: 组件
group: 表单录入
order: 18
---

# Select 选择器

基于 Radix Select 构建的下拉选择器，提供组合式 API。使用 `SelectTrigger` + `SelectValue` 展示闭合状态，使用 `SelectContent` + `SelectItem` 展示下拉面板。

## 基础

<code src="./demos/basic.tsx"></code>

## 分组及危险操作

<code src="./demos/grouped.tsx"></code>

## 表单内使用

<code src="./demos/form.tsx"></code>

## 组合结构

```
<Select>
  <SelectTrigger size="md">
    <SelectValue placeholder="..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Section</SelectLabel>
      <SelectItem value="x">Label</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectItem value="d" tone="danger">Destructive</SelectItem>
  </SelectContent>
</Select>
```

## API

### Select

<API id="Select"></API>

### SelectTrigger

<API id="SelectTrigger"></API>

### SelectContent

<API id="SelectContent"></API>

### SelectItem

<API id="SelectItem"></API>

## 禁忌

- 超过约 20 个选项时不要使用内联 Select — 请改用 `Combobox` 以支持搜索。
- 不要用 `<label>` 包裹 Select — 触发器已通过 `SelectValue` 提供无障碍名称。
