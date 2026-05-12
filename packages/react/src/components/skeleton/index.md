---
title: Skeleton 骨架屏
nav: 组件
group: 数据展示
order: 36
---

# Skeleton 骨架屏

带 1.4s 柔和呼吸动画的加载占位符。`Skeleton` 是轻量加载占位符，在内容加载期间代替最终布局展示。

## 基础

<code src="./demos/basic.tsx"></code>

## 形状

<code src="./demos/shapes.tsx"></code>

## 卡片布局

<code src="./demos/card.tsx"></code>

## API

<API id="Skeleton"></API>

## 禁忌

- 不要将 Skeleton 保留在屏幕上超过约 3 秒；如果数据加载较慢，请切换为 `Spin` 或 `Empty`。
- 不要让 Skeleton 的尺寸与最终内容相差悬殊 — 布局跳变会令人不适。
