---
title: Toast
nav: Components
group: Feedback & Navigation
order: 32
---

# Toast

Transient floating notifications with auto-dismiss and an imperative API. `Toast` is the floating notification stack pinned to the top-right corner. Wraps `@radix-ui/react-toast` and provides an imperative `useToast()` hook.

## Setup

Wrap your app once in `<ToastProvider>` (typically at the root):

```tsx | pure
<ToastProvider>
  <App />
</ToastProvider>
```

Then call `useToast()` anywhere:

```tsx | pure
const { toast } = useToast();
toast({ title: 'Saved', tone: 'success' });
```

## Basic

<code src="./demos/basic.tsx"></code>

## Tones

<code src="./demos/tones.tsx"></code>

Default durations: 4s for `info`/`success`, 6s for `warning`, 8s for `error`.

## With action

<code src="./demos/with-action.tsx"></code>

## API

```ts | pure
const { toast, dismiss } = useToast();

const id = toast({
  title?: ReactNode;
  description?: ReactNode;
  tone?: 'info' | 'success' | 'warning' | 'error';
  action?: ReactNode;
  duration?: number; // overrides default
});

dismiss(id);    // close one
dismiss();      // close all
```

## Don't

- Don't show more than 3 toasts at once — `ToastProvider` truncates the queue by default; the newest stays visible.
- Don't put long-form content in a toast — switch to `Banner` if the message is persistent.
