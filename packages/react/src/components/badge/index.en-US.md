---
title: Badge
nav: Components
group: Basics
order: 7
---

# Badge

Small numeric counter or dot positioned on a container's corner. `Badge` is a 12-tall counter pill or 8×8 dot. It works standalone or wraps another element to sit at its top-right.

## Number

<code src="./demos/number.tsx"></code>

## Dot

<code src="./demos/dot.tsx"></code>

## Overflow

<code src="./demos/overflow.tsx"></code>

When `count` exceeds `max` (default 99), the badge renders `max+`. Set `max` to control the cutoff.

## API

<API id="Badge"></API>

## Don't

- Don't combine `dot` with a large `count` value — pick one shape.
- Don't use `Badge` for status pills longer than 4 digits; switch to `Tag`.
