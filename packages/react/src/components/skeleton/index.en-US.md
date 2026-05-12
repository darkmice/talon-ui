---
title: Skeleton
nav: Components
group: Data Display
order: 36
---

# Skeleton

Loading placeholder with a soft 1.4s breathing animation. `Skeleton` is the lightweight loading placeholder. Use it during content fetches in place of the eventual layout.

## Basic

<code src="./demos/basic.tsx"></code>

## Shapes

<code src="./demos/shapes.tsx"></code>

## In a card layout

<code src="./demos/card.tsx"></code>

## API

<API id="Skeleton"></API>

## Don't

- Don't keep a Skeleton on-screen longer than ~3 seconds; switch to `Spin` or `Empty` if data is taking long.
- Don't make Skeleton dimensions wildly different from the final content — the layout jump is jarring.
