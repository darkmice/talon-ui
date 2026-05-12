---
title: Select
nav: Components
group: Forms
order: 18
---

# Select

Dropdown selector built on Radix Select with composition API. Use `SelectTrigger` + `SelectValue` for the closed state and `SelectContent` + `SelectItem` for the panel.

## Basic

<code src="./demos/basic.tsx"></code>

## Grouped with danger item

<code src="./demos/grouped.tsx"></code>

## Inside a Form

<code src="./demos/form.tsx"></code>

## Anatomy

```
<Select>
  <SelectTrigger size="md">
    <SelectValue placeholder="..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Section</SelectLabel>
      <SelectItem value="x">Label</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectItem value="d" tone="danger">Destructive</SelectItem>
  </SelectContent>
</Select>
```

## API

### Select

<API id="Select"></API>

### SelectTrigger

<API id="SelectTrigger"></API>

### SelectContent

<API id="SelectContent"></API>

### SelectItem

<API id="SelectItem"></API>

## Don't

- Don't put more than ~20 options inline. Use `Combobox` for searchable lists.
- Don't mix Select with `<label>` wrapping — the trigger already exposes accessible name via `SelectValue`.
