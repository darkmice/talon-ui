# @talon-ui/tokens

Talon Pilot design tokens. Exports:

- `@talon-ui/tokens` — typed JSON tokens
- `@talon-ui/tokens/css` — `tokens.css` (CSS variables, light + dark)
- `@talon-ui/tokens/tailwind-v4` — `@theme inline` Tailwind v4 entry
- `@talon-ui/tokens/preset` — Tailwind v3 preset
- `@talon-ui/tokens/json` — raw JSON

The CSS variables under `:root` flip automatically in `[data-theme="dark"]` or `.dark` containers.

**Source of truth:** `packages/tokens/src/`. Skill assets in `skills/talon-ui/assets/` are reverse-symlinks; do not edit them directly.
