---
title: DatePicker 日期选择
nav: 组件
group: 表单录入
order: 20
---

# DatePicker 日期选择

基于 react-day-picker 的日历弹出框，支持单日期或范围模式。`DatePicker` 将 `react-day-picker` 包裹在 Radix Popover 内，触发器样式与 `Input` 一致，日历面板在 `shadow-pop` 表面上展示。

## 基础（单日期）

<code src="./demos/basic.tsx"></code>

## 范围

<code src="./demos/range.tsx"></code>

## 表单内使用

<code src="./demos/form.tsx"></code>

## 组合结构

```
<DatePicker
  mode="single"
  value={date}
  onValueChange={setDate}
  placeholder="Pick a date"
  size="md"
/>
```

## API

<API id="DatePicker"></API>

## 禁忌

- 不要在同一字段中将 DatePicker 与独立 TimePicker 组合使用 — 请使用单一的组合选择器（计划中）。
- 不要省略 `placeholder` — 空白触发器视觉上容易引起歧义。
