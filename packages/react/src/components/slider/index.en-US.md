---
title: Slider
nav: Components
group: Forms
order: 15
---

# Slider

Single or range value slider on a thin track. `Slider` is a horizontal (default) or vertical track with one or more draggable thumbs. Wraps `@radix-ui/react-slider`.

## Single value

<code src="./demos/basic.tsx"></code>

## Range

<code src="./demos/range.tsx"></code>

## Inside a Form

<code src="./demos/form.tsx"></code>

## API

<API id="Slider"></API>

## Don't

- Don't ship a slider without a visible value readout — the user needs to know what they chose.
- Don't use `step` smaller than what the value reasonably represents (1 cent for currency, 1 px for sizes).
