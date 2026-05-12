---
title: Result
nav: Components
group: Data Display
order: 39
---

# Result

Full-page status panel — success / error / warning / info / 403 / 404 / 500. `Result` is the full-page status panel. Use it for completed workflows, terminal errors, and HTTP error pages.

## Success

<code src="./demos/success.tsx"></code>

## Error

<code src="./demos/error.tsx"></code>

## 404

<code src="./demos/not-found.tsx"></code>

## API

<API id="Result"></API>

## Don't

- Don't use Result for transient confirmations (use Toast).
- Don't put multiple Results on a page — it's a terminal state panel.
