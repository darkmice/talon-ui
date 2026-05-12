---
title: Modal
nav: Components
group: Feedback & Navigation
order: 29
---

# Modal

Centered dialog with focus trap and escape-to-close. `Modal` is the centered dialog. Built on `@radix-ui/react-dialog`: focus trap, scroll lock, escape-to-close, accessible labelling via Title + Description.

## Basic

<code src="./demos/basic.tsx"></code>

## Sizes

<code src="./demos/sizes.tsx"></code>

## Destructive

<code src="./demos/destructive.tsx"></code>

## Exports

`Modal`, `ModalTrigger`, `ModalPortal`, `ModalContent` (`size`, `showClose`), `ModalHeader`, `ModalTitle`, `ModalDescription`, `ModalFooter`, `ModalClose`, `ModalOverlay`.

## API

### ModalContent

<API id="ModalContent"></API>

## Don't

- Don't ship a modal without a clear primary action. Two-button confirmation is the minimum.
- Don't open a modal from a modal — use the same modal's body to swap content.
