/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const update = process.argv.includes('--update');

const root = resolve(import.meta.dirname, '..');

const args = ['exec', 'playwright', 'test', '--config', 'playwright.config.ts'];
if (update) args.push('--update-snapshots');

const result = spawnSync('pnpm', args, {
  cwd: root,
  stdio: 'inherit',
});

process.exit(result.status ?? 0);
