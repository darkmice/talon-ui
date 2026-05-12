---
title: Popconfirm 气泡确认
nav: 组件
group: 反馈与导航
order: 33
---

# Popconfirm 气泡确认

用于有影响力操作的行内确认/取消气泡弹出框。`Popconfirm` 是带确认 + 取消按钮的小型聚焦弹出框。用于需要单次明确确认但不需要完整模态框的行内操作。

## 基础

<code src="./demos/basic.tsx"></code>

## 危险色调

<code src="./demos/danger.tsx"></code>

## 异步确认

<code src="./demos/async.tsx"></code>

## API

<API id="Popconfirm"></API>

## 禁忌

- 当即时撤销 Toast 更合适时（如带 5 秒撤销窗口的归档操作），不要使用 Popconfirm。
- 不要在同一流程中堆叠多个 Popconfirm — 改用 Modal。
