---
title: Rate 评分
nav: 组件
group: 表单录入
order: 17
---

# Rate 评分

支持可选半步的五星评分控件。`Rate` 渲染一排星星，点击确认，悬停预览。可选 `allowHalf` 开启半步评分。

## 基础

<code src="./demos/basic.tsx"></code>

## 半步

<code src="./demos/half.tsx"></code>

## 表单内使用

<code src="./demos/form.tsx"></code>

## API

<API id="Rate"></API>

## 禁忌

- 不要在没有文字说明的情况下展示评分 — 仅凭星形图标难以一眼识别数值。
- 关闭 `allowHalf` 时不要展示 3.7 这样的小数值。按实际展示四舍五入，或开启半步模式。
