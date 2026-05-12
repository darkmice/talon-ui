---
title: Slider 滑块
nav: 组件
group: 表单录入
order: 15
---

# Slider 滑块

细轨道上的单值或范围滑块。`Slider` 是带一个或多个可拖动滑块的水平（默认）或垂直轨道，封装 `@radix-ui/react-slider`。

## 单值

<code src="./demos/basic.tsx"></code>

## 范围

<code src="./demos/range.tsx"></code>

## 表单内使用

<code src="./demos/form.tsx"></code>

## API

<API id="Slider"></API>

## 禁忌

- 不要在没有可见数值展示的情况下使用滑块 — 用户需要知道当前选择的值。
- 不要将 `step` 设置得比实际值精度更小（货币用 1 分，尺寸用 1 像素）。
