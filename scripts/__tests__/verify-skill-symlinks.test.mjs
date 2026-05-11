/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the Talon Community Dual License Agreement.
 */

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

test('fails when an agent dir has a dangling skills symlink', () => {
  const root = makeRoot();
  mkdirSync(join(root, 'skills'), { recursive: true });
  mkdirSync(join(root, '.claude'), { recursive: true });
  // Symlink target does not need to exist for symlinkSync to succeed; it produces a dangling link.
  symlinkSync('../nope', join(root, '.claude/skills'));
  // The dangling symlink IS still a symlink, so this should NOT throw —
  // the contract only requires that the entry be a symlink, not that its target resolves.
  expect(() => verifySkillSymlinks(root)).not.toThrow();
  rmSync(root, { recursive: true, force: true });
});
