---
title: 层叠 Tokens
nav:
  title: Tokens
  order: 2
order: 5
---

# 层叠 Tokens

层叠体系包含三个维度：**阴影**（视觉高度）、**焦点环**（键盘可访问性）、**z-index 层级**（覆盖顺序）。

---

## 阴影（Shadows）

四个阴影档位对应不同的 UI 层次，亮/暗主题均有对应值。

### `--tp-shadow-card`

用于卡片、面板、表格行的轻微浮起感。

| 主题 | 值 |
| --- | --- |
| 亮色 | `0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 0 rgba(15, 23, 42, 0.02)` |
| 暗色 | `0 1px 0 rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.32)` |

Tailwind：`shadow-card`

### `--tp-shadow-pop`

用于下拉菜单、Popover、Tooltip、Toast——从页面平面弹出的浮层。

| 主题 | 值 |
| --- | --- |
| 亮色 | `0 12px 32px -12px rgba(15, 23, 42, 0.18)` |
| 暗色 | `0 16px 40px -12px rgba(0, 0, 0, 0.6)` |

Tailwind：`shadow-pop`

### `--tp-shadow-modal`

用于模态框、抽屉——需要强烈视觉分离的最高层浮层。

| 主题 | 值 |
| --- | --- |
| 亮色 | `0 24px 64px -16px rgba(15, 23, 42, 0.28)` |
| 暗色 | `0 32px 80px -16px rgba(0, 0, 0, 0.7)` |

> `--tp-shadow-modal` 未在 Tailwind preset 中单独暴露，直接通过 CSS 变量消费（`var(--tp-shadow-modal)`）。

### `--tp-shadow-focus`

用于键盘焦点环，不作为视觉阴影单独使用。

| 主题 | 值 |
| --- | --- |
| 亮色 | `0 0 0 3px rgba(79, 96, 255, 0.18)` |
| 暗色 | `0 0 0 3px rgba(129, 140, 248, 0.32)` |

Tailwind：`shadow-focus`

---

## 焦点环（Focus Ring）

`.tp-focus-ring` 是键盘可访问性的统一实现，由 preset 通过 `addComponents` 注入：

```css
.tp-focus-ring {
  outline: none;
  box-shadow: var(--tp-shadow-focus);
}
```

**用法规则：**

- 始终通过 `focus-visible:` 变体触发，不在 `focus:` 上触发（避免鼠标点击时出现焦点环）：
  ```html
  <button class="focus-visible:tp-focus-ring">...</button>
  ```
- 焦点环颜色会随主题自动切换（亮色主题为品牌蓝 `rgba(79,96,255,0.18)`，暗色主题为 `rgba(129,140,248,0.32)`）。
- 任何可交互控件（按钮、输入框、链接、选项）都必须绑定焦点环，不得使用 `outline: none` 裸写覆盖。

---

## Z-index 层级

所有组件的 `z-index` 必须从此层级系统中取值，禁止使用 `9999` 等魔法数字。

| Token | 值 | Tailwind | 用途 |
| --- | --- | --- | --- |
| `--tp-z-dropdown` | `1000` | `z-dropdown` | 下拉菜单、Combobox 面板 |
| `--tp-z-sticky` | `1020` | `z-sticky` | 固定顶栏、粘性侧栏 |
| `--tp-z-overlay` | `1040` | `z-overlay` | 模态框遮罩层 |
| `--tp-z-modal` | `1050` | `z-modal` | 模态框、抽屉主体 |
| `--tp-z-toast` | `1080` | `z-toast` | Toast 通知（必须在所有浮层之上） |

**层级设计原则：**

1. Dropdown（1000）位于正常内容之上，但低于任何覆盖层。
2. Sticky（1020）略高于 Dropdown，确保固定顶栏不被下拉菜单遮盖。
3. Overlay（1040）是模态遮罩，覆盖所有正常和 Dropdown 内容。
4. Modal（1050）位于遮罩之上，确保对话框可交互。
5. Toast（1080）始终在最顶层，确保通知不被任何浮层遮挡。

> Popover 通常与 Dropdown 同层（1000）；如果 Popover 在 Modal 内部触发，需要将其提升到 `z-modal` 以上（通常通过 Portal 挂载到 document.body 解决）。
