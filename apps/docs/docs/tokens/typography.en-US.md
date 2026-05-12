---
title: Typography Tokens
nav:
  title: Tokens
  order: 2
order: 3
---

# Typography Tokens

---

## Font Families

| Token | Value | Usage |
| --- | --- | --- |
| `--tp-font-sans` | `ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'` | Global default |
| `--tp-font-mono` | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace` | Code / paths / IDs |

**Policy:**

- `sans` is used for all general text — headings, body copy, buttons, form labels.
- `mono` is reserved for:
  - Literal code inside HTML `<code>` elements
  - The `mono-sm` variant of the Typography component
  - File paths in `FileRefRow`
  - `Descriptions` component values when `code: true` is set

Tailwind: `font-sans` / `font-mono` (matching Tailwind v3 native mapping).

---

## Type Scale

All size tokens are defined in pairs (`--tp-fs-*` + `--tp-lh-*`); weight tokens are standalone (`--tp-fw-*`).

### Font sizes and line heights

| Token | Value |
| --- | --- |
| `--tp-fs-display` | `32px` |
| `--tp-lh-display` | `40px` |
| `--tp-fs-h1` | `24px` |
| `--tp-lh-h1` | `32px` |
| `--tp-fs-h2` | `20px` |
| `--tp-lh-h2` | `28px` |
| `--tp-fs-h3` | `16px` |
| `--tp-lh-h3` | `24px` |
| `--tp-fs-body` | `14px` |
| `--tp-lh-body` | `22px` |
| `--tp-fs-body-strong` | `14px` |
| `--tp-lh-body-strong` | `22px` |
| `--tp-fs-caption` | `12px` |
| `--tp-lh-caption` | `18px` |
| `--tp-fs-mono-sm` | `12px` |
| `--tp-lh-mono-sm` | `18px` |

### Font weights

| Token | Value |
| --- | --- |
| `--tp-fw-regular` | `400` |
| `--tp-fw-medium` | `500` |
| `--tp-fw-semibold` | `600` |
| `--tp-fw-bold` | `700` |

### Full scale with Tailwind mapping

| Tailwind class | Size / Line height | Default weight | Usage |
| --- | --- | --- | --- |
| `text-display` | 32px / 40px | 600, letter-spacing -0.02em | Page hero titles |
| `text-h1` | 24px / 32px | 600, letter-spacing -0.01em | Module-level headings |
| `text-h2` | 20px / 28px | 600 | Card titles, dialog titles |
| `text-h3` | 16px / 24px | 600 | Section headings, sidebar groups |
| `text-body` | 14px / 22px | 400 | General body copy |
| `text-body-strong` | 14px / 22px | 500 | Field labels, emphasized phrases |
| `text-caption` | 12px / 18px | 400 | Timestamps, supplementary notes |
| `text-mono-sm` | 12px / 18px | 500, mono font | Node IDs, file paths, code captions |

> Letter-spacing is only set on `display` and `h1`; all other steps inherit the browser default.

---

## Number Rendering

The `.tp-nums` class (injected by the preset via `addComponents`):

```css
.tp-nums {
  font-variant-numeric: tabular-nums;
}
```

**Effect:** Enables tabular (monospaced) numerals so numeric columns don't shift layout when values update. The font itself stays as sans — no need to switch to mono.

**When to use:** Percentage progress values, stat-card numbers, pagination counts, the numeric portion of timestamps.

**Usage:**

```html
<span class="text-h1 tp-nums">98%</span>
<td class="text-body tp-nums">1,234</td>
```

---

## Don't

- Do not use unregistered font sizes like `font-size: 13px` in component code.
- Do not apply decorative gradient text (`background-clip: text`) in body content.
- Do not use `font-mono` for non-code content — it sends incorrect semantic signals.
- Do not mix more than two weight levels within a single text block (regular + semibold is usually sufficient).
- Do not invent a size larger than `text-display`; all display-scale text should use it.
