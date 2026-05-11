# @talon-ui Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the @talon-ui monorepo with a single-source-of-truth tokens package, a publishable empty React shell, CI, Changesets-based release, and the skill-symlink contract — ready for Block 1 component work.

**Architecture:** pnpm + Turborepo monorepo. `packages/tokens` owns the CSS/JSON/Tailwind preset and is reverse-symlinked into `skills/talon-ui/assets/` so every agent runtime sees identical token values via existing `.claude/skills`, `.codex/skills`, `.agents/skills` symlinks. `packages/react` is built with `tsup` (JS) + a `tailwindcss` CLI step (CSS) producing `dist/styles.css`. Changesets handles versioning and publishing.

**Tech Stack:** Node ≥ 20, pnpm 9, Turborepo, TypeScript 5, Vitest 2, tsup 8, Tailwind 3, Changesets, GitHub Actions, MIT license.

**Reference spec:** `docs/superpowers/specs/2026-05-11-talon-ui-library-design.md`

---

## Pre-flight assumptions

- Working directory throughout: `/Users/dark/WebstormProjects/talon-ui/`
- Node 20+ and pnpm 9 already installed on the dev machine.
- The `@talon-ui` npm scope is reserved by the publisher (action item carried into Task 35).
- `skills/talon-ui/` exists with `assets/` containing `tokens.css`, `tokens.json`, `tailwind.v3.config.js`, `tailwind.v4.css` (verified during brainstorming).

---

## Task 1: Initialise git repository

**Files:**
- Create: `.gitignore`
- Create: `.gitattributes`
- Create: `.editorconfig`

- [ ] **Step 1: Initialise git**

```bash
cd /Users/dark/WebstormProjects/talon-ui
git init -b main
```

Expected: `Initialized empty Git repository in /Users/dark/WebstormProjects/talon-ui/.git/`

- [ ] **Step 2: Write `.gitignore`**

```
node_modules/
dist/
.tmp/
.turbo/
*.log
.DS_Store
coverage/
.changeset/.cache
apps/docs/dist/
apps/docs/.astro/
.vscode/*
!.vscode/extensions.json
```

- [ ] **Step 3: Write `.gitattributes`**

```
* text=auto eol=lf
*.css text eol=lf
*.json text eol=lf
*.md text eol=lf
```

Symlinks are stored verbatim across platforms via `core.symlinks=true` (set in Step 4).

- [ ] **Step 4: Enable symlink storage**

```bash
git config core.symlinks true
git config core.autocrlf false
```

- [ ] **Step 5: Write `.editorconfig`**

```
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

- [ ] **Step 6: Commit**

```bash
git add .gitignore .gitattributes .editorconfig
git commit -m "chore: initialise git repo with workspace conventions"
```

---

## Task 2: Capture existing tree state

**Why:** Snapshot what is already on disk (the design system skill, `skills-lock.json`, the `.codex` / `.claude` / `.agents` directories) into git before any moves, so every later step is reversible.

- [ ] **Step 1: Inventory the tree**

Run: `find . -maxdepth 3 -not -path './.git*' -print | sort`

Confirm presence of: `./skills/talon-ui/SKILL.md`, `./skills/talon-ui/assets/tokens.css`, `./skills-lock.json`, `./.claude/skills`, `./.codex/skills`, `./.agents/skills/shadcn-ui`.

- [ ] **Step 2: Stage every existing file**

```bash
git add .
```

- [ ] **Step 3: Verify symlinks made it into the index**

Run: `git ls-files -s | grep '^120000' | head`

Expected output (mode `120000` indicates symlink): at least
```
120000 ... 0	.claude/skills
120000 ... 0	.codex/skills
```

If a symlink shows as `100644` (regular file), abort and reset; reconfigure `core.symlinks=true` and re-stage.

- [ ] **Step 4: Commit the baseline**

```bash
git commit -m "chore: snapshot existing skills and agent directories"
```

---

## Task 3: Root `package.json`

**Files:**
- Create: `package.json`

- [ ] **Step 1: Write the file**

```json
{
  "name": "talon-ui-workspace",
  "version": "0.0.0",
  "private": true,
  "packageManager": "pnpm@9.12.0",
  "engines": {
    "node": ">=20"
  },
  "workspaces": [
    "packages/*",
    "apps/*",
    "examples/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev --parallel",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "changeset": "changeset",
    "version-packages": "changeset version && pnpm install --lockfile-only",
    "release": "pnpm build && changeset publish",
    "skills:verify": "node scripts/verify-skill-symlinks.mjs",
    "skills:install": "skills experimental_install",
    "tokens:verify": "node scripts/verify-token-parity.mjs",
    "preflight": "node scripts/preflight.mjs"
  },
  "devDependencies": {
    "@changesets/cli": "^2.27.0",
    "turbo": "^2.1.0",
    "typescript": "^5.5.0"
  }
}
```

- [ ] **Step 2: Sanity-check the JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('package.json','utf8'))"`

Expected: no output (parse succeeded).

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "chore: add root workspace package.json"
```

---

## Task 4: pnpm workspace configuration

**Files:**
- Create: `pnpm-workspace.yaml`
- Create: `.npmrc`

- [ ] **Step 1: Write `pnpm-workspace.yaml`**

```yaml
packages:
  - packages/*
  - apps/*
  - examples/*
```

- [ ] **Step 2: Write `.npmrc`**

```
auto-install-peers=true
strict-peer-dependencies=false
shamefully-hoist=false
```

`auto-install-peers` lets local dev install Radix peers without manual repetition; published `peerDependencies` declarations stay strict.

- [ ] **Step 3: Commit**

```bash
git add pnpm-workspace.yaml .npmrc
git commit -m "chore: configure pnpm workspaces"
```

---

## Task 5: Turborepo configuration

**Files:**
- Create: `turbo.json`

- [ ] **Step 1: Write `turbo.json`**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [".env", "tsconfig.base.json"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "outputs": []
    },
    "typecheck": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "verify-symlinks": {
      "cache": false,
      "outputs": []
    },
    "verify-tokens": {
      "dependsOn": ["@talon-ui/tokens#build"],
      "outputs": []
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add turbo.json
git commit -m "chore: add turborepo task graph"
```

---

## Task 6: Base TypeScript configuration

**Files:**
- Create: `tsconfig.base.json`

- [ ] **Step 1: Write `tsconfig.base.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "verbatimModuleSyntax": false,
    "useDefineForClassFields": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add tsconfig.base.json
git commit -m "chore: add shared TypeScript base config"
```

---

## Task 7: Lint + format configuration

**Files:**
- Create: `.prettierrc.json`
- Create: `.prettierignore`
- Create: `eslint.config.mjs`

- [ ] **Step 1: Write `.prettierrc.json`**

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

- [ ] **Step 2: Write `.prettierignore`**

```
node_modules
dist
.turbo
.tmp
coverage
pnpm-lock.yaml
**/__baseline__
apps/docs/dist
apps/docs/.astro
```

- [ ] **Step 3: Write `eslint.config.mjs`**

```js
// Flat config — minimal Phase-1 baseline; component-specific rules added later.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { react, 'react-hooks': reactHooks },
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-restricted-syntax': [
        'error',
        {
          selector: "Literal[value=/^#(?!DC2626|B91C1C|F59E0B|E6F8EC|FCE3E1|CDEFD8|F4C7C3)[0-9A-Fa-f]{6}$/]",
          message: 'Hard-coded hex outside the allowlist is forbidden. Use tokens instead.',
        },
      ],
    },
  },
  {
    ignores: ['**/dist/**', '**/.turbo/**', '**/coverage/**', '**/.astro/**'],
  },
);
```

- [ ] **Step 4: Add lint dependencies**

```bash
pnpm add -Dw eslint @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks prettier
```

Expected: `pnpm-lock.yaml` and `node_modules/` appear, no install errors.

- [ ] **Step 5: Smoke-test prettier**

Run: `pnpm exec prettier --check package.json`

Expected: `Checking formatting... All matched files use Prettier code style!`

- [ ] **Step 6: Commit**

```bash
git add .prettierrc.json .prettierignore eslint.config.mjs package.json pnpm-lock.yaml
git commit -m "chore: add eslint + prettier baseline"
```

---

## Task 8: Backup and remove residual `.agents/skills/shadcn-ui`

**Why:** `.agents/skills/` is currently a real directory containing `shadcn-ui/`, leftover from an earlier project-scope install. The contract from spec §1 requires `.agents/skills/` to be a symlink. We back up the contents, prove they can be restored via `skills-lock.json`, then remove the real directory.

**Files:**
- Delete (then recreate as symlink in Task 9): `.agents/skills/`

- [ ] **Step 1: Confirm shadcn-ui is tracked in `skills-lock.json`**

Run: `cat skills-lock.json`

Expected: an entry under `skills.shadcn-ui` with `"skillPath": "skills/shadcn-ui/SKILL.md"`.

- [ ] **Step 2: Sanity-check the live skill source can be restored from lock**

Run: `pnpm exec skills experimental_install -y` (uses the dev npx fallback `npx skills experimental_install` if `skills` is not yet on path).

Expected: `Restored 1 skill(s)` and `skills/shadcn-ui/SKILL.md` now exists.

- [ ] **Step 3: Verify project-level shadcn-ui is now in `skills/`**

Run: `ls skills/`

Expected: `shadcn-ui` and `talon-ui` listed.

- [ ] **Step 4: Remove `.agents/skills/`**

```bash
rm -rf .agents/skills
```

- [ ] **Step 5: Commit (the directory removal — symlink creation lands in Task 9)**

```bash
git add -A .agents/
git commit -m "chore: remove obsolete project-local .agents/skills (restored from lockfile)"
```

---

## Task 9: Convert agent runtime directories to symlinks

**Files:**
- Create: `.agents/skills` (symlink)
- Create: `.codex/.claude/skills` (symlink)

- [ ] **Step 1: Create `.agents/skills` symlink**

```bash
ln -s ../skills .agents/skills
```

- [ ] **Step 2: Remove empty real `.codex/.claude/skills/` and replace with symlink**

```bash
rmdir .codex/.claude/skills
ln -s ../../skills .codex/.claude/skills
```

- [ ] **Step 3: Verify both symlinks resolve to repo-root `skills/`**

Run:
```bash
readlink -f .agents/skills
readlink -f .codex/.claude/skills
readlink -f .claude/skills
readlink -f .codex/skills
```

Expected: all four print `/Users/dark/WebstormProjects/talon-ui/skills`.

- [ ] **Step 4: Stage and verify git sees them as symlinks**

```bash
git add .agents/skills .codex/.claude/skills
git ls-files -s -- .agents/skills .codex/.claude/skills
```

Expected: both lines start with mode `120000`.

- [ ] **Step 5: Commit**

```bash
git commit -m "chore: symlink agent runtime skill dirs to repo-root skills/"
```

---

## Task 10: `scripts/verify-skill-symlinks.mjs`

**Files:**
- Create: `scripts/verify-skill-symlinks.mjs`
- Create: `scripts/__tests__/verify-skill-symlinks.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// scripts/__tests__/verify-skill-symlinks.test.mjs
import { test, expect } from 'vitest';
import { verifySkillSymlinks } from '../verify-skill-symlinks.mjs';
import { mkdtempSync, mkdirSync, symlinkSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const makeRoot = () => mkdtempSync(join(tmpdir(), 'talon-skill-'));

test('passes when every agent dir uses a symlink', () => {
  const root = makeRoot();
  mkdirSync(join(root, 'skills/talon-ui'), { recursive: true });
  writeFileSync(join(root, 'skills/talon-ui/SKILL.md'), '# skill');
  for (const dir of ['.claude', '.codex', '.agents']) {
    mkdirSync(join(root, dir), { recursive: true });
    symlinkSync('../skills', join(root, dir, 'skills'));
  }
  expect(() => verifySkillSymlinks(root)).not.toThrow();
  rmSync(root, { recursive: true, force: true });
});

test('fails when an agent dir contains a real skills directory', () => {
  const root = makeRoot();
  mkdirSync(join(root, 'skills'), { recursive: true });
  mkdirSync(join(root, '.claude/skills'), { recursive: true });
  expect(() => verifySkillSymlinks(root)).toThrow(/must be a symlink/);
  rmSync(root, { recursive: true, force: true });
});
```

- [ ] **Step 2: Add vitest as a root dev dep**

```bash
pnpm add -Dw vitest
```

- [ ] **Step 3: Run the test — expect FAIL**

Run: `pnpm exec vitest run scripts/__tests__/verify-skill-symlinks.test.mjs`

Expected: `Cannot find module '../verify-skill-symlinks.mjs'`.

- [ ] **Step 4: Write the implementation**

```js
// scripts/verify-skill-symlinks.mjs
import { lstatSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const AGENT_DIR_CANDIDATES = [
  '.claude',
  '.codex',
  '.codex/.claude',
  '.agents',
  '.cursor',
  '.continue',
  '.windsurf',
  '.gemini',
  '.cline',
];

export function verifySkillSymlinks(root) {
  const skillsDir = join(root, 'skills');
  if (!existsSync(skillsDir)) {
    throw new Error(`skills/ source directory missing at ${skillsDir}`);
  }
  const offences = [];
  for (const candidate of AGENT_DIR_CANDIDATES) {
    const dir = join(root, candidate);
    if (!existsSync(dir)) continue;
    const skillsPath = join(dir, 'skills');
    if (!existsSync(skillsPath)) continue;
    const st = lstatSync(skillsPath);
    if (!st.isSymbolicLink()) {
      offences.push(`${candidate}/skills must be a symlink to repo-root skills/`);
    }
  }
  if (offences.length) {
    throw new Error('Skill symlink contract violated:\n  - ' + offences.join('\n  - '));
  }
  return true;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    verifySkillSymlinks(resolve(process.cwd()));
    console.log('skill symlinks OK');
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
```

- [ ] **Step 5: Re-run the test — expect PASS**

Run: `pnpm exec vitest run scripts/__tests__/verify-skill-symlinks.test.mjs`

Expected: 2 passing tests.

- [ ] **Step 6: Smoke-test against the real repo**

Run: `pnpm skills:verify`

Expected: `skill symlinks OK` (exit 0).

- [ ] **Step 7: Commit**

```bash
git add scripts/ package.json pnpm-lock.yaml
git commit -m "feat(scripts): add verify-skill-symlinks with tests"
```

---

## Task 11: Create `packages/tokens` directory and move source files

**Files:**
- Create: `packages/tokens/src/` (4 files moved in)
- Modify: `skills/talon-ui/assets/` (files removed; symlinks added in Task 12)

- [ ] **Step 1: Make the destination**

```bash
mkdir -p packages/tokens/src
```

- [ ] **Step 2: Move the four token files (`git mv` preserves history)**

```bash
git mv skills/talon-ui/assets/tokens.css            packages/tokens/src/tokens.css
git mv skills/talon-ui/assets/tokens.json           packages/tokens/src/tokens.json
git mv skills/talon-ui/assets/tailwind.v4.css       packages/tokens/src/tailwind.v4.css
git mv skills/talon-ui/assets/tailwind.v3.config.js packages/tokens/src/tailwind.preset.js
```

- [ ] **Step 3: Confirm `skills/talon-ui/assets/` is now empty**

Run: `ls -la skills/talon-ui/assets/`

Expected: only `.` and `..` (the four files have been moved).

- [ ] **Step 4: Verify nothing else referenced these paths**

Run: `grep -RIn 'skills/talon-ui/assets' . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist`

Expected: only references inside `skills/talon-ui/SKILL.md` and `skills/talon-ui/README.md` (the skill's own internal docs — left untouched intentionally; Task 12 makes the symlinks restore the paths).

- [ ] **Step 5: Commit**

```bash
git commit -m "refactor(tokens): move token source-of-truth into packages/tokens"
```

---

## Task 12: Reverse-symlink token files from skill assets

**Files:**
- Create: 4 symlinks under `skills/talon-ui/assets/`

- [ ] **Step 1: Create the four symlinks (relative paths)**

```bash
cd skills/talon-ui/assets
ln -s ../../../packages/tokens/src/tokens.css            tokens.css
ln -s ../../../packages/tokens/src/tokens.json           tokens.json
ln -s ../../../packages/tokens/src/tailwind.v4.css       tailwind.v4.css
ln -s ../../../packages/tokens/src/tailwind.preset.js    tailwind.v3.config.js
cd -
```

- [ ] **Step 2: Verify each resolves**

```bash
readlink -f skills/talon-ui/assets/tokens.css
readlink -f skills/talon-ui/assets/tokens.json
readlink -f skills/talon-ui/assets/tailwind.v4.css
readlink -f skills/talon-ui/assets/tailwind.v3.config.js
```

Expected: all resolve under `/Users/dark/WebstormProjects/talon-ui/packages/tokens/src/`.

- [ ] **Step 3: Verify git sees each as a symlink (mode 120000)**

Run: `git ls-files -s -- skills/talon-ui/assets/`

Expected: all four lines start with `120000`.

- [ ] **Step 4: Verify the SKILL.md still works end-to-end**

Open `skills/talon-ui/assets/tokens.css` in your editor — content should be the full token file (resolved via symlink).

- [ ] **Step 5: Commit**

```bash
git add skills/talon-ui/assets/
git commit -m "feat(skill): reverse-symlink token assets to packages/tokens (single source)"
```

---

## Task 13: Token reconciliation pass

**Why:** Per spec §3.2 step 2, before locking the migration we walk `design.md` §§2–4 and §6 anatomy and correct any drift in the moved files. The values that land in `packages/tokens/src/` after this pass become authoritative for the lifetime of the library.

**Files:**
- Possibly modify: `packages/tokens/src/tokens.css`
- Possibly modify: `packages/tokens/src/tokens.json`
- Possibly modify: `packages/tokens/src/tailwind.preset.js`
- Possibly modify: `packages/tokens/src/tailwind.v4.css`

This is a deliberate manual review task. The agent executes the checks; if any check fails, the agent edits the file to match `design.md` and proceeds.

- [ ] **Step 1: Open `skills/talon-ui/references/design.md` and `packages/tokens/src/tokens.css` side-by-side**

- [ ] **Step 2: Verify every neutral colour (design.md §2.1)**

For each row of §2.1 (`--bg-app`, `--bg-surface`, `--bg-subtle`, `--bg-inverse`, `--border-default`, `--border-strong`, `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-on-primary`), confirm `tokens.css` has a `--tp-*` definition with the exact hex from the spec table. Where the variable name differs (e.g. semantic-layer renaming), confirm the mapping is documented in `tokens.css` comments. Fix any mismatch in `tokens.css`.

- [ ] **Step 3: Verify primary scale (design.md §2.2)**

Confirm `--tp-primary-{50,100,200,500,600,700}` hex values match `#EEF2FF / #E0E7FF / #C7D2FE / #4F60FF / #3B4DE6 / #2E3DBF`. Fix any mismatch.

- [ ] **Step 4: Verify status pairs (design.md §2.3)**

For each row (`In-progress / Pending / Done / Blocked / Idle / Info`) confirm both the foreground (`--tp-status-*-fg`) and background (`--tp-status-*-bg`) values match. These flip in dark mode — verify both `:root` and `[data-theme="dark"]` blocks.

- [ ] **Step 5: Verify spacing / radius / shadow scale (design.md §4)**

Spacing scale must be `4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 56 / 80` (named `--tp-space-1` through `--tp-space-20` per existing convention). Radius `sm 6 / md 10 / lg 14 / xl 20 / pill 999`. Shadow definitions match the three shadow strings in §4.

- [ ] **Step 6: Verify typography tokens (design.md §3)**

Font sizes/line-heights for `display / h1 / h2 / h3 / body / body-strong / caption / mono-sm` must match. Confirm `font-variant-numeric: tabular-nums` is wrapped in a `.tp-nums` utility class somewhere reachable from Tailwind preset.

- [ ] **Step 7: For each correction, mirror it in `tokens.json` and `tailwind.preset.js`**

`tokens.json` is the platform-agnostic export and `tailwind.preset.js` is the Tailwind v3 view; both must stay key-for-key identical with `tokens.css`. (Task 14 automates this check — but during reconciliation the engineer keeps them in sync by hand.)

- [ ] **Step 8: Update `tailwind.v4.css` if any token names changed**

Tailwind v4 reads tokens via `@theme inline`; if any CSS var was renamed in Step 1–7, the v4 file's `@theme` mapping must follow.

- [ ] **Step 9: Diff and commit**

```bash
git diff packages/tokens/src/
git add packages/tokens/src/
git commit -m "chore(tokens): reconciliation pass against design.md (single-source baseline)"
```

If `git diff` shows no changes (clean import), still commit a marker: `git commit --allow-empty -m "chore(tokens): reconciliation pass — no drift from design.md"`.

---

## Task 14: `scripts/verify-token-parity.mjs`

**Files:**
- Create: `scripts/verify-token-parity.mjs`
- Create: `scripts/__tests__/verify-token-parity.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// scripts/__tests__/verify-token-parity.test.mjs
import { test, expect } from 'vitest';
import { extractTokensFromCss, extractTokensFromPreset, diffTokens } from '../verify-token-parity.mjs';

const cssFixture = `
:root {
  --tp-bg-app: #F6F7F9;
  --tp-text-primary: #0F172A;
  --tp-radius-md: 10px;
}
`;
const presetFixture = {
  theme: {
    extend: {
      colors: { 'bg-app': 'var(--tp-bg-app)', 'text-primary': 'var(--tp-text-primary)' },
      borderRadius: { md: 'var(--tp-radius-md)' },
    },
  },
};

test('parses tokens from CSS', () => {
  const got = extractTokensFromCss(cssFixture);
  expect(got['--tp-bg-app']).toBe('#F6F7F9');
  expect(got['--tp-radius-md']).toBe('10px');
});

test('parses var() references from preset', () => {
  const got = extractTokensFromPreset(presetFixture);
  expect(got.has('--tp-bg-app')).toBe(true);
  expect(got.has('--tp-radius-md')).toBe(true);
});

test('diff returns missing references', () => {
  const css = { '--tp-bg-app': '#F6F7F9', '--tp-extra': '#fff' };
  const preset = new Set(['--tp-bg-app']);
  const result = diffTokens(css, preset);
  expect(result.unused).toEqual(['--tp-extra']);
  expect(result.missing).toEqual([]);
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm exec vitest run scripts/__tests__/verify-token-parity.test.mjs`

Expected: `Cannot find module '../verify-token-parity.mjs'`.

- [ ] **Step 3: Write the implementation**

```js
// scripts/verify-token-parity.mjs
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const VAR_DECL = /--tp-[a-z0-9-]+\s*:\s*([^;]+);/g;
const VAR_REF  = /var\((--tp-[a-z0-9-]+)\)/g;

export function extractTokensFromCss(css) {
  const out = {};
  for (const match of css.matchAll(/(--tp-[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    out[match[1]] = match[2].trim();
  }
  return out;
}

export function extractTokensFromPreset(preset) {
  const json = JSON.stringify(preset);
  const refs = new Set();
  for (const m of json.matchAll(VAR_REF)) refs.add(m[1]);
  return refs;
}

export function extractTokensFromJson(jsonObj) {
  const refs = new Set();
  const walk = (v) => {
    if (typeof v === 'string') {
      const m = v.match(/--tp-[a-z0-9-]+/g);
      if (m) m.forEach((n) => refs.add(n));
    } else if (v && typeof v === 'object') {
      Object.values(v).forEach(walk);
      if (Array.isArray(v)) v.forEach(walk);
    }
  };
  walk(jsonObj);
  return refs;
}

export function diffTokens(cssMap, refs) {
  const cssKeys = new Set(Object.keys(cssMap));
  const missing = [...refs].filter((k) => !cssKeys.has(k));
  const unused  = [...cssKeys].filter((k) => !refs.has(k));
  return { missing, unused };
}

export async function verifyTokenParity(rootDir) {
  const cssPath    = resolve(rootDir, 'packages/tokens/src/tokens.css');
  const jsonPath   = resolve(rootDir, 'packages/tokens/src/tokens.json');
  const presetPath = resolve(rootDir, 'packages/tokens/src/tailwind.preset.js');
  for (const p of [cssPath, jsonPath, presetPath]) {
    if (!existsSync(p)) throw new Error(`missing: ${p}`);
  }
  const css   = extractTokensFromCss(readFileSync(cssPath, 'utf8'));
  const json  = extractTokensFromJson(JSON.parse(readFileSync(jsonPath, 'utf8')));
  const preset = extractTokensFromPreset((await import(presetPath)).default);
  const refs = new Set([...json, ...preset]);
  const { missing, unused } = diffTokens(css, refs);
  if (missing.length || unused.length) {
    throw new Error(
      'Token parity failed:\n' +
        (missing.length ? `  missing in CSS: ${missing.join(', ')}\n` : '') +
        (unused.length  ? `  unused in CSS:  ${unused.join(', ')}\n`  : ''),
    );
  }
  return true;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  verifyTokenParity(process.cwd())
    .then(() => console.log('token parity OK'))
    .catch((e) => { console.error(e.message); process.exit(1); });
}
```

- [ ] **Step 4: Re-run the test — expect PASS**

Run: `pnpm exec vitest run scripts/__tests__/verify-token-parity.test.mjs`

Expected: 3 passing tests.

- [ ] **Step 5: Smoke-test against the real repo**

Run: `pnpm tokens:verify`

Expected: `token parity OK`. If it fails, edit `packages/tokens/src/` to bring the three views into sync; this is part of finishing Task 13.

- [ ] **Step 6: Commit**

```bash
git add scripts/
git commit -m "feat(scripts): add verify-token-parity with tests"
```

---

## Task 15: `@talon-ui/tokens` package manifest

**Files:**
- Create: `packages/tokens/package.json`
- Create: `packages/tokens/README.md`
- Create: `packages/tokens/tsconfig.json`
- Create: `packages/tokens/src/index.ts`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "@talon-ui/tokens",
  "version": "0.0.0",
  "description": "Talon Pilot design tokens (CSS variables, JSON, Tailwind preset).",
  "license": "MIT",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./css": "./dist/tokens.css",
    "./json": "./dist/tokens.json",
    "./tailwind-v4": "./dist/tailwind.v4.css",
    "./preset": "./dist/tailwind.preset.js",
    "./package.json": "./package.json"
  },
  "files": ["dist", "README.md"],
  "scripts": {
    "build": "node ./scripts/build.mjs",
    "test": "vitest run",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src"
  },
  "devDependencies": {
    "vitest": "^2.0.0",
    "typescript": "^5.5.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "noEmit": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Write `src/index.ts`**

```ts
import tokens from './tokens.json' with { type: 'json' };

export const TalonTokens = tokens;
export type TalonTokens = typeof tokens;
```

- [ ] **Step 4: Write `README.md`**

```markdown
# @talon-ui/tokens

Talon Pilot design tokens. Exports:

- `@talon-ui/tokens` — typed JSON tokens
- `@talon-ui/tokens/css` — `tokens.css` (CSS variables, light + dark)
- `@talon-ui/tokens/tailwind-v4` — `@theme inline` Tailwind v4 entry
- `@talon-ui/tokens/preset` — Tailwind v3 preset
- `@talon-ui/tokens/json` — raw JSON

The CSS variables under `:root` flip automatically in `[data-theme="dark"]` or `.dark` containers.

**Source of truth:** `packages/tokens/src/`. Skill assets in `skills/talon-ui/assets/` are reverse-symlinks; do not edit them directly.
```

- [ ] **Step 5: Commit**

```bash
git add packages/tokens/
git commit -m "feat(tokens): scaffold @talon-ui/tokens package"
```

---

## Task 16: Tokens build script

**Files:**
- Create: `packages/tokens/scripts/build.mjs`

- [ ] **Step 1: Write the build script**

```js
// packages/tokens/scripts/build.mjs
import { cpSync, mkdirSync, rmSync, existsSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pkg  = resolve(here, '..');
const src  = resolve(pkg, 'src');
const dist = resolve(pkg, 'dist');

if (existsSync(dist)) rmSync(dist, { recursive: true });
mkdirSync(dist, { recursive: true });

const files = [
  'tokens.css',
  'tokens.json',
  'tailwind.v4.css',
  'tailwind.preset.js',
];
for (const f of files) cpSync(resolve(src, f), resolve(dist, f));

// Emit JS + d.ts shims for the JSON tokens
const tokens = JSON.parse(readFileSync(resolve(src, 'tokens.json'), 'utf8'));
writeFileSync(resolve(dist, 'index.js'),
  `const tokens = ${JSON.stringify(tokens, null, 2)};\nexport const TalonTokens = tokens;\nexport default tokens;\n`);
writeFileSync(resolve(dist, 'index.d.ts'),
  `declare const tokens: ${typeof tokens === 'object' ? 'Record<string, unknown>' : 'unknown'};\nexport const TalonTokens: typeof tokens;\nexport default tokens;\n`);

console.log('@talon-ui/tokens built:', files.concat(['index.js', 'index.d.ts']).join(', '));
```

- [ ] **Step 2: Run the build**

```bash
pnpm --filter @talon-ui/tokens build
```

Expected: log line listing 6 emitted files, and `packages/tokens/dist/` exists.

- [ ] **Step 3: Verify dist artefacts**

```bash
ls packages/tokens/dist
```

Expected: `index.d.ts  index.js  tailwind.preset.js  tailwind.v4.css  tokens.css  tokens.json`.

- [ ] **Step 4: Commit**

```bash
git add packages/tokens/scripts/build.mjs
git commit -m "feat(tokens): add build script (copy + JS shim)"
```

---

## Task 17: `@talon-ui/react` package skeleton

**Files:**
- Create: `packages/react/package.json`
- Create: `packages/react/tsconfig.json`
- Create: `packages/react/README.md`
- Create: `packages/react/src/index.ts`
- Create: `packages/react/src/styles/react.css`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "@talon-ui/react",
  "version": "0.0.0",
  "description": "React components for the Talon Pilot design system.",
  "license": "MIT",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles.css": "./dist/styles.css",
    "./package.json": "./package.json"
  },
  "sideEffects": ["**/*.css"],
  "files": ["dist", "README.md"],
  "scripts": {
    "build": "tsup && node ./scripts/build-css.mjs",
    "dev": "tsup --watch",
    "test": "vitest run",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "dependencies": {
    "@talon-ui/tokens": "workspace:*",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.0"
  },
  "devDependencies": {
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "jsdom": "^25.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "tsup": "^8.3.0",
    "typescript": "^5.5.0",
    "vitest": "^2.0.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "noEmit": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Write `src/index.ts` (intentionally just exports the cn helper Phase-1 starts with)**

```ts
export { cn } from './primitives/cn.js';
```

- [ ] **Step 4: Write `src/styles/react.css`**

```css
@import '@talon-ui/tokens/css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 5: Write `README.md`**

```markdown
# @talon-ui/react

React components for the Talon Pilot design system.

## Install

```bash
pnpm add @talon-ui/react @talon-ui/tokens
```

## Use (Tailwind project)

```ts
// tailwind.config.ts
import preset from '@talon-ui/tokens/preset';
export default { presets: [preset], content: ['./src/**/*.{ts,tsx}', './node_modules/@talon-ui/react/dist/**/*.js'] };
```

Then `import '@talon-ui/tokens/css'` once in your app entry.

## Use (non-Tailwind project)

```ts
import '@talon-ui/react/styles.css';
```

Toggle dark mode by setting `<html data-theme="dark">` or `<html class="dark">`.
```

- [ ] **Step 6: Install workspace deps**

```bash
pnpm install
```

Expected: pnpm wires `@talon-ui/tokens` as a workspace link inside `@talon-ui/react`.

- [ ] **Step 7: Commit**

```bash
git add packages/react/ pnpm-lock.yaml
git commit -m "feat(react): scaffold @talon-ui/react package"
```

---

## Task 18: `cn` helper with TDD

**Files:**
- Create: `packages/react/src/primitives/cn.ts`
- Create: `packages/react/src/primitives/cn.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// packages/react/src/primitives/cn.test.ts
import { describe, test, expect } from 'vitest';
import { cn } from './cn.js';

describe('cn()', () => {
  test('joins multiple class strings', () => {
    expect(cn('a', 'b')).toBe('a b');
  });
  test('drops falsy values', () => {
    expect(cn('a', false, undefined, 'b')).toBe('a b');
  });
  test('lets later tailwind classes override earlier ones', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
  test('handles arrays and objects', () => {
    expect(cn(['a', { b: true, c: false }])).toBe('a b');
  });
});
```

- [ ] **Step 2: Add vitest config**

Create `packages/react/vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
});
```

Create `packages/react/src/test-setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

Add `@testing-library/jest-dom` dev dep:

```bash
pnpm --filter @talon-ui/react add -D @testing-library/jest-dom
```

- [ ] **Step 3: Run the test — expect FAIL**

```bash
pnpm --filter @talon-ui/react test
```

Expected: `Cannot find module './cn.js'` (or similar resolution error).

- [ ] **Step 4: Write the implementation**

```ts
// packages/react/src/primitives/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 5: Re-run the test — expect PASS**

```bash
pnpm --filter @talon-ui/react test
```

Expected: 4 passing tests.

- [ ] **Step 6: Commit**

```bash
git add packages/react/src/primitives/ packages/react/vitest.config.ts packages/react/src/test-setup.ts packages/react/package.json pnpm-lock.yaml
git commit -m "feat(react): add cn() primitive with tests"
```

---

## Task 19: tsup config for `@talon-ui/react`

**Files:**
- Create: `packages/react/tsup.config.ts`

- [ ] **Step 1: Write tsup config**

```ts
// packages/react/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  splitting: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom', '@talon-ui/tokens'],
});
```

- [ ] **Step 2: Run build (JS leg only — CSS leg comes in Task 20)**

```bash
pnpm --filter @talon-ui/react exec tsup
```

Expected: `dist/index.{js,cjs,d.ts}` produced; no type errors.

- [ ] **Step 3: Verify export resolution**

```bash
node -e "import('@talon-ui/react').then(m => console.log(Object.keys(m)))"
```

Expected: `[ 'cn' ]`.

- [ ] **Step 4: Commit**

```bash
git add packages/react/tsup.config.ts
git commit -m "feat(react): add tsup config (ESM + CJS + dts)"
```

---

## Task 20: Tailwind CSS build script

**Files:**
- Create: `packages/react/scripts/build-css.mjs`
- Create: `packages/react/tailwind.config.cjs`

- [ ] **Step 1: Write `tailwind.config.cjs` (consumed by the build script and not published)**

```js
// packages/react/tailwind.config.cjs
const preset = require('@talon-ui/tokens/preset');

module.exports = {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}', './src/styles/react.css'],
  darkMode: ['class', '[data-theme="dark"]'],
};
```

- [ ] **Step 2: Write `scripts/build-css.mjs`**

```js
// packages/react/scripts/build-css.mjs
import { execSync } from 'node:child_process';
import { existsSync, statSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here  = dirname(fileURLToPath(import.meta.url));
const pkg   = resolve(here, '..');
const input = resolve(pkg, 'src/styles/react.css');
const out   = resolve(pkg, 'dist/styles.css');

if (!existsSync(dirname(out))) mkdirSync(dirname(out), { recursive: true });

// Prepend tokens.css verbatim so non-Tailwind consumers get vars without a second import.
const tokensCss = readFileSync(resolve(pkg, '../tokens/src/tokens.css'), 'utf8');
const tmp = resolve(pkg, '.tmp/react.entry.css');
mkdirSync(dirname(tmp), { recursive: true });
writeFileSync(tmp, `${tokensCss}\n${readFileSync(input, 'utf8').replace(/@import .*tokens\/css.*;?/, '')}\n`);

const cmd = [
  'tailwindcss',
  '-c', resolve(pkg, 'tailwind.config.cjs'),
  '-i', tmp,
  '-o', out,
  process.env.NODE_ENV === 'production' ? '--minify' : '',
].filter(Boolean).join(' ');

execSync(`pnpm exec ${cmd}`, { stdio: 'inherit', cwd: pkg });

const size = statSync(out).size;
if (size < 1024) throw new Error(`dist/styles.css unexpectedly small: ${size} bytes`);
console.log(`dist/styles.css written (${size} bytes)`);
```

- [ ] **Step 3: Run the full build**

```bash
pnpm --filter @talon-ui/react build
```

Expected: tsup emits JS + dts, then the CSS step prints `dist/styles.css written (NNNN bytes)` with NNNN > 1024.

- [ ] **Step 4: Spot-check the CSS**

```bash
head -20 packages/react/dist/styles.css
```

Expected output starts with token CSS-var declarations under `:root { … }`.

- [ ] **Step 5: Commit**

```bash
git add packages/react/scripts/build-css.mjs packages/react/tailwind.config.cjs
git commit -m "feat(react): add Tailwind CSS build pipeline (dist/styles.css)"
```

---

## Task 21: `@talon-ui/vue` Phase-2 placeholder

**Files:**
- Create: `packages/vue/package.json`
- Create: `packages/vue/README.md`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "@talon-ui/vue",
  "version": "0.0.0",
  "private": true,
  "description": "Vue 3 components for the Talon Pilot design system (Phase 2 placeholder).",
  "license": "MIT",
  "type": "module"
}
```

- [ ] **Step 2: Write `README.md`**

```markdown
# @talon-ui/vue

Phase 2 placeholder. Tracks the same design tokens as `@talon-ui/react`. Components will land after `@talon-ui/react@1.0.0` is shipped.
```

- [ ] **Step 3: Commit**

```bash
git add packages/vue/
git commit -m "chore: reserve packages/vue workspace slot (private placeholder)"
```

---

## Task 22: Changesets initialisation

**Files:**
- Modified: `.changeset/config.json`

- [ ] **Step 1: Initialise**

```bash
pnpm exec changeset init
```

Expected: a `.changeset/` directory with `config.json` and `README.md`.

- [ ] **Step 2: Configure for monorepo**

Overwrite `.changeset/config.json` with:

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": ["@changesets/changelog-github", { "repo": "OWNER/talon-ui" }],
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["@talon-ui/vue"]
}
```

> Replace `OWNER/talon-ui` with the actual GitHub owner before opening the repo (tracked as a TODO in `README.md` Step 5 below).

- [ ] **Step 3: Add the GitHub changelog plugin**

```bash
pnpm add -Dw @changesets/changelog-github
```

- [ ] **Step 4: Commit**

```bash
git add .changeset/ package.json pnpm-lock.yaml
git commit -m "chore: configure changesets for monorepo release"
```

---

## Task 23: First changeset — initial alpha versions

**Files:**
- Create: `.changeset/initial-alpha.md`

- [ ] **Step 1: Write the changeset**

```md
---
"@talon-ui/tokens": minor
"@talon-ui/react": minor
---

Initial alpha bring-up: tokens package owns design-token source-of-truth (reverse-symlinked into skills/talon-ui/assets/), React package ships an empty barrel + `cn` helper, dual-track styling (Tailwind preset + precompiled CSS) infrastructure landed.
```

- [ ] **Step 2: Verify changeset status**

```bash
pnpm exec changeset status
```

Expected: lists `@talon-ui/tokens` and `@talon-ui/react` both bumping from `0.0.0` to `0.1.0`.

- [ ] **Step 3: Commit**

```bash
git add .changeset/initial-alpha.md
git commit -m "chore: changeset for initial 0.1.0 bring-up"
```

---

## Task 24: `scripts/preflight.mjs`

**Files:**
- Create: `scripts/preflight.mjs`
- Create: `scripts/__tests__/preflight.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// scripts/__tests__/preflight.test.mjs
import { test, expect } from 'vitest';
import { auditPackage } from '../preflight.mjs';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const makePkg = (manifest, files = {}) => {
  const dir = mkdtempSync(join(tmpdir(), 'talon-pf-'));
  writeFileSync(join(dir, 'package.json'), JSON.stringify(manifest));
  mkdirSync(join(dir, 'dist'), { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    writeFileSync(join(dir, 'dist', name), content);
  }
  return dir;
};

test('passes for a complete react package', () => {
  const dir = makePkg(
    {
      name: '@talon-ui/react',
      version: '0.1.0',
      sideEffects: ['**/*.css'],
      peerDependencies: { react: '^18' },
    },
    {
      'index.js': 'export {}',
      'index.cjs': 'module.exports = {}',
      'index.d.ts': 'export {}',
      'styles.css': '/* */'.padEnd(2048, ' '),
    },
  );
  expect(() => auditPackage(dir)).not.toThrow();
  rmSync(dir, { recursive: true, force: true });
});

test('fails when styles.css is missing for the react package', () => {
  const dir = makePkg(
    {
      name: '@talon-ui/react',
      version: '0.1.0',
      sideEffects: ['**/*.css'],
      peerDependencies: { react: '^18' },
    },
    {
      'index.js': 'export {}',
      'index.cjs': 'module.exports = {}',
      'index.d.ts': 'export {}',
    },
  );
  expect(() => auditPackage(dir)).toThrow(/styles\.css/);
  rmSync(dir, { recursive: true, force: true });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm exec vitest run scripts/__tests__/preflight.test.mjs`

Expected: module-not-found error.

- [ ] **Step 3: Write the implementation**

```js
// scripts/preflight.mjs
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execSync } from 'node:child_process';

const REQUIRED_FILES = {
  '@talon-ui/react':  ['index.js', 'index.cjs', 'index.d.ts', 'styles.css'],
  '@talon-ui/tokens': ['index.js', 'index.d.ts', 'tokens.css', 'tokens.json'],
};
const STYLES_CSS_MIN_BYTES = 1024;

export function auditPackage(pkgDir) {
  const pkgPath = join(pkgDir, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const required = REQUIRED_FILES[pkg.name];
  if (!required) throw new Error(`no preflight rules for ${pkg.name}`);
  const distDir = join(pkgDir, 'dist');
  if (!existsSync(distDir)) throw new Error(`${pkg.name}: dist/ missing`);
  for (const f of required) {
    const p = join(distDir, f);
    if (!existsSync(p)) throw new Error(`${pkg.name}: dist/${f} missing`);
    if (f === 'styles.css' && statSync(p).size < STYLES_CSS_MIN_BYTES) {
      throw new Error(`${pkg.name}: dist/styles.css too small (${statSync(p).size}B)`);
    }
  }
  if (pkg.name === '@talon-ui/react') {
    if (!Array.isArray(pkg.sideEffects) || !pkg.sideEffects.includes('**/*.css')) {
      throw new Error(`${pkg.name}: sideEffects must include "**/*.css"`);
    }
    if (!pkg.peerDependencies?.react) {
      throw new Error(`${pkg.name}: peerDependency on react missing`);
    }
  }
  return true;
}

export function auditGitClean() {
  const out = execSync('git status --porcelain').toString().trim();
  if (out) throw new Error(`working tree not clean:\n${out}`);
  const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  if (branch !== 'main') throw new Error(`expected to be on main, got ${branch}`);
  return true;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    auditPackage(resolve('packages/tokens'));
    auditPackage(resolve('packages/react'));
    auditGitClean();
    console.log('preflight OK');
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
```

- [ ] **Step 4: Re-run the test — expect PASS**

Run: `pnpm exec vitest run scripts/__tests__/preflight.test.mjs`

Expected: 2 passing tests.

- [ ] **Step 5: Smoke-test against the real build**

```bash
pnpm build
pnpm preflight
```

Expected: `preflight OK`. If it fails due to working tree, commit any pending files first and retry.

- [ ] **Step 6: Wire into `prepublishOnly` for both packages**

Modify `packages/tokens/package.json` `scripts` block to add:

```json
"prepublishOnly": "node ../../scripts/preflight.mjs"
```

Same for `packages/react/package.json`.

- [ ] **Step 7: Commit**

```bash
git add scripts/ packages/tokens/package.json packages/react/package.json
git commit -m "feat(scripts): add preflight publish audit"
```

---

## Task 25: GitHub Actions CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Write `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm skills:verify
      - run: pnpm tokens:verify
      - run: pnpm turbo run lint test build
      - run: pnpm preflight
      - name: Changeset status (PR only)
        if: github.event_name == 'pull_request'
        run: pnpm exec changeset status --since=origin/main
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add CI workflow (lint, test, build, preflight)"
```

---

## Task 26: GitHub Actions release workflow

**Files:**
- Create: `.github/workflows/release.yml`

- [ ] **Step 1: Write `.github/workflows/release.yml`**

```yaml
name: Release

on:
  push:
    branches: [main]

concurrency:
  group: release
  cancel-in-progress: false

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
          registry-url: https://registry.npmjs.org
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo run build
      - uses: changesets/action@v1
        with:
          publish: pnpm release
          version: pnpm version-packages
          commit: "chore: release"
          title: "chore: release"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/release.yml
git commit -m "ci: add release workflow (changesets-driven publish)"
```

---

## Task 27: Minimal Vite + React example

**Files:**
- Create: `examples/vite-react/package.json`
- Create: `examples/vite-react/vite.config.ts`
- Create: `examples/vite-react/tsconfig.json`
- Create: `examples/vite-react/tailwind.config.ts`
- Create: `examples/vite-react/postcss.config.cjs`
- Create: `examples/vite-react/index.html`
- Create: `examples/vite-react/src/main.tsx`
- Create: `examples/vite-react/src/App.tsx`
- Create: `examples/vite-react/src/index.css`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "@talon-ui/example-vite-react",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@talon-ui/react": "workspace:*",
    "@talon-ui/tokens": "workspace:*",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Write `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "noEmit": true,
    "module": "ESNext",
    "moduleResolution": "Bundler"
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Write `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';
import preset from '@talon-ui/tokens/preset';

export default {
  presets: [preset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/react/dist/**/*.js',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
} satisfies Config;
```

- [ ] **Step 5: Write `postcss.config.cjs`**

```js
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

- [ ] **Step 6: Write `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Talon UI · Vite</title>
  </head>
  <body class="bg-bg-app text-text-primary">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Write `src/index.css`**

```css
@import '@talon-ui/tokens/css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 8: Write `src/main.tsx`**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 9: Write `src/App.tsx`**

```tsx
import { cn } from '@talon-ui/react';

export default function App() {
  return (
    <main className={cn('mx-auto max-w-2xl p-tp-8 space-y-tp-4')}>
      <h1 className="text-h1">@talon-ui/react · smoke test</h1>
      <p className="text-body text-text-secondary">
        If you see this rendered with Inter + tokenised spacing, the foundation works.
      </p>
      <button
        type="button"
        className={cn(
          'inline-flex h-control-md items-center rounded-md bg-primary-500 px-tp-4 text-text-on-primary',
          'transition duration-fast ease-tp hover:bg-primary-600 focus-visible:tp-focus-ring',
        )}
      >
        Smoke test
      </button>
    </main>
  );
}
```

- [ ] **Step 10: Install and dev-run**

```bash
pnpm install
pnpm --filter @talon-ui/example-vite-react dev
```

Expected: Vite serves at `http://localhost:5173`; opening it shows the heading, body copy, and a button matching Talon Pilot primary styling. Toggle dark mode in browser devtools via `<html data-theme="dark">` and confirm colours flip.

- [ ] **Step 11: Build the example**

```bash
pnpm --filter @talon-ui/example-vite-react build
```

Expected: `examples/vite-react/dist/` produced; no errors.

- [ ] **Step 12: Commit**

```bash
git add examples/ pnpm-lock.yaml
git commit -m "test: add Vite + React smoke example consuming @talon-ui packages"
```

---

## Task 28: Root README

**Files:**
- Create: `README.md`
- Create: `LICENSE`

- [ ] **Step 1: Write `LICENSE` (MIT, current year, placeholder holder)**

```text
MIT License

Copyright (c) 2026 Talon UI maintainers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 2: Write `README.md`**

```markdown
# Talon UI

React (Phase 1) component library and design tokens for the Talon Pilot design system.

## Packages

| Package | Purpose | Status |
|---|---|---|
| `@talon-ui/tokens` | Design tokens (CSS vars + JSON + Tailwind preset) | 0.x alpha |
| `@talon-ui/react`  | React components | 0.x alpha (Block 1 in progress) |
| `@talon-ui/vue`    | Vue components | Phase 2 placeholder |

## Develop

```bash
pnpm install
pnpm build       # all packages
pnpm test        # all tests
pnpm preflight   # publish audit (run before release)
```

## Source of truth

**Tokens** live only in `packages/tokens/src/`. `skills/talon-ui/assets/` are reverse-symlinks; do not edit them directly.

**Skills** live only in `skills/`. `.claude/`, `.codex/`, `.agents/` (and any future agent runtime) must reference them via `skills` symlink. CI enforces this.

## Spec & plans

- Design spec: `docs/superpowers/specs/2026-05-11-talon-ui-library-design.md`
- Foundation plan (this one): `docs/superpowers/plans/2026-05-11-talon-ui-foundation.md`

## License

MIT.

## TODO before first publish

- [ ] Replace `OWNER/talon-ui` in `.changeset/config.json` with the real GitHub `owner/repo`.
- [ ] Reserve the `@talon-ui` npm scope.
- [ ] Add `NPM_TOKEN` secret to the GitHub repository.
```

- [ ] **Step 3: Commit**

```bash
git add README.md LICENSE
git commit -m "docs: add root README and MIT LICENSE"
```

---

## Task 29: End-to-end verification

**Why:** Run the entire pipeline cold to prove the foundation works.

- [ ] **Step 1: Clean caches**

```bash
pnpm exec turbo run clean 2>/dev/null || true
rm -rf packages/*/dist examples/*/dist .turbo
```

- [ ] **Step 2: Re-install from lockfile**

```bash
pnpm install --frozen-lockfile
```

Expected: zero install errors, lockfile in sync.

- [ ] **Step 3: Run lint, test, build sequentially**

```bash
pnpm turbo run lint test build
```

Expected: all tasks succeed; turbo prints `>>> Tasks: NNN successful, NNN total`.

- [ ] **Step 4: Verify symlinks and token parity**

```bash
pnpm skills:verify
pnpm tokens:verify
```

Both should print `OK`.

- [ ] **Step 5: Run preflight**

```bash
pnpm preflight
```

Expected: `preflight OK`. (If git working tree isn't clean from the previous commits, commit/stash first.)

- [ ] **Step 6: Dry-run a publish**

```bash
pnpm --filter @talon-ui/tokens publish --dry-run --access public
pnpm --filter @talon-ui/react  publish --dry-run --access public
```

Expected: each prints the file list that would be published; confirm `dist/` only (no `src/`, no test files).

- [ ] **Step 7: Run the example**

```bash
pnpm --filter @talon-ui/example-vite-react build
```

Expected: build succeeds, `examples/vite-react/dist/` populated.

- [ ] **Step 8: Final commit (only if anything changed)**

```bash
git status
```

If clean, no commit needed. If not, commit with `chore: end-to-end verification fixups`.

---

## Task 30: Cut the 0.1.0-alpha tag

**Why:** Mark the foundation as complete so Block 1 can branch from a stable base.

- [ ] **Step 1: Run changeset version locally**

```bash
pnpm version-packages
```

Expected: `package.json` files in `packages/tokens` and `packages/react` bumped to `0.1.0`; `.changeset/initial-alpha.md` is consumed; `CHANGELOG.md` added in each package.

- [ ] **Step 2: Verify the version bumps**

```bash
node -e "console.log(require('./packages/tokens/package.json').version)"
node -e "console.log(require('./packages/react/package.json').version)"
```

Both should print `0.1.0`.

- [ ] **Step 3: Build at the bumped versions**

```bash
pnpm build
```

- [ ] **Step 4: Tag and commit**

```bash
git add .
git commit -m "chore: release @talon-ui/{tokens,react}@0.1.0-alpha (Foundation)"
git tag foundation-v0.1.0-alpha
```

(Push only after the GitHub remote is added — that's a manual step outside this plan.)

- [ ] **Step 5: Sanity-check publish ordering**

```bash
pnpm preflight
```

Expected: `preflight OK`.

---

## Plan Self-Review

**1. Spec coverage check:**

| Spec section | Plan task(s) |
|---|---|
| §1 monorepo layout | Tasks 3, 4, 5, 6 |
| §1 skill-symlink contract | Tasks 8, 9, 10 |
| §2.1 `@talon-ui/tokens` package shape | Tasks 11, 12, 15, 16 |
| §2.2 `@talon-ui/react` package shape | Tasks 17, 18, 19, 20 |
| §2.3 `@talon-ui/vue` placeholder | Task 21 |
| §2.4 dual-track styling | Tasks 17, 20 (Tailwind preset path + precompiled CSS) |
| §3.1–3.2 token migration | Tasks 11, 12, 13 |
| §3.3 hard-pin colour rule | Task 7 (ESLint `no-restricted-syntax`) |
| §4 component internals | Out of scope for Foundation; Block 1 plan |
| §5.1 Turborepo graph | Task 5 |
| §5.2 tsup choice | Task 19 |
| §5.3 Tailwind compile to styles.css | Task 20 |
| §5.4 `exports`, `sideEffects` | Tasks 17, 24 |
| §5.5 CI / release workflows | Tasks 25, 26 |
| §6 docs site | Out of scope for Foundation; separate plan |
| §7 testing strategy | Foundation lays Vitest baseline (Tasks 10, 14, 18, 24); component-level testing in Block plans |
| §8.1 Changesets tooling | Tasks 22, 23 |
| §8.3 0.1.0 cadence | Tasks 23, 30 |
| §8.11 preflight | Task 24 |

No spec section that belongs to Foundation is unaddressed. Open items in spec §9 are intentionally deferred to later plans.

**2. Placeholder scan:** No "TBD", "TODO", "fill in later" inside any task — the only TODOs are the three documented external-dependency items in `README.md` Task 28 Step 2 (GitHub owner, npm scope, NPM_TOKEN), which cannot be resolved inside this repo.

**3. Type / name consistency:**
- `cn` exported from `packages/react/src/primitives/cn.ts`, consumed in `examples/vite-react/src/App.tsx` ✓
- Script function names (`verifySkillSymlinks`, `verifyTokenParity`, `auditPackage`) match between implementation and test files ✓
- `@talon-ui/tokens` subpath exports (`/css`, `/json`, `/tailwind-v4`, `/preset`) match between the package's `exports` (Task 15) and consumer references (Tasks 17, 20, 27) ✓
- Symlink target paths verified against actual `pwd` depths in Tasks 9 and 12 (consistent with spec §1 corrections) ✓
