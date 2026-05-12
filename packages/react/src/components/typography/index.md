---
title: Typography 排版
nav: 组件
group: 基础组件
order: 10
---

# Typography 排版

Title、Text、Paragraph 和 Link 组件，映射到 Talon Pilot 字体缩放系统。四个轻量封装器，基于 Talon Pilot 字体 Token — 默认语义化，可通过 `tone` 和 `asChild` 自定义。

## 标题

<code src="./demos/headings.tsx"></code>

| 级别 | Token | 元素 |
|---|---|---|
| `display` | `text-display`（32/40） | `<h1>` |
| `1`（默认） | `text-h1`（24/32） | `<h1>` |
| `2` | `text-h2`（20/28） | `<h2>` |
| `3` | `text-h3`（16/24） | `<h3>` |

所有标题字重为 600。

## 正文

<code src="./demos/body.tsx"></code>

| 文本变体 | Token | 说明 |
|---|---|---|
| `body`（默认） | `text-body`（14/22/400） | 默认阅读文本。 |
| `body-strong` | `text-body-strong`（14/22/500） | 强调行内标签。 |
| `caption` | `text-caption`（12/18/400） | 时间戳、次要元数据。 |
| `mono-sm` | `text-mono-sm`（12/18/500） | 节点 ID、路径、日志行。搭配 `nums` 使用表格数字。 |

`Paragraph` 是 `Text` 的块级对应组件，接受 `tone` 和 `spacing` prop（`tight | normal | loose | none`）。

## 链接

<code src="./demos/link.tsx"></code>

`Link` 默认使用 Talon primary-600 色，悬停时显示下划线。传入 `tone="muted"` 用于不需要吸引注意力的行内引用。

## API

### Title

<API id="Title"></API>

### Text

<API id="Text"></API>

### Paragraph

<API id="Paragraph"></API>

### Link

<API id="Link"></API>

所有原生 `<a>` 属性均可使用。

## 禁忌

- 不要在文档大纲中跳跃使用 `<Title>` 层级。请配合 `level` prop 使用对应语义层级。
- 不要用原始 `text-[14px]` 工具类覆盖字体 Token，始终通过 prop 传入。
