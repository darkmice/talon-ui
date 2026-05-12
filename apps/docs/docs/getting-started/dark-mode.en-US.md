---
title: Dark Mode
group:
  title: Getting Started
  order: 0
---

# Dark Mode

Set ONE of the following on `<html>` (or any ancestor element):

| Trigger | Behaviour |
|---|---|
| `<html data-theme="dark">` | Force dark, override system. |
| `<html data-theme="light">` | Force light, override system. |
| `<html class="dark">` | Tailwind-style dark toggle. Equivalent to `data-theme="dark"`. |
| `(no attribute)` | Follow `prefers-color-scheme`. |

All Talon UI components use only semantic tokens, so they flip automatically.
