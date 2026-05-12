---
title: NumberInput
nav: Components
group: Forms
order: 16
---

# NumberInput

Numeric input with stepper buttons, unit suffix, and hold-to-repeat. `NumberInput` is a 36px input with `tp-nums` numeric font and right-side up/down arrow buttons. Holding an arrow continuously steps.

## Basic

<code src="./demos/basic.tsx"></code>

## Unit suffix

<code src="./demos/unit.tsx"></code>

## Inside a Form

<code src="./demos/form.tsx"></code>

## API

<API id="NumberInput"></API>

All non-`size` `<input>` attributes are forwarded.

## Don't

- Don't combine `NumberInput` with a `<Slider>` for the same value — pick one input affordance.
- Don't ship without `min` / `max` if the field has logical bounds. Unbounded numerics invite invalid data.
