---
title: DatePicker
nav: Components
group: Forms
order: 20
---

# DatePicker

Calendar popover built on react-day-picker. Single or range mode. `DatePicker` wraps `react-day-picker` inside a Radix Popover. Trigger styling mirrors `Input`; the calendar panel sits in a `shadow-pop` surface.

## Basic (single date)

<code src="./demos/basic.tsx"></code>

## Range

<code src="./demos/range.tsx"></code>

## Inside a Form

<code src="./demos/form.tsx"></code>

## Anatomy

```
<DatePicker
  mode="single"
  value={date}
  onValueChange={setDate}
  placeholder="Pick a date"
  size="md"
/>
```

## API

<API id="DatePicker"></API>

## Don't

- Don't combine DatePicker with a separate TimePicker in one field — use a single combined picker (planned next).
- Don't drop `placeholder` — empty triggers are visually ambiguous.
