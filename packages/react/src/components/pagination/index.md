---
title: Pagination 分页
nav: 组件
group: 反馈与导航
order: 26
---

# Pagination 分页

带相邻窗口、省略号和每页条数选择的数字分页器。`Pagination` 是 32×32 的数字分页器。当前页为实心主色；相邻页和边界页通过 `…` 省略号折叠。

## 基础

<code src="./demos/basic.tsx"></code>

## 紧凑（无每页条数）

<code src="./demos/small.tsx"></code>

## 自定义每页条数

<code src="./demos/with-page-size.tsx"></code>

## API

<API id="Pagination"></API>

## 禁忌

- 不要在流程中途更改页面编号（如在当前页上方插入条目）。请使用稳定排序。
- 不要将分页与"无限滚动"并用 — 两者选其一。
