---
title: 暗黑模式
group:
  title: 快速上手
  order: 0
---

# 暗黑模式

在 `<html>` 上设置以下之一即可切换：

| 触发器 | 效果 |
|---|---|
| `<html data-theme="dark">` | 强制暗色，覆盖系统设定 |
| `<html data-theme="light">` | 强制亮色，覆盖系统设定 |
| `<html class="dark">` | Tailwind 风格暗色开关。等价于 `data-theme="dark"`。 |
| 无任何属性 | 跟随 `prefers-color-scheme` |

Talon UI 组件只用语义 token，主题切换时全部自动翻转。
