# Talon Pilot UI Skill

```
skills/talon-pilot-ui/
├── SKILL.md                       ← entry point (read first)
├── references/
│   ├── design.md                  ← prose spec (rules, do/don't, anatomy)
│   └── ui-kit.html                ← visual source of truth
├── assets/                        ← runtime contract (copy into target project)
│   ├── tokens.css                 ← single source of truth (CSS vars)
│   ├── tokens.json                ← platform-agnostic export
│   ├── tailwind.v3.config.js      ← Tailwind v3 config
│   └── tailwind.v4.css            ← Tailwind v4 @theme inline
└── examples/                      ← minimal reference implementations
    ├── Button.tsx
    ├── Button.vue
    ├── Tag.tsx
    ├── setup-react-v4.md
    └── setup-vue-v3.md
```

Read `SKILL.md` for the procedural rules. References stay in `references/` and `assets/`; load them on demand.
