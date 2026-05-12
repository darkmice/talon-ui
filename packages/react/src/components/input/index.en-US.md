---
title: Input
nav: Components
group: Basics
order: 2
---

# Input

Single-line text input with prefix/suffix slots and tone variants. `Input` wraps a bare `<input>` inside a `<label>` so the wrapper handles the focus boundary and slots for icons/units.

## Basic

<code src="./demos/basic.tsx"></code>

## Prefix and suffix

<code src="./demos/prefix-suffix.tsx"></code>

## API

<API id="Input"></API>

All native `<input>` attributes are accepted (except `size`, which is shadowed by the visual `size` variant).

## Don't

- Don't put `<Input>` inside `<Input>` — the label wrapper assumes a single inner input.
- Don't fight the focus ring; the wrapper supplies it.
