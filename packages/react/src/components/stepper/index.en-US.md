---
title: Stepper
nav: Components
group: Feedback & Navigation
order: 27
---

# Stepper

Horizontal or vertical progress indicator for multi-step flows. `Stepper` is the wizard-style progress indicator. Pass an array of `steps` and the 0-indexed `current` step.

## Basic

<code src="./demos/basic.tsx"></code>

## Vertical

<code src="./demos/vertical.tsx"></code>

## With error state and click-to-jump

<code src="./demos/error.tsx"></code>

## API

<API id="Stepper"></API>

## Don't

- Don't ship a Stepper without explicit progress; users need to know where they are.
- Don't use Stepper as a tab strip — that's `Tabs`.
