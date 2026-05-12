---
title: Drawer
nav: Components
group: Feedback & Navigation
order: 30
---

# Drawer

Side-anchored slide-in panel with sticky header, scrollable body, and sticky footer. `Drawer` is a side-anchored slide-in panel. Built on `@radix-ui/react-dialog`: focus trap, scroll lock, escape-to-close, accessible labelling via Title + Description. The body scrolls independently while the header and footer remain sticky.

## Right (default)

<code src="./demos/right.tsx"></code>

## Left

<code src="./demos/left.tsx"></code>

## Form drawer

<code src="./demos/form.tsx"></code>

## Exports

`Drawer`, `DrawerTrigger`, `DrawerPortal`, `DrawerClose`, `DrawerOverlay`, `DrawerContent` (`side`, `size`, `showClose`), `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerBody`, `DrawerFooter`.

Widths for `left` / `right`: `sm` = 400 px, `md` = 520 px, `lg` = 720 px.
Heights for `top` / `bottom`: `sm` = 200 px, `md` = 320 px, `lg` = 480 px.

## API

### DrawerContent

<API id="DrawerContent"></API>

## Don't

- Don't open a drawer from a drawer — swap the body content instead.
- Don't use a drawer for short confirmations — use `Modal` for that.
- Don't put primary navigation in a drawer on desktop — reserve it for contextual panels.
