/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { test, expect } from 'vitest';
import {
  extractTokensFromCss,
  extractTokensFromPreset,
  extractTokensFromJson,
  extractRefsFromCss,
  diffTokens,
} from '../verify-token-parity.mjs';

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

test('parses var() references from json', () => {
  const got = extractTokensFromJson({ a: 'var(--tp-bg-app)', b: ['var(--tp-text-primary)'] });
  expect(got.has('--tp-bg-app')).toBe(true);
  expect(got.has('--tp-text-primary')).toBe(true);
});

test('diff returns missing and unused references', () => {
  const css = { '--tp-bg-app': '#F6F7F9', '--tp-extra': '#fff' };
  const refs = new Set(['--tp-bg-app', '--tp-missing']);
  const result = diffTokens(css, refs);
  expect(result.unused).toEqual(['--tp-extra']);
  expect(result.missing).toEqual(['--tp-missing']);
});

test('extractRefsFromCss returns vars referenced inside the CSS itself', () => {
  const css = `
    :root {
      --tp-text-primary: var(--tp-gray-900);
      --tp-bg-app: #F6F7F9;
    }
  `;
  const refs = extractRefsFromCss(css);
  expect(refs.has('--tp-gray-900')).toBe(true);
  expect(refs.size).toBe(1);
});

test('diffTokens treats CSS-internal references as used', () => {
  const css = { '--tp-gray-900': '#0F172A', '--tp-text-primary': 'var(--tp-gray-900)' };
  // simulate: tokens.json + preset are empty; CSS internal ref keeps --tp-gray-900 from being flagged
  const refsExternalOnly = new Set();
  const refsCombined = new Set(['--tp-gray-900']); // would come from extractRefsFromCss in real run
  expect(diffTokens(css, refsExternalOnly).unused).toContain('--tp-gray-900');
  expect(diffTokens(css, refsCombined).unused).not.toContain('--tp-gray-900');
});

import { verifyTokenParity } from '../verify-token-parity.mjs';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const makeRepo = ({ css, json, preset }) => {
  const root = mkdtempSync(join(tmpdir(), 'talon-tp-'));
  const dir = join(root, 'packages/tokens/src');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'tokens.css'), css);
  writeFileSync(join(dir, 'tokens.json'), JSON.stringify(json));
  writeFileSync(join(dir, 'tailwind.preset.js'), `export default ${JSON.stringify(preset)};`);
  return root;
};

test('verifyTokenParity throws when JSON references a missing CSS var', async () => {
  const root = makeRepo({
    css: ':root { --tp-bg-app: #F6F7F9; }',
    json: { color: 'var(--tp-not-declared)' },
    preset: {},
  });
  await expect(verifyTokenParity(root)).rejects.toThrow(/missing in CSS/);
  rmSync(root, { recursive: true, force: true });
});

test('verifyTokenParity tolerates unused vars by default (warn-only)', async () => {
  const root = makeRepo({
    css: ':root { --tp-bg-app: #F6F7F9; --tp-orphan: #fff; }',
    json: { color: 'var(--tp-bg-app)' },
    preset: {},
  });
  await expect(verifyTokenParity(root)).resolves.toBe(true);
  rmSync(root, { recursive: true, force: true });
});

test('verifyTokenParity treats unused as fatal when TP_VERIFY_STRICT=1', async () => {
  const root = makeRepo({
    css: ':root { --tp-bg-app: #F6F7F9; --tp-orphan: #fff; }',
    json: { color: 'var(--tp-bg-app)' },
    preset: {},
  });
  const prev = process.env.TP_VERIFY_STRICT;
  process.env.TP_VERIFY_STRICT = '1';
  try {
    await expect(verifyTokenParity(root)).rejects.toThrow(/unused/);
  } finally {
    if (prev === undefined) delete process.env.TP_VERIFY_STRICT;
    else process.env.TP_VERIFY_STRICT = prev;
    rmSync(root, { recursive: true, force: true });
  }
});
