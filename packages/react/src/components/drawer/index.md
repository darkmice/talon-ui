---
title: Drawer 抽屉
nav: 组件
group: 反馈与导航
order: 30
---

# Drawer 抽屉

带固定头部、可滚动主体和固定底部的侧边滑入面板。`Drawer` 是侧边锚定的滑入面板，基于 `@radix-ui/react-dialog`：焦点陷阱、滚动锁定、Escape 关闭、通过 Title + Description 实现无障碍标记。主体区域独立滚动，头部和底部保持固定。

## 右侧（默认）

<code src="./demos/right.tsx"></code>

## 左侧

<code src="./demos/left.tsx"></code>

## 表单抽屉

<code src="./demos/form.tsx"></code>

## 导出列表

`Drawer`、`DrawerTrigger`、`DrawerPortal`、`DrawerClose`、`DrawerOverlay`、`DrawerContent`（`side`、`size`、`showClose`）、`DrawerHeader`、`DrawerTitle`、`DrawerDescription`、`DrawerBody`、`DrawerFooter`。

`left` / `right` 宽度：`sm` = 400px，`md` = 520px，`lg` = 720px。
`top` / `bottom` 高度：`sm` = 200px，`md` = 320px，`lg` = 480px。

## API

### DrawerContent

<API id="DrawerContent"></API>

## 禁忌

- 不要从抽屉中打开另一个抽屉 — 改为切换主体内容。
- 不要将抽屉用于简短的确认场景 — 请使用 `Modal`。
- 桌面端不要将主要导航放在抽屉中 — 保留给上下文面板使用。
