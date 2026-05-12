---
title: Divider
nav: Components
group: Basics
order: 8
---

# Divider

1px rule, horizontal or vertical, with optional middle label. Horizontal renders an `<hr>`; vertical renders an inline `<span>` you can drop between flex children.

## Horizontal

<code src="./demos/horizontal.tsx"></code>

## Vertical

<code src="./demos/vertical.tsx"></code>

Set the height by class (`className="h-4"` by default — change to `h-5`, `h-6`, etc.).

## Labelled

<code src="./demos/labelled.tsx"></code>

## API

<API id="Divider"></API>

`role="separator"` and the appropriate `aria-orientation` are always set.

## Don't

- Don't stack three or more horizontal dividers in a row — increase whitespace instead.
- Don't put a vertical divider inside a flow-text paragraph; use it only inside flex / inline-flex toolbars.
