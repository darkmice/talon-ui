---
title: Spin 加载中
nav: 组件
group: 数据展示
order: 37
---

# Spin 加载中

用于飞行中异步操作的行内加载图标或内容遮罩。`Spin` 展示一个小型动画加载器。可行内渲染，也可包裹任意元素以叠加"加载中"状态。

## 基础

<code src="./demos/basic.tsx"></code>

## 带提示

<code src="./demos/tip.tsx"></code>

## 包裹内容

<code src="./demos/wrap.tsx"></code>

## API

<API id="Spin"></API>

## 禁忌

- 不要将 Spin 用于非异步加载（内容占位请使用 Skeleton）。
- 不要在没有外层容器宽度的情况下使用 Spin — 遮罩需要可测量的边界。
