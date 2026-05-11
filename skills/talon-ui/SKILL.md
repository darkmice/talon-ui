---
name: talon-ui
description: Use this skill whenever the user asks for React or Vue components, screens, or full pages that must match the Talon Pilot design system (covers AI-Agent workspaces, Pilot/Personas/Runtime modules, kanban/list/canvas/chat layouts). Activates on phrases like "用 Talon Pilot 风格", "复刻 ui-kit", "按设计系统输出 React 组件", or any time the user references `design.md` / `ui-kit.html`. The skill walks Claude through token consumption (3-layer: primitive → semantic → component), light/dark theming, Tailwind v3/v4 wiring, and 1:1 component reconstruction.
---

# Talon Pilot UI Skill

You are reconstructing UI in **React** or **Vue** with **Tailwind CSS (v3 or v4)** so that the result is visually & behaviorally identical to the Talon Pilot design system defined in this project.

## 1. Inputs you must read before writing code

Read in this order. Stop as soon as you have enough to answer.

| File                           | When to open                                                                                                                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `references/design.md`         | Always. It is the prose spec — color rules, typography rules, component anatomy, six status states, motion grammar, "do/don't" lists.                                                                   |
| `references/ui-kit.html`       | Whenever the user names a component (button / tag / modal / kanban card / composer / diff block / persona card …). The HTML is the visual source of truth — open it to verify spacing, radius, anatomy. |
| `assets/tokens.css`            | When you need an exact value (color hex, spacing px, shadow, radius).                                                                                                                                   |
| `assets/tailwind.v3.config.js` | Only if the project uses Tailwind v3.                                                                                                                                                                   |
| `assets/tailwind.v4.css`       | Only if the project uses Tailwind v4 (default).                                                                                                                                                         |
| `assets/tokens.json`           | If the user asks for Style Dictionary / Figma Tokens / native platform export.                                                                                                                          |
| `examples/`                    | Mini reference implementations — read the one that matches the requested framework before writing your own.                                                                                             |

> The four files in `assets/` together form the **runtime contract**. If a project already has them, _do not regenerate_ — only consume them.

## 2. Decision flow

1. **Confirm framework + Tailwind major version** (default: React + Tailwind v4).
2. **Confirm component scope.** If the user names a component listed in `references/ui-kit.html`, copy its anatomy 1:1. Otherwise compose from primitives in §3 below.
3. **Read the spec section** in `references/design.md` for that component (search for its name).
4. **Write code** following §3.
5. **Self-check** with §4 before delivering.

## 2.1 Token layers (must understand before writing CSS)

`assets/tokens.css` is **three layers**. Always consume from the highest applicable layer:

1. **Primitive** — raw scales (`--tp-gray-500`, `--tp-primary-500`, `--tp-radius-md`, `--tp-control-h-md`). Theme-stable. Never consume directly in components unless no semantic token fits.
2. **Semantic** — usage-named (`--tp-bg-app`, `--tp-text-primary`, `--tp-border-default`, `--tp-status-done-fg`, `--tp-interactive-bg-hover`). **Theme switches happen here.** This is your default vocabulary.
3. **Component** — per-component (`--tp-btn-h-md`, `--tp-btn-radius`, `--tp-pagination-item-size`, `--tp-input-radius`, `--tp-menu-item-h`). Use when building or restyling that specific component so size/radius stay locked across sm/md/lg.

Rule of thumb: **size & radius → component token**, **color → semantic token**, **fall back to primitive only for ramps**.

## 2.2 Dark mode

Theme is switched via either:

- `<html data-theme="dark">` / `<html data-theme="light">` (explicit), or
- `<html class="dark">` (Tailwind convention — both v3 config and v4 `@custom-variant` are wired), or
- system `prefers-color-scheme: dark` when no attribute is set.

Authoring rules for dark-mode safety:

- Use `bg-bg-surface` / `text-text-primary` / `border-border` etc. — they auto-flip.
- Never hard-code `#fff` / `#000` / `bg-white` / `text-black`. The only allowed hard-pins are danger red and amber star (theme-stable).
- Shadows differ in dark — they're already swapped via `--tp-shadow-*`; just use `shadow-card / shadow-pop / shadow-modal`.
- Status pairs (`tp-status-done` etc.) auto-flip; don't override.

## 3. Authoring rules

- **All colors come from tokens.** Use Tailwind utility classes that resolve to `var(--tp-*)`:
  - Surfaces: `bg-bg-app / bg-bg-surface / bg-bg-subtle / bg-bg-inverse`
  - Text: `text-text-primary / text-text-secondary / text-text-tertiary`
  - Brand: `bg-primary-500 / hover:bg-primary-600 / text-primary-600`
  - Border: `border-border / border-border-strong`
  - Status: `tp-tag tp-status-{progress|pending|done|blocked|idle|info}`
  - Accent (avatar only): `bg-accent-{violet|orange|green|amber|cyan|pink}-soft text-accent-…-ink`
  - Hard-pinned exceptions allowed: danger red `#DC2626 / #B91C1C`, star amber `#F59E0B`, diff bg `#E6F8EC / #FCE3E1`. Nothing else.
- **No bare px values.** Spacing: `p-tp-{1..20}` / `gap-tp-3`. Radius: `rounded-{sm|md|lg|xl|pill}`. Shadow: `shadow-{card|pop|focus}`. Control height: `h-control-{sm|md|lg}`.
- **Numbers use `tp-nums`** (tabular + mono).
- **Three states minimum** on every interactive element: rest / `hover:` / `focus-visible:tp-focus-ring`. Buttons additionally need `transition duration-fast ease-tp`.
- **Icons**: Lucide (`lucide-react` / `lucide-vue-next`), stroke 1.6, size 16/20/24, color `currentColor`.
- **Type scale** uses semantic tokens, not raw sizes: `text-display / text-h1 / text-h2 / text-h3 / text-body / text-caption / text-mono-sm`.
- **Forbidden**: decorative gradients (purple→pink etc.), shadows beyond `shadow-pop`, icon-only destructive buttons, emoji as list markers, `!important`.

## 4. Self-check before responding

Run the checklist mentally — fix any "no" before sending:

- [ ] Every color token-based (or in the allowed hard-pin list)?
- [ ] Every spacing/radius/shadow/control-height from the scale?
- [ ] Hover + focus-visible defined on every interactive element?
- [ ] Numbers wrapped in `tp-nums`?
- [ ] Type uses semantic class (no `text-[14px]`)?
- [ ] Anatomy matches `references/ui-kit.html` (padding, gap, icon size, border)?
- [ ] No new CSS files introduced — output is Tailwind-only?

## 5. Project setup snippets

Use these only when scaffolding a new app. Otherwise assume tokens + Tailwind are wired.

**React + Vite + Tailwind v4** — see `examples/setup-react-v4.md`
**Vue 3 + Vite + Tailwind v3** — see `examples/setup-vue-v3.md`

## 6. Output format

- React → single `.tsx` file, default export, no extra CSS files.
- Vue → single SFC with `<script setup lang="ts">`, no scoped CSS unless absolutely required.
- Keep prop surfaces small and named after the spec (`variant`, `size`, `tone`, `leading`, `trailing`, `loading`).
- Provide a 1–2 line usage example below the component.

When the user requests multiple components, output them as separate files in the same response, not concatenated.
