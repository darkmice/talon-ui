---
title: Result 结果页
nav: 组件
group: 数据展示
order: 39
---

# Result 结果页

全页状态面板 — 支持 success / error / warning / info / 403 / 404 / 500。`Result` 是全页状态面板，适用于已完成的工作流、终止性错误和 HTTP 错误页面。

## 成功

<code src="./demos/success.tsx"></code>

## 错误

<code src="./demos/error.tsx"></code>

## 404

<code src="./demos/not-found.tsx"></code>

## API

<API id="Result"></API>

## 禁忌

- 不要将 Result 用于瞬时确认（请用 Toast）。
- 不要在同一页面放置多个 Result — 它是终止状态面板。
