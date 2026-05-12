---
title: Form
nav: Components
group: Forms
order: 11
---

# Form

Thin layout layer over react-hook-form — labels, descriptions, error messages, accessible wiring. `Form` follows the shadcn/ui pattern: it does not own validation or state. Instead it gives you accessible `<FormItem>`, `<FormLabel>`, `<FormDescription>`, `<FormMessage>` primitives and a `<FormField>` wrapper that hooks into react-hook-form's `<Controller>`.

## Basic

<code src="./demos/basic.tsx"></code>

## Validation

<code src="./demos/validation.tsx"></code>

When a field has an error, `FormLabel` turns danger red, `FormControl` adds `aria-invalid="true"`, and `FormMessage` renders the message.

## API

`Form` and `FormField` are re-exports from `react-hook-form` (`FormProvider` and `Controller`-based wrapper respectively).

### FormItem

<API id="FormItem"></API>

### FormLabel

<API id="FormLabel"></API>

### FormControl

<API id="FormControl"></API>

### FormDescription

<API id="FormDescription"></API>

### FormMessage

<API id="FormMessage"></API>

### Peer dependency

`react-hook-form ^7.49` is a **peer** dependency. Install it alongside `@talon-ui/react`:

```bash
pnpm add react-hook-form
```

## Don't

- Don't use `<FormLabel>` without wrapping it in `<FormItem>` — the label loses its `htmlFor` wiring.
- Don't bypass `<FormControl>` for an entry control inside a form — accessibility attributes won't be added.
