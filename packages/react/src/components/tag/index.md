---
title: Tag 标签
nav: 组件
group: 基础组件
order: 4
---

# Tag 标签

用于简短标签的状态药丸和技能标签，支持六种状态色调及中性色。`Tag` 是高 22px 的药丸形状，适用于状态标记、技能标签和可删除筛选器。

## 基础

<code src="./demos/basic.tsx"></code>

## 色调

<code src="./demos/tones.tsx"></code>

| 色调 | 用途 |
|---|---|
| `neutral`（默认） | 技能标签，灰色背景。 |
| `progress` | 任务或节点运行中。 |
| `pending` | 等待人工或 AI 签批。 |
| `done` | 已完成 / 在线。 |
| `blocked` | 失败 / 离线。 |
| `idle` | 未开始 / 草稿。 |
| `info` | 系统级信息。 |

所有状态色调自动添加 `role="status"` 以支持辅助技术。

## 可删除

<code src="./demos/removable.tsx"></code>

## API

<API id="Tag"></API>

## 禁忌

- 不要在单个视觉单元中同时使用两种状态色调 — 选择最具体的一种。
- 不要在不可编辑列表中使用可删除样式 — 该交互暗示内容可修改。
