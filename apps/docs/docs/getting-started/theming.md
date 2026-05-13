---
title: 主题
group:
  title: 快速上手
  order: 0
---

# 主题

Talon UI 的主题不是一套运行时 API，而是一套稳定的 CSS 变量契约。  
也就是说：**组件本身不需要 ThemeProvider，换肤就是覆盖变量。**

## 1. 先理解 3 层 token

| 层 | 示例 | 用途 |
|---|---|---|
| Primitive | `--tp-gray-500`、`--tp-primary-500` | 原始色阶。主题稳定。 |
| Semantic | `--tp-bg-app`、`--tp-text-primary` | 语义命名，主题切换时自动翻转。 |
| Component | `--tp-btn-h-md`、`--tp-input-radius` | 每个组件的具体值，锁死尺寸/圆角。 |

推荐的覆盖顺序是：

- 先改 `Semantic`，因为它直接决定“页面看起来像什么”
- 再改 `Primitive`，当你要整体替换品牌色阶时
- 最后才改 `Component`，只在你真的想改变某个组件尺寸或圆角时使用

组件源码主要消费 `Semantic` 与 `Component` 层，所以暗黑模式不需要每个组件单独写一遍 `dark:`。

## 2. 最常见的改法：换品牌色

如果你只是想把主色从 Talon UI 默认蓝紫换成自己的品牌色，通常改这一组就够了：

```css
:root {
  --tp-primary-500: #2563eb;
  --tp-primary-600: #1d4ed8;
  --tp-primary-700: #1e40af;
  --tp-shadow-focus: 0 0 0 3px rgba(37, 99, 235, 0.2);
}
```

这样改完以后，按钮、选中态、链接色、焦点环都会一起跟着走。

## 3. 想改整体气质，就优先改语义层

如果你想让整站更亮一点、更沉一点，或者更像你自己的后台，不要先去改某个组件，先改页面语义 token：

```css
:root {
  --tp-bg-app: #f5f7fb;
  --tp-bg-surface: #ffffff;
  --tp-bg-subtle: #eef2f8;
  --tp-border-default: #d8e0ea;
  --tp-text-primary: #0f172a;
  --tp-text-secondary: #516074;
}
```

这一层会同时影响 `Card`、表单、弹层、状态行、文字和边框，风格会统一很多。

## 4. 只在某个业务区域里换一套视觉，也可以

CSS 变量会天然向下继承，所以你可以只在某个容器里覆盖，而不是全站覆盖：

```css
.ops-shell {
  --tp-primary-500: #0f766e;
  --tp-primary-600: #0d5f59;
  --tp-bg-surface: #f7fffd;
  --tp-border-default: #cde9e4;
}
```

放在 `.ops-shell` 里面的 Talon UI 组件会自动使用这一套值，外面的页面不受影响。

## 5. 什么情况下再去改组件层

组件层变量更适合这些场景：

- 你明确要把按钮高度从默认 36 / 44 改掉
- 你要统一缩小或放大输入框圆角
- 你在做一个特殊密度版本，而不是单纯换色

例如：

```css
:root {
  --tp-control-h-md: 40px;
  --tp-input-radius: 12px;
}
```

这类改动影响会更具体，也更容易带来联动变化，所以建议放在第二步做。

## 6. 实际使用时的建议

- 想统一站点气质时，优先改 `Semantic`
- 想统一品牌色时，优先改 `Primitive` 里的 `primary` 色阶
- 只为了某一个页面特殊化时，用容器级覆盖，不要污染全局 `:root`
- 不要一上来就改很多 `Component` token，不然会很快失去系统性

## 7. 继续往下看

- 想知道主题到底怎么切：看 [暗黑模式](./dark-mode)
- 想完整浏览 token 列表：看 [/tokens/overview](/tokens/overview)
