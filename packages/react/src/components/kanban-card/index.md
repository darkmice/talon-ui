---
title: KanbanCard 看板卡
nav: 组件
group: 数据展示
order: 44
---

# KanbanCard 看板卡

由 ID、标题、标签、负责人、进度和时间戳组成的单张看板卡片。`KanbanCard` 是完整的看板卡片，组合了 `Card` + `Tag` + `Avatar` / `AvatarGroup` + `Progress`，调用方无需重新发明布局。

## 基础

<code src="./demos/basic.tsx"></code>

## 带进度

<code src="./demos/progress.tsx"></code>

## 可选择 + 负责人

<code src="./demos/assignees.tsx"></code>

## API

<API id="KanbanCard"></API>

## 禁忌

- 不要并排放置超过两个标签；改用垂直堆叠。
- 不要在列 / 看板上下文之外使用 KanbanCard — 孤立的卡片失去意义。
