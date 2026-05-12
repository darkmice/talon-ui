---
title: 间距 Tokens
nav:
  title: Tokens
  order: 2
order: 4
---

# 间距 Tokens

---

## 间距比例（Spacing Scale）

间距采用 4px 基准网格，通过 `--tp-space-*` 暴露，并在 Tailwind preset 中以 `tp-N` 键名扩展 `spacing`，可用于 `p-*` / `m-*` / `gap-*` / `w-*` / `h-*` 等所有 spacing utilities。

| Token | 值 | Tailwind（示例） |
| --- | --- | --- |
| `--tp-space-0` | `0px` | `p-tp-0` |
| `--tp-space-1` | `4px` | `p-tp-1` / `gap-tp-1` / `m-tp-1` |
| `--tp-space-2` | `8px` | `p-tp-2` / `gap-tp-2` |
| `--tp-space-3` | `12px` | `p-tp-3` / `gap-tp-3` |
| `--tp-space-4` | `16px` | `p-tp-4` / `gap-tp-4` |
| `--tp-space-5` | `20px` | `p-tp-5` / `gap-tp-5` |
| `--tp-space-6` | `24px` | `p-tp-6` / `gap-tp-6` |
| `--tp-space-8` | `32px` | `p-tp-8` / `gap-tp-8` |
| `--tp-space-10` | `40px` | `p-tp-10` / `gap-tp-10` |
| `--tp-space-14` | `56px` | `p-tp-14` |
| `--tp-space-20` | `80px` | `p-tp-20` |

> 注意：token 编号不连续（跳过了 7、9、11-13、15-19），仅保留实际使用的档位，避免选择焦虑。

**常见对应关系：**

| 场景 | 推荐档位 |
| --- | --- |
| 图标与文字间距 | `tp-1`（4px） |
| 行内元素水平间隙 | `tp-2`（8px） |
| 组件内部 padding | `tp-2`–`tp-3`（8–12px） |
| 卡片 padding | `tp-3`–`tp-6`（12–24px） |
| 卡片之间的 gap | `tp-4`–`tp-5`（16–20px） |
| 页面区块间距 | `tp-8`–`tp-10`（32–40px） |

---

## 圆角比例（Radius Scale）

所有组件圆角必须从此比例中取值，禁止裸写 px。

| Token | 值 | Tailwind |
| --- | --- | --- |
| `--tp-radius-xs` | `4px` | — |
| `--tp-radius-sm` | `6px` | `rounded-sm` |
| `--tp-radius-md` | `10px` | `rounded-md` |
| `--tp-radius-lg` | `14px` | `rounded-lg` |
| `--tp-radius-xl` | `20px` | `rounded-xl` |
| `--tp-radius-pill` | `999px` | `rounded-pill` |

> `--tp-radius-xs`（4px）在 preset 中未单独暴露为 `rounded-xs`，使用时直接引用 CSS 变量。

**组件对照：**

| 组件 | 圆角档位 |
| --- | --- |
| Button（md / lg） | `rounded-md`（10px） |
| Button（sm） | `rounded-sm`（6px） |
| Input / Select | `rounded-md` |
| Card / Panel | `rounded-lg`（14px） |
| Modal / Drawer | `rounded-lg` |
| Menu / Tooltip | `rounded-sm` / `rounded-md` |
| Progress / Badge | `rounded-pill` |
| Tag | `rounded-sm` |

---

## 控件高度（Control Heights）

所有可点击控件（按钮、输入框、选择框、分页按钮等）必须落在三档高度之一，不允许自定义高度值。

| Token | 值 | Tailwind | 适用控件 |
| --- | --- | --- | --- |
| `--tp-control-h-sm` | `28px` | `h-control-sm` | 紧凑尺寸按钮、小号 Avatar |
| `--tp-control-h-md` | `36px` | `h-control-md` | 默认尺寸按钮、输入框、选择框、分页按钮 |
| `--tp-control-h-lg` | `44px` | `h-control-lg` | 大尺寸按钮、移动端触摸目标 |
