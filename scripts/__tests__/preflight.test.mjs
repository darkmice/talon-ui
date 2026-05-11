/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

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
