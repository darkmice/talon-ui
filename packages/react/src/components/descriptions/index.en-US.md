---
title: Descriptions
nav: Components
group: Data Display
order: 42
---

# Descriptions

Key-value panel for entity details — horizontal or vertical, with optional monospace IDs. `Descriptions` renders a key-value list. Use it for detail panels (resource metadata, run summaries).

## Basic

<code src="./demos/basic.tsx"></code>

## Two columns

<code src="./demos/columns.tsx"></code>

## Vertical layout

<code src="./demos/inline.tsx"></code>

## API

### Descriptions

<API id="Descriptions"></API>

### DescriptionsItem

<API id="DescriptionsItem"></API>

## Don't

- Don't pair Descriptions with `<table>` for tabular data — use a real Table component.
- Don't nest Descriptions inside Descriptions; flatten the data instead.
