---
title: Checkbox
nav: Components
group: Forms
order: 12
---

# Checkbox

Binary or tri-state selector wrapped over Radix Checkbox. `Checkbox` is a small box with a check (or minus for indeterminate state). It wraps `@radix-ui/react-checkbox` for accessibility.

## Basic

<code src="./demos/basic.tsx"></code>

## States

<code src="./demos/states.tsx"></code>

## Inside a Form

<code src="./demos/form.tsx"></code>

## API

<API id="Checkbox"></API>

## Don't

- Don't surround `<Checkbox>` with two clickable wrappers — `<label>` is enough.
- Don't use indeterminate as a permanent state. It signals "partial" and should resolve.
