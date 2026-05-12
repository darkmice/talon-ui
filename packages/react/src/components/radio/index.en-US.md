---
title: Radio
nav: Components
group: Forms
order: 13
---

# Radio

Single-choice selector group built on Radix RadioGroup. `RadioGroup` and `RadioGroupItem` wrap `@radix-ui/react-radio-group`. Composition with a `<label>` is recommended.

## Vertical (default)

<code src="./demos/basic.tsx"></code>

## Horizontal

<code src="./demos/horizontal.tsx"></code>

## Inside a Form

<code src="./demos/form.tsx"></code>

## API

### RadioGroup

<API id="RadioGroup"></API>

### RadioGroupItem

<API id="RadioGroupItem"></API>

## Don't

- Don't combine `RadioGroup` with `Checkbox` semantics — radio is single-choice. Use `CheckboxGroup`-style pattern with multiple `Checkbox`es instead.
