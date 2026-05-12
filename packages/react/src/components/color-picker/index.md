---
title: ColorPicker 颜色选择
nav: 组件
group: 表单录入
order: 23
---

# ColorPicker 颜色选择

带预设网格、十六进制输入和系统原生回退的紧凑型颜色选择器。`ColorPicker` 是 Phase 1 的**紧凑型**选择器：预设色板 + 十六进制输入 + 系统原生回退。完整的 HSL/HSV 色盘将在 v0.4 版本推出。

## 基础

<code src="./demos/basic.tsx"></code>

## 自定义预设

<code src="./demos/presets.tsx"></code>

## 表单内使用

<code src="./demos/form.tsx"></code>

## API

<API id="ColorPicker"></API>

## 禁忌

- 不要提供过多的预设色板 — 紧凑型选择器建议不超过约 18 个。
- Phase 1 不支持 Alpha 通道。十六进制格式仅为 `#RRGGBB`。
