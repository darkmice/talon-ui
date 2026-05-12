---
title: Statistic 统计数值
nav: 组件
group: 数据展示
order: 40
---

# Statistic 统计数值

带可选趋势增量的单指标或指标网格。`Statistic` 展示一个带标签的数字，将多个组合在 CSS 网格中可构建指标条。

## 基础

<code src="./demos/basic.tsx"></code>

## 带趋势增量

<code src="./demos/with-trend.tsx"></code>

## 网格布局

<code src="./demos/grid.tsx"></code>

## API

<API id="Statistic"></API>

## 禁忌

- 不要在 `Statistic` 内添加图标或边框 — 设计系统通过纯排版保持节奏。
- 绝对值不明确时不要只展示相对增量；同时展示两者。
