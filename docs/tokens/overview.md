---
title: Tokens 概览
nav:
  title: Tokens
  order: 2
---

# Tokens 概览

完整 token 目录在 `packages/tokens/src/tokens.css`。挑几条关键：

## 颜色

| Token | 亮色 | 暗色 |
|---|---|---|
| `--tp-bg-app` | `#F6F7F9` | `#0B1220` |
| `--tp-bg-surface` | `#FFFFFF` | `#131A2A` |
| `--tp-text-primary` | `#0F172A` | `#E6E9F2` |
| `--tp-primary-500` | `#4F60FF` | (主题稳定) |
| `--tp-status-done-fg` | `#0E8A55` | `#6CD89F` |

## 间距

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 80` 通过 `--tp-space-{1..20}` 以及 Tailwind utility `p-tp-N` / `gap-tp-N` / `m-tp-N` 暴露。

## 圆角

`sm 6 · md 10 · lg 14 · xl 20 · pill 999`，对应 `rounded-{sm|md|lg|xl|pill}`。

## 字体

`display 32/40 · h1 24/32 · h2 20/28 · h3 16/24 · body 14/22 · caption 12/18 · mono-sm 12/18`，对应 `text-display` / `text-h1` / `text-h2` / `text-h3` / `text-body` / `text-caption` / `text-mono-sm`。
