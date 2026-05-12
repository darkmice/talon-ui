---
title: Breadcrumb
nav: Components
group: Feedback & Navigation
order: 25
---

# Breadcrumb

Navigational path with `/` separators and folding for long paths. `Breadcrumb` is the navigation trail. Last item is the current page (`aria-current="page"`); preceding items are clickable links.

## Basic

<code src="./demos/basic.tsx"></code>

## Folded (`maxItems`)

<code src="./demos/folded.tsx"></code>

When `items.length > maxItems`, the middle entries collapse into a `…` menu.

## Custom separator

<code src="./demos/custom-separator.tsx"></code>

## API

<API id="Breadcrumb"></API>

## Don't

- Don't render breadcrumbs for two-level paths — overkill.
- Don't make the last item clickable; it's the current page.
