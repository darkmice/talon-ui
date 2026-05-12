---
title: Badge 徽标
nav: 组件
group: 基础组件
order: 7
---

# Badge 徽标

放置在容器角落的小型数字计数器或圆点。`Badge` 是高 12px 的计数胶囊或 8×8 圆点，可独立使用，也可包裹其他元素定位于右上角。

## 数字

<code src="./demos/number.tsx"></code>

## 圆点

<code src="./demos/dot.tsx"></code>

## 溢出

<code src="./demos/overflow.tsx"></code>

当 `count` 超过 `max`（默认 99）时，徽标显示 `max+`。通过 `max` 控制截断阈值。

## API

<API id="Badge"></API>

## 禁忌

- 不要将 `dot` 与较大的 `count` 值一起用 — 选择其中一种形式。
- 数字长度超过 4 位时不要用 `Badge`；请改用 `Tag`。
