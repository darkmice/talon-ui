---
title: Pagination
nav: Components
group: Feedback & Navigation
order: 26
---

# Pagination

Numeric pager with sibling window, ellipsis, and per-page size select. `Pagination` is the 32×32 numeric pager. Current page is solid primary; siblings + boundaries collapse via `…` ellipses.

## Basic

<code src="./demos/basic.tsx"></code>

## Small (no page size)

<code src="./demos/small.tsx"></code>

## Custom page sizes

<code src="./demos/with-page-size.tsx"></code>

## API

<API id="Pagination"></API>

## Don't

- Don't change page numbering mid-flow (e.g. inserting items above the current page). Use a stable ordering.
- Don't pair Pagination with an "infinite scroll" — pick one or the other.
