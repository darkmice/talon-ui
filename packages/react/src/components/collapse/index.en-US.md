---
title: Collapse
group:
  title: Data Display
  order: 4
order: 43
---

# Collapse

Expandable panels (accordion) for grouped, secondary content.

`Collapse` is the Radix-backed accordion. Use it for grouped optional content (FAQ, advanced settings, sidebar nav sub-items).

## Examples

### Single

<code src="./demos/basic.tsx"></code>

### Multiple open

<code src="./demos/multiple.tsx"></code>

### With extra slot

<code src="./demos/extra.tsx"></code>

## API

### Collapse

<API id="Collapse"></API>

### CollapsePanel

<API id="CollapsePanel"></API>

### CollapseHeader

<API id="CollapseHeader"></API>

## Don't

- Don't put long-form prose inside Collapse — readers skim, and hidden long text gets missed.
- Don't nest Collapse more than 2 levels deep — focus model gets confusing.
