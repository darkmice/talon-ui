---
title: Progress
nav: Components
group: Data Display
order: 41
---

# Progress

Linear or circular progress indicator with status colours. `Progress` shows determinate progress as a 6px linear bar or a 32–80px circular ring.

## Linear

<code src="./demos/linear.tsx"></code>

## Circular

<code src="./demos/circular.tsx"></code>

## Status colours

<code src="./demos/status.tsx"></code>

## API

<API id="Progress"></API>

## Don't

- Don't show Progress without a known endpoint — use Spin for indeterminate states.
- Don't combine Progress with a separate "%" suffix; the component already labels.
