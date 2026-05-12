---
title: Descriptions 信息表
nav: 组件
group: 数据展示
order: 42
---

# Descriptions 信息表

用于实体详情的键值面板 — 水平或垂直布局，支持等宽 ID 字体。`Descriptions` 渲染键值列表，适用于详情面板（资源元数据、运行摘要）。

## 基础

<code src="./demos/basic.tsx"></code>

## 两列

<code src="./demos/columns.tsx"></code>

## 垂直布局

<code src="./demos/inline.tsx"></code>

## API

### Descriptions

<API id="Descriptions"></API>

### DescriptionsItem

<API id="DescriptionsItem"></API>

## 禁忌

- 不要用 Descriptions 替代 `<table>` 展示表格数据 — 请使用真正的 Table 组件。
- 不要嵌套 Descriptions；改为扁平化数据。
