---
title: Popconfirm
nav: Components
group: Feedback & Navigation
order: 33
---

# Popconfirm

Inline confirm/cancel popover for impactful actions. `Popconfirm` is a smaller, focused popover with confirm + cancel buttons. Use it for inline actions that need a single explicit confirmation but don't warrant a full modal.

## Basic

<code src="./demos/basic.tsx"></code>

## Danger tone

<code src="./demos/danger.tsx"></code>

## Async confirm

<code src="./demos/async.tsx"></code>

## API

<API id="Popconfirm"></API>

## Don't

- Don't use Popconfirm when an immediate Toast undo is more appropriate (e.g. archiving with a 5-second undo window).
- Don't stack multiple Popconfirms inside the same flow — escalate to a Modal.
