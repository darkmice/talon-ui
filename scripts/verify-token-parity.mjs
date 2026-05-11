/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const VAR_REF = /var\((--tp-[a-z0-9-]+)\)/g;

export function extractTokensFromCss(css) {
  const out = {};
  for (const match of css.matchAll(/(--tp-[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    out[match[1]] = match[2].trim();
  }
  return out;
}

export function extractRefsFromCss(cssText) {
  const refs = new Set();
  for (const m of cssText.matchAll(VAR_REF)) refs.add(m[1]);
  return refs;
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
      if (Array.isArray(v)) v.forEach(walk);
      else Object.values(v).forEach(walk);
    }
  };
  walk(jsonObj);
  return refs;
}

export function diffTokens(cssMap, refs) {
  const cssKeys = new Set(Object.keys(cssMap));
  const missing = [...refs].filter((k) => !cssKeys.has(k));
  const unused = [...cssKeys].filter((k) => !refs.has(k));
  return { missing, unused };
}

export async function verifyTokenParity(rootDir) {
  const cssPath = resolve(rootDir, 'packages/tokens/src/tokens.css');
  const jsonPath = resolve(rootDir, 'packages/tokens/src/tokens.json');
  const presetPath = resolve(rootDir, 'packages/tokens/src/tailwind.preset.js');
  for (const p of [cssPath, jsonPath, presetPath]) {
    if (!existsSync(p)) throw new Error(`missing: ${p}`);
  }
  const cssText = readFileSync(cssPath, 'utf8');
  const css = extractTokensFromCss(cssText);
  const json = extractTokensFromJson(JSON.parse(readFileSync(jsonPath, 'utf8')));
  const presetModule = await import(presetPath);
  const preset = extractTokensFromPreset(presetModule.default ?? presetModule);
  const refs = new Set([...extractRefsFromCss(cssText), ...json, ...preset]);
  const { missing, unused } = diffTokens(css, refs);
  if (missing.length) {
    throw new Error(
      'Token parity failed:\n' +
        `  missing in CSS: ${missing.join(', ')}\n`,
    );
  }
  if (unused.length) {
    if (process.env.TP_VERIFY_STRICT === '1') {
      throw new Error(
        'Token parity failed:\n' +
          `  unused in CSS:  ${unused.join(', ')}\n`,
      );
    }
    const first10 = unused.slice(0, 10).join(', ');
    process.stderr.write(
      `Token parity warning: ${unused.length} CSS vars are declared but currently unreferenced (Phase 1 tech debt).\n` +
        `First 10: ${first10}\n` +
        `Set env TP_VERIFY_STRICT=1 to fail on unused.\n`,
    );
  }
  return true;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  verifyTokenParity(process.cwd())
    .then(() => console.log('token parity OK'))
    .catch((e) => {
      console.error(e.message);
      process.exit(1);
    });
}
