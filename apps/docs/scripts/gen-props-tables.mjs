/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 *
 * gen-props-tables.mjs
 * --------------------
 * Reads every component source file under packages/react/src/components,
 * extracts TypeScript prop definitions via react-docgen-typescript, and
 * emits a single JSON file to apps/docs/.generated/props.json.
 *
 * Usage
 * -----
 *   node scripts/gen-props-tables.mjs
 *
 * This script is run automatically before every `build` and `dev` invocation
 * via the npm scripts in apps/docs/package.json:
 *
 *   "build": "node scripts/gen-props-tables.mjs && astro build"
 *   "dev":   "node scripts/gen-props-tables.mjs && astro dev"
 *
 * Output shape (apps/docs/.generated/props.json)
 * -----------------------------------------------
 * {
 *   "Button": {
 *     "displayName": "Button",
 *     "description": "...",
 *     "props": [
 *       { "name": "variant", "type": "'primary' | 'secondary' | ...", "required": false, "defaultValue": "primary", "description": "..." },
 *       ...
 *     ]
 *   },
 *   ...
 * }
 *
 * Prop filter
 * -----------
 * Props inherited from node_modules/@types/react (e.g. onClick, onChange) and
 * from Radix UI / react-hook-form internals are excluded — only author-defined
 * props appear in the table.
 *
 * Performance
 * -----------
 * react-docgen-typescript boots a TypeScript compiler on first run (~5–15 s on
 * cold cache). Subsequent runs hit the TS incremental cache and are faster.
 * If the generation time ever becomes painful, gate it behind an env var or a
 * file-mtime check. For now it runs unconditionally.
 *
 * Adding new components
 * ---------------------
 * No action required. Any *.tsx file placed under packages/react/src/components
 * that exports a component with a `displayName` will automatically appear in
 * the next generated JSON.
 *
 * Using in MDX pages
 * ------------------
 * Import the Astro component and pass the display name:
 *
 *   import PropsTable from '@/components/PropsTable.astro';
 *   <PropsTable component="Button" />
 *
 * The component name must match the `displayName` set on the React component
 * (e.g. `Button.displayName = 'Button'`).
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { withCustomConfig } from 'react-docgen-typescript';
import { glob } from 'tinyglobby';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../../..');
const docsRoot = resolve(here, '..');
const reactSrc = resolve(root, 'packages/react/src/components');
const outPath = resolve(docsRoot, '.generated/props.json');

const tsconfigPath = resolve(root, 'packages/react/tsconfig.json');
const parser = withCustomConfig(tsconfigPath, {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop) => {
    // Skip props inherited from native HTML attributes (e.g. `onClick`, `onChange`)
    // and Radix re-exports — keep only what's component-author-defined.
    if (prop.parent) {
      const name = prop.parent.fileName;
      if (name.includes('node_modules/@types/react')) return false;
      if (name.includes('node_modules/@radix-ui/')) return false;
      if (name.includes('node_modules/react-hook-form')) return false;
    }
    return true;
  },
});

const files = (await glob('**/*.{ts,tsx}', { cwd: reactSrc, absolute: true }))
  .filter((p) => !p.match(/\.(test|anatomy\.test)\.tsx?$/));

console.log(`gen-props-tables: parsing ${files.length} source files…`);

const docs = parser.parse(files);
const byName = Object.create(null);
for (const c of docs) {
  if (!c.displayName) continue;
  byName[c.displayName] = {
    displayName: c.displayName,
    description: c.description ?? '',
    props: Object.entries(c.props ?? {}).map(([name, p]) => ({
      name,
      type: p.type?.name ?? '',
      required: p.required ?? false,
      defaultValue: p.defaultValue?.value ?? null,
      description: p.description ?? '',
    })),
  };
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(byName, null, 2));
console.log(`gen-props-tables → ${outPath} (${Object.keys(byName).length} components)`);
