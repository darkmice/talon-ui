/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execSync } from 'node:child_process';

const REQUIRED_FILES = {
  '@talon-ui/react': ['index.js', 'index.cjs', 'index.d.ts', 'styles.css'],
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
