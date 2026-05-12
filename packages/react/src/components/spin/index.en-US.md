---
title: Spin
nav: Components
group: Data Display
order: 37
---

# Spin

Inline spinner or content overlay for in-flight async operations. `Spin` shows a small animated loader. Render it inline, or wrap any element to overlay a "loading" state across it.

## Basic

<code src="./demos/basic.tsx"></code>

## With tip

<code src="./demos/tip.tsx"></code>

## Wrapping content

<code src="./demos/wrap.tsx"></code>

## API

<API id="Spin"></API>

## Don't

- Don't use Spin for non-async loading (use Skeleton for content placeholders).
- Don't ship Spin without an outer container width — overlay needs measurable bounds.
