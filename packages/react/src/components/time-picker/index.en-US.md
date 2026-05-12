---
title: TimePicker
nav: Components
group: Forms
order: 21
---

# TimePicker

Three-column scrolling time picker inside a popover. `TimePicker` is a 24-hour picker with scrolling hour / minute (/second) columns. Phase 1 ships 24-hour only; AM/PM toggle is planned for v0.4.

## Basic

<code src="./demos/basic.tsx"></code>

## With seconds

<code src="./demos/seconds.tsx"></code>

## Inside a Form

<code src="./demos/form.tsx"></code>

## API

<API id="TimePicker"></API>

## Don't

- Don't expose seconds to end-users unless your domain requires it (event scheduling, telemetry windows).
- Don't pair a wide step like `minuteStep=30` without a clear caption — users may not realise the granularity.
