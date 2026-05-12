---
title: Menu 下拉菜单
nav: 组件
group: 反馈与导航
order: 28
---

# Menu 下拉菜单

带子菜单、快捷键、分隔符和危险操作项的下拉菜单。`Menu` 是封装 `@radix-ui/react-dropdown-menu` 的下拉菜单，支持图标、快捷键标签、分隔符、子菜单、复选框 / 单选项，以及危险操作项的 `tone="danger"`。

## 基础

<code src="./demos/basic.tsx"></code>

## 图标 + 快捷键

<code src="./demos/icons-and-shortcuts.tsx"></code>

## 子菜单

<code src="./demos/submenu.tsx"></code>

## 导出列表

`Menu`、`MenuTrigger`、`MenuContent`、`MenuItem`（含 `icon`、`shortcut`、`tone`）、`MenuLabel`、`MenuSeparator`、`MenuShortcut`、`MenuSub`、`MenuSubTrigger`、`MenuSubContent`、`MenuCheckboxItem`、`MenuRadioGroup`、`MenuRadioItem`、`MenuGroup`、`MenuPortal`。

## API

### MenuItem

<API id="MenuItem"></API>

### MenuSubTrigger

<API id="MenuSubTrigger"></API>

### MenuCheckboxItem

<API id="MenuCheckboxItem"></API>

### MenuRadioItem

<API id="MenuRadioItem"></API>

## 禁忌

- 不要将 Menu 用作 Tabs 或侧边栏的替代 — 菜单用于操作，不用于导航。
- 不要在一个菜单中放超过约 10 个条目。用 `MenuLabel` 和 `MenuSeparator` 分组，或拆分为嵌套子菜单。
