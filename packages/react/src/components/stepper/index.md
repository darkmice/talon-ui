---
title: Stepper 步骤条
nav: 组件
group: 反馈与导航
order: 27
---

# Stepper 步骤条

多步骤流程的水平或垂直进度指示器。`Stepper` 是向导式进度指示器，传入 `steps` 数组和 0 索引的 `current` 步骤。

## 基础

<code src="./demos/basic.tsx"></code>

## 垂直

<code src="./demos/vertical.tsx"></code>

## 错误状态与点击跳步

<code src="./demos/error.tsx"></code>

## API

<API id="Stepper"></API>

## 禁忌

- 不要在没有明确进度的情况下使用 Stepper — 用户需要知道自己所处的位置。
- 不要将 Stepper 用作标签条 — 那是 `Tabs` 的职责。
