---
title: Tokens 概览
nav:
  title: Tokens
  order: 2
order: 1
---

# Tokens 概览

Talon Pilot 的设计 token 体系以 CSS 自定义属性（Custom Properties）为载体，分三层组织，确保任何主题切换只需重写最薄的 Semantic 层，组件代码无需改动。

---

## 三层模型

```
Primitive  ─→  Semantic  ─→  Component
（原始常量）      （用途化）      （组件绑定）
```

### 第一层：Primitive

与主题无关的固定常量——色阶、字号、间距、圆角、动效参数。命名规则：`--tp-<category>-<scale>`。

示例：

```css
--tp-gray-50: #f6f7f9;
--tp-primary-500: #4f60ff;
--tp-space-4: 16px;
--tp-radius-md: 10px;
```

### 第二层：Semantic

将 Primitive 赋予语义，消费方始终引用此层，不直接引用 Primitive（只有需要精确色阶时例外，例如渐变边框）。

示例：

```css
--tp-bg-app:       var(--tp-gray-50);      /* 页面底色 */
--tp-text-primary: var(--tp-gray-900);     /* 正文主色 */
--tp-interactive-primary: var(--tp-primary-500);
```

主题切换时只重写此层。Primitive 与 Component 层保持稳定。

### 第三层：Component

组件内部消费 Semantic，固化组件自身的尺寸、间距、视觉细节。命名规则：`--tp-<component>-<property>`。

示例：

```css
--tp-btn-h-md:    var(--tp-control-h-md);  /* 36px */
--tp-btn-radius:  var(--tp-radius-md);     /* 10px */
--tp-input-px:    12px;
```

---

## 使用规则

1. **颜色** — 优先消费 Semantic 层（`--tp-bg-*` / `--tp-text-*` / `--tp-interactive-*`）；需要精确色阶时才直接引用 Primitive 色阶（如渐变、图表颜色）。
2. **尺寸 / 圆角** — 组件内消费 Component 层（`--tp-btn-h-md`、`--tp-input-radius` 等），不要裸写 px。
3. **间距** — 布局层消费 `--tp-space-*` 或 Tailwind 的 `p-tp-N` / `gap-tp-N` 辅助类。
4. **回退原则** — 仅在构建色阶、数据可视化、图表等需要完整色带的场景，才允许直接引用 Primitive 色阶（如 `--tp-primary-200`）。
5. **禁止裸写色值** — 任何组件代码里不允许出现 `#4f60ff` 这样的字面量；必须通过变量引用。

---

## 主题切换

Token 文件在三个选择器级别处理主题，优先级从低到高：

```css
/* 1. 跟随系统偏好（默认行为） */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) { … }
}

/* 2. 强制暗色（显式设置） */
:root[data-theme='dark'],
.dark { … }

/* 3. 强制亮色（覆盖系统暗） */
:root[data-theme='light'] { color-scheme: light; }
```

**切换方式：**

- 跟随系统 → 不设置 `data-theme`，浏览器自动响应 `prefers-color-scheme`。
- 强制亮色 → `document.documentElement.dataset.theme = 'light'`
- 强制暗色 → `document.documentElement.dataset.theme = 'dark'` 或给根元素加 `.dark` 类。

只有 Semantic 层的变量值会在主题切换时改变；Primitive 与 Component token 在所有主题下保持不变。

---

## Tailwind 暴露

`packages/tokens/dist/tailwind.preset.cjs` 将 CSS token 映射为 Tailwind utility，覆盖四个维度：

### 颜色

| Token 前缀 | Tailwind utility 示例 |
| --- | --- |
| `--tp-bg-app` | `bg-bg-app` |
| `--tp-bg-surface` | `bg-bg-surface` |
| `--tp-text-primary` | `text-text-primary` |
| `--tp-primary-500` | `bg-primary-500` / `text-primary-500` |
| `--tp-danger-500` | `bg-danger-500` / `text-danger-500` |
| `--tp-status-done-fg` | `text-status-done-fg` |
| `--tp-accent-violet` | `bg-accent-violet` |

### 间距 / 圆角 / 控件高度

| 用途 | Tailwind utility |
| --- | --- |
| 间距（4px–80px） | `p-tp-1` / `gap-tp-4` / `m-tp-6` 等 |
| 圆角 | `rounded-sm` / `rounded-md` / `rounded-lg` / `rounded-xl` / `rounded-pill` |
| 控件高度 | `h-control-sm` / `h-control-md` / `h-control-lg` |

### 阴影

| Token | Tailwind utility |
| --- | --- |
| `--tp-shadow-card` | `shadow-card` |
| `--tp-shadow-pop` | `shadow-pop` |
| `--tp-shadow-focus` | `shadow-focus` |

> `--tp-shadow-modal` 未在 preset 中单独暴露，直接通过 CSS 变量消费。

### 动效

| 用途 | Tailwind utility |
| --- | --- |
| 缓动函数 | `ease-tp` |
| 时长快档 | `duration-fast`（150ms） |
| 时长中档 | `duration-mid`（220ms） |

### 自定义组件类

preset 通过 `addComponents` / `addUtilities` 注入以下三个类：

| 类名 | 作用 |
| --- | --- |
| `.tp-focus-ring` | 去掉 outline，叠加 `var(--tp-shadow-focus)` 焦点环 |
| `.tp-nums` | 启用 `font-variant-numeric: tabular-nums`，数字等宽对齐 |
| `.tp-tag` | 标签基础样式：inline-flex、高 22px、padding 0 8px、radius sm、字号 12px/500 |

状态色便捷类（`addUtilities`）：`.tp-status-progress` / `.tp-status-pending` / `.tp-status-done` / `.tp-status-blocked` / `.tp-status-idle` / `.tp-status-info`，每个类同时设置 `background-color` 和 `color`。

---

## Component-Level Tokens 汇总

以下组件在 `:root` 中注册了专属 token 命名空间。这些 token **只应在对应组件的 CSS 内消费**，不应在布局或跨组件代码中引用。

| 命名空间 | 代表 token |
| --- | --- |
| `--tp-btn-*` | Button 三档高度、padding、字号、圆角、图标尺寸 |
| `--tp-input-*` | Input / Select / Combobox 高度、内边距、边框、背景 |
| `--tp-tag-*` | Tag 高度、字号、圆角、点尺寸 |
| `--tp-card-*` | Card / Panel 背景、边框、圆角、阴影、内边距 |
| `--tp-modal-*` | Modal 圆角、宽度、阴影、遮罩 |
| `--tp-drawer-*` | Drawer 默认宽度 |
| `--tp-menu-*` | Menu / Dropdown / Popover 背景、边框、阴影、选项高度 |
| `--tp-tooltip-*` | Tooltip 背景、前景色、圆角、内边距、字号 |
| `--tp-toast-*` | Toast 圆角、阴影、最小/最大宽度 |
| `--tp-pagination-*` | Pagination 按钮尺寸、圆角、间隙、字号、图标尺寸 |
| `--tp-sidebar-*` | Sidebar 宽度（展开/折叠）、选项高度、圆角 |
| `--tp-progress-*` | Progress 轨道高度、圆角、填充色 |
| `--tp-slider-*` | Slider 轨道高度、拖柄尺寸、边框宽度 |
| `--tp-switch-*` | Switch 整体宽高、thumb 尺寸 |
| `--tp-avatar-*` | Avatar 四档尺寸（sm/md/lg/xl） |
| `--tp-badge-*` | Badge 高度、最小宽、内边距、字号、圆角 |
| `--tp-stepper-*` | Stepper 步骤点尺寸 |
| `--tp-tab-*` | Tabs 高度、指示线厚度 |

各组件 API 表格详见对应的组件文档页面。
