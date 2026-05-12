---
title: Statistic
nav: Components
group: Data Display
order: 40
---

# Statistic

Single metric or grid of metrics with optional trend deltas. `Statistic` shows one number with a label. Combine multiple in a CSS grid to build a metric strip.

## Basic

<code src="./demos/basic.tsx"></code>

## With trend delta

<code src="./demos/with-trend.tsx"></code>

## In a grid

<code src="./demos/grid.tsx"></code>

## API

<API id="Statistic"></API>

## Don't

- Don't add icons or borders inside `Statistic` — the design system uses pure typography for rhythm.
- Don't pair a delta with a relative value if the absolute is unclear; show both.
