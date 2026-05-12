---
title: 颜色 Tokens
nav:
  title: Tokens
  order: 2
order: 2
---

# 颜色 Tokens

所有颜色值均从 `packages/tokens/src/tokens.css` 直接读取。Primitive 层保持主题稳定；Semantic 层在亮/暗主题之间切换。

---

## 中性色阶（Neutral Ramp）

`--tp-gray-*` 是所有背景色、边框色、文字色的原料。

| Token | 色块 | 亮色值 |
| --- | --- | --- |
| `--tp-gray-0` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#ffffff;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#ffffff` |
| `--tp-gray-25` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#fafbfc;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#fafbfc` |
| `--tp-gray-50` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#f6f7f9;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#f6f7f9` |
| `--tp-gray-100` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#f1f3f7;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#f1f3f7` |
| `--tp-gray-150` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#e6e8ee;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#e6e8ee` |
| `--tp-gray-200` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#d5d9e0;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#d5d9e0` |
| `--tp-gray-300` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#b7bdc8;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#b7bdc8` |
| `--tp-gray-400` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#94a3b8;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#94a3b8` |
| `--tp-gray-500` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#64748b;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#64748b` |
| `--tp-gray-600` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#475569;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#475569` |
| `--tp-gray-700` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#334155;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#334155` |
| `--tp-gray-800` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#1e293b;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#1e293b` |
| `--tp-gray-850` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#15202e;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#15202e` |
| `--tp-gray-900` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#0f172a;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#0f172a` |
| `--tp-gray-950` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#0b1220;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#0b1220` |
| `--tp-gray-1000` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#0e1116;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#0e1116` |

---

## 主色色阶（Primary Ramp）

Talon 品牌蓝紫色（Indigo Blue），主题稳定。

| Token | 色块 | 值 |
| --- | --- | --- |
| `--tp-primary-50` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#eef2ff;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#eef2ff` |
| `--tp-primary-100` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#e0e7ff;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#e0e7ff` |
| `--tp-primary-200` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#c7d2fe;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#c7d2fe` |
| `--tp-primary-300` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#a5b4fc;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#a5b4fc` |
| `--tp-primary-400` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#818cf8;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#818cf8` |
| `--tp-primary-500` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#4f60ff;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#4f60ff` ← 品牌主色 |
| `--tp-primary-600` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#3b4de6;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#3b4de6` ← Hover |
| `--tp-primary-700` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#2e3dbf;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#2e3dbf` ← Active |
| `--tp-primary-800` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#1e2a8c;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#1e2a8c` |
| `--tp-primary-900` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#131c66;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#131c66` |

Tailwind：`bg-primary-500` / `text-primary-600` / `border-primary-200` 等。

---

## 功能色阶（Functional Ramps）

每个功能色提供 100（浅背景）/ 300（中间调）/ 500（前景）三档，供状态 token 组装使用。

### Blue（进行中）

| Token | 色块 | 值 |
| --- | --- | --- |
| `--tp-blue-100` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#e8eeff;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#e8eeff` |
| `--tp-blue-300` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#94a6ff;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#94a6ff` |
| `--tp-blue-500` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#2e5bff;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#2e5bff` |

### Amber（等待）

| Token | 色块 | 值 |
| --- | --- | --- |
| `--tp-amber-100` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#fff1db;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#fff1db` |
| `--tp-amber-300` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#f0b65b;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#f0b65b` |
| `--tp-amber-500` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#b26b00;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#b26b00` |

### Green（完成）

| Token | 色块 | 值 |
| --- | --- | --- |
| `--tp-green-100` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#dcf5e8;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#dcf5e8` |
| `--tp-green-300` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#5bc892;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#5bc892` |
| `--tp-green-500` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#0e8a55;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#0e8a55` |

### Red（阻塞）

| Token | 色块 | 值 |
| --- | --- | --- |
| `--tp-red-100` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#fce3e1;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#fce3e1` |
| `--tp-red-300` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#e88a85;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#e88a85` |
| `--tp-red-500` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#c8322b;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#c8322b` |

### Info

| Token | 色块 | 值 |
| --- | --- | --- |
| `--tp-info-100` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#e5effd;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#e5effd` |
| `--tp-info-300` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#7db2f5;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#7db2f5` |
| `--tp-info-500` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#1f6feb;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#1f6feb` |

---

## 点缀色（Accent — 头像 / 人物）

六组点缀色各含三档：主色 / 柔和背景（soft）/ 深色墨水（ink）。仅用于头像背景圆和技能 chip，不得用于其他 UI。

| 组 | 主色 | Soft | Ink |
| --- | --- | --- | --- |
| Violet | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#7c5cff;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> `#7c5cff` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#ede9fe;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> `#ede9fe` | `#6d28d9` |
| Orange | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#ff7a45;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> `#ff7a45` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#ffedd5;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> `#ffedd5` | `#c2410c` |
| Green | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#10b981;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> `#10b981` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#d1fae5;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> `#d1fae5` | `#047857` |
| Amber | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#f59e0b;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> `#f59e0b` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#fef3c7;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> `#fef3c7` | `#b45309` |
| Cyan | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#06b6d4;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> `#06b6d4` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#cffafe;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> `#cffafe` | `#0e7490` |
| Pink | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#ec4899;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> `#ec4899` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#fce7f3;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> `#fce7f3` | `#be185d` |

Tailwind：`bg-accent-violet` / `text-accent-violet-ink` / `bg-accent-orange-soft` 等。

---

## Danger（品牌红）

Talon 品牌红，与 `--tp-red-500` 值相同，主题稳定（不随暗色主题变化）。

| Token | 色块 | 值 |
| --- | --- | --- |
| `--tp-danger-500` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#c8322b;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#c8322b` |
| `--tp-danger-600` | <span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:#a12822;border:1px solid rgba(0,0,0,0.06);vertical-align:middle;"></span> | `#a12822` |

Tailwind：`bg-danger-500` / `bg-danger-600` / `text-danger`。

---

## 语义色 — 背景（Semantic Background）

| Token | 亮色 | 暗色 | Tailwind |
| --- | --- | --- | --- |
| `--tp-bg-app` | `#f6f7f9`（gray-50） | `#0b1220` | `bg-bg-app` |
| `--tp-bg-surface` | `#ffffff`（gray-0） | `#131a2a` | `bg-bg-surface` |
| `--tp-bg-surface-2` | `#fafbfc`（gray-25） | `#18213a` | — |
| `--tp-bg-subtle` | `#f1f3f7`（gray-100） | `#1b2438` | `bg-bg-subtle` |
| `--tp-bg-inverse` | `#0e1116`（gray-1000） | `#f1f3f7` | `bg-bg-inverse` |
| `--tp-bg-overlay` | `rgba(15,23,42,0.4)` | `rgba(0,0,0,0.55)` | — |

---

## 语义色 — 边框（Semantic Border）

| Token | 亮色 | 暗色 | Tailwind |
| --- | --- | --- | --- |
| `--tp-border-subtle` | `#f1f3f7`（gray-100） | `#1f2a40` | — |
| `--tp-border-default` | `#e6e8ee`（gray-150） | `#25324b` | `border` / `border-border` |
| `--tp-border-strong` | `#d5d9e0`（gray-200） | `#2f3d5c` | `border-border-strong` |
| `--tp-border-focus` | `#4f60ff`（primary-500） | `#818cf8`（primary-400） | — |

---

## 语义色 — 文字（Semantic Text）

| Token | 亮色 | 暗色 | Tailwind |
| --- | --- | --- | --- |
| `--tp-text-primary` | `#0f172a`（gray-900） | `#e6e9f2` | `text-text-primary` |
| `--tp-text-secondary` | `#475569`（gray-600） | `#a2adc2` | `text-text-secondary` |
| `--tp-text-tertiary` | `#94a3b8`（gray-400） | `#6b7790` | `text-text-tertiary` |
| `--tp-text-disabled` | `#b7bdc8`（gray-300） | `#4a5570` | — |
| `--tp-text-on-primary` | `#ffffff` | `#ffffff` | `text-text-on-primary` |
| `--tp-text-link` | `#3b4de6`（primary-600） | `#a5b4fc`（primary-300） | — |

---

## 语义色 — 状态对（Semantic Status Pairs）

每个状态由 `fg`（前景文字/图标）和 `bg`（背景）两个 token 组成，必须成对使用。

| 状态 | Token | 亮色 | 暗色 |
| --- | --- | --- | --- |
| **done** | `--tp-status-done-fg` | `#0e8a55` | `#6cd89f` |
| | `--tp-status-done-bg` | `#dcf5e8` | `rgba(60,200,130,0.14)` |
| **progress** | `--tp-status-progress-fg` | `#2e5bff` | `#a8b5ff` |
| | `--tp-status-progress-bg` | `#e8eeff` | `rgba(79,96,255,0.16)` |
| **pending** | `--tp-status-pending-fg` | `#b26b00` | `#f4c57b` |
| | `--tp-status-pending-bg` | `#fff1db` | `rgba(244,167,73,0.14)` |
| **blocked** | `--tp-status-blocked-fg` | `#c8322b` | `#f09b96` |
| | `--tp-status-blocked-bg` | `#fce3e1` | `rgba(232,138,133,0.14)` |
| **idle** | `--tp-status-idle-fg` | `#64748b` | `#a4aec2` |
| | `--tp-status-idle-bg` | `#eef1f5` | `rgba(255,255,255,0.06)` |
| **info** | `--tp-status-info-fg` | `#1f6feb` | `#9cc2ff` |
| | `--tp-status-info-bg` | `#e5effd` | `rgba(79,140,255,0.14)` |

Tailwind 便捷类（同时设置 fg + bg）：`.tp-status-done` / `.tp-status-progress` / `.tp-status-pending` / `.tp-status-blocked` / `.tp-status-idle` / `.tp-status-info`。

---

## 语义色 — 交互（Semantic Interactive）

| Token | 亮色 | 暗色 |
| --- | --- | --- |
| `--tp-interactive-primary` | `#4f60ff`（primary-500） | `#4f60ff` |
| `--tp-interactive-primary-hover` | `#3b4de6`（primary-600） | `#818cf8`（primary-400） |
| `--tp-interactive-primary-active` | `#2e3dbf`（primary-700） | `#a5b4fc`（primary-300） |
| `--tp-interactive-bg-hover` | `#f1f3f7`（gray-100） | `rgba(255,255,255,0.06)` |
| `--tp-interactive-bg-active` | `#e6e8ee`（gray-150） | `rgba(255,255,255,0.1)` |
| `--tp-interactive-bg-selected` | `#eef2ff`（primary-50） | `rgba(79,96,255,0.18)` |
| `--tp-interactive-fg-selected` | `#2e3dbf`（primary-700） | `#c7d2fe`（primary-200） |
