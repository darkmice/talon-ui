---
title: Combobox
nav: Components
group: Forms
order: 19
---

# Combobox

Searchable dropdown built on cmdk and Radix Popover. `Combobox` is `Select` with a filter input. Built on `cmdk` (filtering + keyboard nav) and Radix Popover (portal + focus management).

## Basic

<code src="./demos/basic.tsx"></code>

## Grouped

<code src="./demos/grouped.tsx"></code>

## Inside a Form

<code src="./demos/form.tsx"></code>

## Anatomy

```
<Combobox value={v} onValueChange={setV}>
  <ComboboxTrigger size="md">
    <ComboboxValue placeholder="..." />
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxInput placeholder="..." />
    <ComboboxList>
      <ComboboxEmpty>Empty state</ComboboxEmpty>
      <ComboboxGroup heading="Section">
        <ComboboxItem value="x">Item</ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

## API

### Combobox

<API id="Combobox"></API>

### ComboboxTrigger

<API id="ComboboxTrigger"></API>

### ComboboxContent

<API id="ComboboxContent"></API>

### ComboboxItem

<API id="ComboboxItem"></API>

## Don't

- Don't use `Combobox` for fewer than ~10 items — a plain `Select` is faster.
- Don't render image content inside `ComboboxItem` unless you also pass a string `value` cmdk can filter by.
