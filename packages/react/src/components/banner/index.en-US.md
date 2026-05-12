---
title: Banner
nav: Components
group: Feedback & Navigation
order: 31
---

# Banner

Inline status callout with tone, optional action, and optional dismiss. `Banner` is the inline status callout — pinned in flow rather than floating like `Toast`. Use it for page-level state messages.

## Basic

<code src="./demos/basic.tsx"></code>

## Tones

<code src="./demos/tones.tsx"></code>

## With action and dismiss

<code src="./demos/action.tsx"></code>

## API

<API id="Banner"></API>

## Don't

- Don't use `Banner` for transient confirmations (use `Toast`).
- Don't stack more than 2 Banners — collapse them into a single composite or convert to a notification list.
