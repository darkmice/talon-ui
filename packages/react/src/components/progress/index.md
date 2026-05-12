---
title: Progress 进度条
nav: 组件
group: 数据展示
order: 41
---

# Progress 进度条

带状态颜色的线性或环形进度指示器。`Progress` 以 6px 线性条或 32–80px 环形展示确定进度。

## 线性

<code src="./demos/linear.tsx"></code>

## 环形

<code src="./demos/circular.tsx"></code>

## 状态颜色

<code src="./demos/status.tsx"></code>

## API

<API id="Progress"></API>

## 禁忌

- 不要在没有已知终点的情况下展示 Progress — 不确定状态请使用 Spin。
- 不要在组件外单独添加 "%" 后缀；组件已内置标注。
