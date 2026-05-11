/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { execSync } from 'node:child_process';
import { existsSync, statSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pkg = resolve(here, '..');
const input = resolve(pkg, 'src/styles/react.css');
const out = resolve(pkg, 'dist/styles.css');

if (!existsSync(dirname(out))) mkdirSync(dirname(out), { recursive: true });

// Prepend tokens.css verbatim so non-Tailwind consumers get the CSS vars without a second import.
const tokensCss = readFileSync(resolve(pkg, '../tokens/src/tokens.css'), 'utf8');
const inputCss = readFileSync(input, 'utf8');
const tmp = resolve(pkg, '.tmp/react.entry.css');
mkdirSync(dirname(tmp), { recursive: true });

// Strip any '@import "@talon-ui/tokens/css"' from the entry css since we inlined tokens manually.
const inputWithoutImport = inputCss.replace(/^@import\s+["'][^"']*tokens\/css["'];?\s*$/m, '');

writeFileSync(tmp, `${tokensCss}\n${inputWithoutImport}\n`);

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
