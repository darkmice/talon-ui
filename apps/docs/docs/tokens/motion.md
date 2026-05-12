---
title: 动效 Tokens
nav:
  title: Tokens
  order: 2
order: 6
---

# 动效 Tokens

---

## 缓动函数（Easing）

| Token | 值 | Tailwind |
| --- | --- | --- |
| `--tp-ease` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | `ease-tp` |

**曲线说明：** 快速加速（0.2 起始控制点）配合强力减速（0.8 末端控制点）产生一种"自信落定"的感觉——元素迅速离开起点、以自然弹性减速到位。这与系统的"工程感 / 可信赖"基调相符，避免了过于弹性的弹簧动效或机械的线性匀速。

---

## 时长（Durations）

| Token | 值 | Tailwind | 适用场景 |
| --- | --- | --- | --- |
| `--tp-duration-fast` | `150ms` | `duration-fast` | 按钮、输入框 hover/active、状态色切换 |
| `--tp-duration-mid` | `220ms` | `duration-mid` | 模态框、抽屉、侧栏的进入/退出 |
| `--tp-duration-slow` | `320ms` | — | 页面级过渡（路由切换、骨架屏消失） |

> `--tp-duration-slow`（320ms）在 preset 中未作为 `duration-slow` 暴露（preset 仅注册了 `fast` 和 `mid`），直接使用 CSS 变量消费。

---

## 使用惯例

### 按钮 / 交互控件

所有按钮和可交互控件使用快档 + Talon 缓动：

```html
<button class="transition duration-fast ease-tp ...">...</button>
```

通常过渡属性：`background-color`、`border-color`、`color`、`box-shadow`、`opacity`。

### 模态框 / 抽屉

进入和退出动画使用中档时长（220ms），搭配 `ease-tp`：

- **进入**：从 `opacity-0 translate-y-2`（或 `translate-x-full` 对抽屉） 过渡到 `opacity-100 translate-y-0`。
- **退出**：反向，通常与进入使用同一时长。

```css
/* 示例：抽屉入场 */
transition: transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
            opacity   220ms cubic-bezier(0.2, 0.8, 0.2, 1);
```

### Toast 通知

- **进入**：150ms `ease-tp` 从右侧滑入（`translateX(100%)` → `translateX(0)`）。
- **自动消失**：
  - 普通 Toast：`4000ms` 后自动关闭。
  - 错误 Toast：`8000ms` 后自动关闭。
- **退出**：150ms 淡出 + 上移 4px。
- 同时最多展示 3 条，更多消息进入队列。

### 骨架屏 / Skeleton

Skeleton 使用 `1400ms` 呼吸动画（`opacity: 0.5 ↔ 1`），不走 token 时长，因为其目的是模拟"持续加载"而非"瞬态过渡"。

### 禁用动效

所有动效必须响应 `prefers-reduced-motion` 媒体查询：

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
