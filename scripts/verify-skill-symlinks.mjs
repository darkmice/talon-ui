/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { lstatSync, existsSync } from 'node:fs';
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
    let st;
    try {
      st = lstatSync(skillsPath);
    } catch {
      continue; // skills entry does not exist at all
    }
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
