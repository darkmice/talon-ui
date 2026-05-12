---
title: Collapse 折叠面板
group:
  title: 数据展示
  order: 4
order: 43
---

# Collapse 折叠面板

可展开/收起的面板组（手风琴），适用于分组的次要内容。

`Collapse` 基于 Radix 实现，适合用于 FAQ、高级设置、侧边栏子导航等可选内容的分组展示。

## 代码演示

### 单面板

<code src="./demos/basic.tsx"></code>

### 多面板同时展开

<code src="./demos/multiple.tsx"></code>

### 带额外内容的头部

<code src="./demos/extra.tsx"></code>

## API

### Collapse

<API id="Collapse"></API>

### CollapsePanel

<API id="CollapsePanel"></API>

### CollapseHeader

<API id="CollapseHeader"></API>

## 注意事项

- 不要在 Collapse 内放置长篇内容——读者会快速浏览，隐藏的长文本容易被忽略。
- 不要将 Collapse 嵌套超过 2 层——焦点管理会变得混乱。
