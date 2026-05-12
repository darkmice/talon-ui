---
title: Breadcrumb 面包屑
nav: 组件
group: 反馈与导航
order: 25
---

# Breadcrumb 面包屑

带 `/` 分隔符和长路径折叠的导航路径。`Breadcrumb` 是导航路径组件。最后一项为当前页面（`aria-current="page"`）；前置项为可点击链接。

## 基础

<code src="./demos/basic.tsx"></code>

## 折叠（`maxItems`）

<code src="./demos/folded.tsx"></code>

当 `items.length > maxItems` 时，中间条目折叠为 `…` 菜单。

## 自定义分隔符

<code src="./demos/custom-separator.tsx"></code>

## API

<API id="Breadcrumb"></API>

## 禁忌

- 两级路径不要使用面包屑 — 过度设计。
- 不要让最后一项可点击；它是当前页面。
