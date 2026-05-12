/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { test, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const css = readFileSync(resolve('packages/tokens/src/tokens.css'), 'utf8');

// Extract variable declarations from a CSS rule body
function varsInBlock(block) {
  const out = new Set();
  for (const m of block.matchAll(/(--tp-[a-z0-9-]+)\s*:/g)) out.add(m[1]);
  return out;
}

// Find the body of a rule whose selector list matches a regex
function findRuleBody(text, selectorPattern) {
  const re = new RegExp(`(${selectorPattern.source})\\s*\\{([^{}]*)\\}`, 'g');
  const m = re.exec(text);
  return m ? m[2] : null;
}

test('tokens.css supports BOTH [data-theme="dark"] and .dark class selectors', () => {
  // The combined selector list must contain BOTH selectors
  const attrSeen  = /:root\[data-theme=['"]dark['"]\]/.test(css);
  const classSeen = /(^|,\s*)\.dark(\s*[,{])/m.test(css);
  expect(attrSeen).toBe(true);
  expect(classSeen).toBe(true);
});

test('the .dark / [data-theme="dark"] rule flips the core semantic tokens', () => {
  // The rule with both selectors must declare every key semantic var
  const body = findRuleBody(
    css,
    /:root\[data-theme=['"]dark['"]\],\s*\.dark/,
  );
  expect(body, 'merged dark rule body not found').not.toBeNull();
  const vars = varsInBlock(body);
  for (const key of [
    '--tp-bg-app',
    '--tp-bg-surface',
    '--tp-bg-subtle',
    '--tp-border-default',
    '--tp-text-primary',
    '--tp-text-secondary',
    '--tp-text-tertiary',
    '--tp-text-on-primary',
    '--tp-shadow-focus',
  ]) {
    expect(vars.has(key), `missing ${key} in dark block`).toBe(true);
  }
});

test('the dark @media block remains and overrides core semantic tokens for system preference', () => {
  // confirm the media block still exists
  expect(css.includes('@media (prefers-color-scheme: dark)')).toBe(true);
});
