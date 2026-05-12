---
title: Upload 上传
nav: 组件
group: 表单录入
order: 22
---

# Upload 上传

带进度/取消/重试/删除的拖拽文件上传组件。`Upload` 是虚线拖放区域加文件列表。它管理内部的 `UploadFile[]` 状态（也可受控），并可通过 `onUpload` 异步钩子驱动实际上传。

## 基础

<code src="./demos/basic.tsx"></code>

## 带上传进度

<code src="./demos/progress.tsx"></code>

文件名包含 `fail` 时可触发错误路径。

## 表单内使用

<code src="./demos/form.tsx"></code>

## API

<API id="Upload"></API>

## 禁忌

- 不要在没有缩略图扩展的情况下将 `Upload` 用于图片预览 — Phase 1 仅支持文本列表条目。
- 不要将外部文件选择器与 `Upload` 并用 — 该组件已内置输入 + 拖拽交互。
