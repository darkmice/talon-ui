---
title: NumberInput 数字输入
nav: 组件
group: 表单录入
order: 16
---

# NumberInput 数字输入

带步进按钮、单位后缀和长按连续步进功能的数字输入框。`NumberInput` 是 36px 高度的输入框，使用 `tp-nums` 数字字体，右侧带上/下箭头按钮，长按可连续步进。

## 基础

<code src="./demos/basic.tsx"></code>

## 单位后缀

<code src="./demos/unit.tsx"></code>

## 表单内使用

<code src="./demos/form.tsx"></code>

## API

<API id="NumberInput"></API>

除 `size` 外，所有 `<input>` 属性均可透传。

## 禁忌

- 不要将 `NumberInput` 与 `<Slider>` 同时用于同一值 — 选择一种输入方式。
- 有逻辑边界的字段不要省略 `min` / `max` — 无界数字输入容易产生非法数据。
