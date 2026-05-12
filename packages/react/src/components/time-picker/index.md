---
title: TimePicker 时间选择
nav: 组件
group: 表单录入
order: 21
---

# TimePicker 时间选择

弹出框内带滚动列的三列时间选择器。`TimePicker` 是 24 小时制选择器，含可滚动的时/分（/秒）列。Phase 1 仅支持 24 小时制；AM/PM 切换计划于 v0.4 推出。

## 基础

<code src="./demos/basic.tsx"></code>

## 带秒

<code src="./demos/seconds.tsx"></code>

## 表单内使用

<code src="./demos/form.tsx"></code>

## API

<API id="TimePicker"></API>

## 禁忌

- 除非业务需要（事件调度、遥测窗口），否则不要向最终用户暴露秒数选择。
- 步长较大（如 `minuteStep=30`）时不要省略说明文字 — 用户可能不清楚精度限制。
