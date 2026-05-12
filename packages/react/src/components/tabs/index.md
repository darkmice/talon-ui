---
title: Tabs 标签页
nav: 组件
group: 反馈与导航
order: 24
---

# Tabs 标签页

带可选徽标的下划线样式标签页，封装 Radix Tabs。`Tabs` 是 Talon Pilot 下划线标签：活动标签下方有 2px 主色指示线，无胶囊包裹。组合方式与 Radix Tabs 一致。

## 基础

<code src="./demos/basic.tsx"></code>

## 带徽标

<code src="./demos/with-badge.tsx"></code>

## 受控

<code src="./demos/controlled.tsx"></code>

## API

### Tabs

<API id="Tabs"></API>

### TabsList

<API id="TabsList"></API>

### TabsTrigger

<API id="TabsTrigger"></API>

### TabsContent

<API id="TabsContent"></API>

## 禁忌

- 超过约 6 个标签时不要使用 Tabs — 过多标签会难以扫视。请改用侧边栏或面包屑。
- 不要将 Tabs 嵌套超过 1 层 — 焦点模型会令人困惑。
