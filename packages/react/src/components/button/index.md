---
title: Button 按钮
nav: 组件
group: 基础组件
order: 1
---

# Button 按钮

主要的行动召唤（CTA）表面。Variant 映射到操作优先级，Size 映射到控件密度。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 变体

<code src="./demos/variants.tsx"></code>

| Variant | 用途 |
|---|---|
| `primary` | 每屏唯一的主操作。 |
| `secondary` | 次级操作，白底 + 1px 边框。 |
| `ghost` | 三级或行内操作，透明背景。 |
| `danger` | 破坏性操作。必须配文字 — 禁止纯图标 danger。 |

## 尺寸

<code src="./demos/sizes.tsx"></code>

| Size | 高度 | 字体 |
|---|---|---|
| `sm` | 28 | `text-caption` |
| `md`（默认） | 36 | `text-body` |
| `lg` | 44 | `text-body` |

## API

<API id="Button"></API>

支持所有原生 `<button>` 属性。

## 禁忌

- 不要在 `danger` 上使用 `iconOnly` — 破坏性操作必须有文字。
- 不要在同一屏上放两个 primary 按钮。
- 不要静默禁用按钮，给出提示（tooltip 或行内帮助）。
