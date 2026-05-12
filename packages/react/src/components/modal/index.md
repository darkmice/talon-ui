---
title: Modal 模态框
nav: 组件
group: 反馈与导航
order: 29
---

# Modal 模态框

带焦点陷阱和 Escape 关闭的居中对话框。`Modal` 是居中对话框，基于 `@radix-ui/react-dialog` 构建：焦点陷阱、滚动锁定、Escape 关闭、通过 Title + Description 实现无障碍标记。

## 基础

<code src="./demos/basic.tsx"></code>

## 尺寸

<code src="./demos/sizes.tsx"></code>

## 危险操作

<code src="./demos/destructive.tsx"></code>

## 导出列表

`Modal`、`ModalTrigger`、`ModalPortal`、`ModalContent`（`size`、`showClose`）、`ModalHeader`、`ModalTitle`、`ModalDescription`、`ModalFooter`、`ModalClose`、`ModalOverlay`。

## API

### ModalContent

<API id="ModalContent"></API>

## 禁忌

- 不要在没有明确主操作的情况下使用模态框。两个按钮的确认是最低要求。
- 不要从模态框中打开另一个模态框 — 改为在同一模态框内切换内容。
