---
title: Combobox 自动完成
nav: 组件
group: 表单录入
order: 19
---

# Combobox 自动完成

基于 cmdk 和 Radix Popover 构建的可搜索下拉框。`Combobox` 是带过滤输入的 `Select`，由 `cmdk`（过滤 + 键盘导航）和 Radix Popover（Portal + 焦点管理）驱动。

## 基础

<code src="./demos/basic.tsx"></code>

## 分组

<code src="./demos/grouped.tsx"></code>

## 表单内使用

<code src="./demos/form.tsx"></code>

## 组合结构

```
<Combobox value={v} onValueChange={setV}>
  <ComboboxTrigger size="md">
    <ComboboxValue placeholder="..." />
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxInput placeholder="..." />
    <ComboboxList>
      <ComboboxEmpty>Empty state</ComboboxEmpty>
      <ComboboxGroup heading="Section">
        <ComboboxItem value="x">Item</ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

## API

### Combobox

<API id="Combobox"></API>

### ComboboxTrigger

<API id="ComboboxTrigger"></API>

### ComboboxContent

<API id="ComboboxContent"></API>

### ComboboxItem

<API id="ComboboxItem"></API>

## 禁忌

- 少于约 10 个选项时不要使用 `Combobox` — 直接用 `Select` 更高效。
- 不要在 `ComboboxItem` 内渲染图片内容，除非同时传入字符串类型的 `value` 供 cmdk 过滤。
