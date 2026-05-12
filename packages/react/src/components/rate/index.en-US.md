---
title: Rate
nav: Components
group: Forms
order: 17
---

# Rate

5-star rating control with optional half-step. `Rate` renders a row of stars. Click to commit; hover to preview. Optional `allowHalf` enables half-step rating.

## Basic

<code src="./demos/basic.tsx"></code>

## Half-step

<code src="./demos/half.tsx"></code>

## Inside a Form

<code src="./demos/form.tsx"></code>

## API

<API id="Rate"></API>

## Don't

- Don't ship rating without a textual readout — the star value alone is hard to read at a glance.
- Don't display values like 3.7 when `allowHalf` is off. Round on display or enable halves.
