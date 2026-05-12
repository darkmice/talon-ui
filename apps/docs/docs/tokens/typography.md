---
title: 字体 Tokens
nav:
  title: Tokens
  order: 2
order: 3
---

# 字体 Tokens

---

## 字体族（Font Families）

| Token | 值 | 用途 |
| --- | --- | --- |
| `--tp-font-sans` | `ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'` | 全局默认 |
| `--tp-font-mono` | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace` | 代码 / 路径 / ID |

**使用策略：**

- `sans` 用于所有通用文本，包括标题、正文、按钮、表单标签。
- `mono` 仅用于以下场景：
  - HTML `<code>` 元素内的字面量代码
  - Typography 组件的 `mono-sm` 变体
  - `FileRefRow` 中的文件路径显示
  - `Descriptions` 组件 `code: true` 模式下的值列

Tailwind：`font-sans` / `font-mono`（与 Tailwind v3 原生映射一致）。

---

## 字号比例（Type Scale）

所有字号 token 成对定义（`--tp-fs-*` + `--tp-lh-*`），字重 token 单独定义（`--tp-fw-*`）。

### 字号与行高

| Token | 值 |
| --- | --- |
| `--tp-fs-display` | `32px` |
| `--tp-lh-display` | `40px` |
| `--tp-fs-h1` | `24px` |
| `--tp-lh-h1` | `32px` |
| `--tp-fs-h2` | `20px` |
| `--tp-lh-h2` | `28px` |
| `--tp-fs-h3` | `16px` |
| `--tp-lh-h3` | `24px` |
| `--tp-fs-body` | `14px` |
| `--tp-lh-body` | `22px` |
| `--tp-fs-body-strong` | `14px` |
| `--tp-lh-body-strong` | `22px` |
| `--tp-fs-caption` | `12px` |
| `--tp-lh-caption` | `18px` |
| `--tp-fs-mono-sm` | `12px` |
| `--tp-lh-mono-sm` | `18px` |

### 字重

| Token | 值 |
| --- | --- |
| `--tp-fw-regular` | `400` |
| `--tp-fw-medium` | `500` |
| `--tp-fw-semibold` | `600` |
| `--tp-fw-bold` | `700` |

### 完整比例表（含 Tailwind 映射）

| Tailwind 类 | 字号 / 行高 | 默认字重 | 用途 |
| --- | --- | --- | --- |
| `text-display` | 32px / 40px | 600，字间距 -0.02em | 页面主标题、英雄区标题 |
| `text-h1` | 24px / 32px | 600，字间距 -0.01em | 模块级标题 |
| `text-h2` | 20px / 28px | 600 | 卡片标题、对话框标题 |
| `text-h3` | 16px / 24px | 600 | 小节标题、侧栏分组 |
| `text-body` | 14px / 22px | 400 | 通用正文 |
| `text-body-strong` | 14px / 22px | 500 | 字段标签、强调短语 |
| `text-caption` | 12px / 18px | 400 | 时间戳、辅助说明 |
| `text-mono-sm` | 12px / 18px | 500，mono 字体 | 节点 ID、文件路径、代码 caption |

> 字间距（`letterSpacing`）仅在 `display` 和 `h1` 上设置，其他档位继承浏览器默认。

---

## 数字渲染（Number Rendering）

`.tp-nums` 类（由 preset 通过 `addComponents` 注入）：

```css
.tp-nums {
  font-variant-numeric: tabular-nums;
}
```

**作用：** 启用等宽数字，使数字列在换行或更新时不发生布局跳动。字体本身继承 sans，无需切换 mono。

**适用场景：** 百分比进度值、统计卡数字、分页计数、时间戳数字部分。

**用法：**

```html
<span class="text-h1 tp-nums">98%</span>
<td class="text-body tp-nums">1,234</td>
```

---

## 禁止事项

- ❌ 在组件中裸写 `font-size: 13px` 等未登记的字号。
- ❌ 在正文中使用装饰性渐变文字（CSS `background-clip: text`）。
- ❌ 对非代码内容使用 `font-mono`（会触发错误的语义信号）。
- ❌ 混用超过两个字重层级在同一文本块中（通常只需 regular + semibold）。
- ❌ 在 `text-display` 以上自造更大字号，所有展示文字都应走 `display`。
