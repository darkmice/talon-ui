---
title: 主题
group:
  title: 快速上手
  order: 0
---

# 主题

Talon UI 的视觉契约是一份 3 层 CSS 变量集：

| 层 | 示例 | 用途 |
|---|---|---|
| Primitive | `--tp-gray-500`、`--tp-primary-500` | 原始色阶。主题稳定。 |
| Semantic | `--tp-bg-app`、`--tp-text-primary` | 语义命名，主题切换时自动翻转。 |
| Component | `--tp-btn-h-md`、`--tp-input-radius` | 每个组件的具体值，锁死尺寸/圆角。 |

组件源码只消费 Semantic 与 Component 层，所以暗黑模式无需任何 `dark:` 变体——CSS 变量自己换值。

## 自定义 token

直接覆盖 CSS 变量即可：

```css
:root {
  --tp-primary-500: oklch(0.55 0.2 280); /* 你的品牌色 */
}
```

`bg-primary-500` 解析成 `var(--tp-primary-500)`，所有组件立刻跟随。
