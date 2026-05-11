/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { defineConfig } from 'tsup';

const MIT_HEADER =
  '/*\n * Copyright (c) 2026 Talon Contributors\n * Author: dark.lijin@gmail.com\n * Licensed under the MIT License.\n */\n';

function prependHeader(file: string) {
  const content = readFileSync(file, 'utf8');
  if (!content.startsWith('/*')) {
    writeFileSync(file, MIT_HEADER + content);
  }
}

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  splitting: true,
  clean: true,
  treeshake: true,
  legalComments: 'inline',
  external: ['react', 'react-dom', '@talon-ui/tokens'],
  async onSuccess() {
    prependHeader('dist/index.js');
    prependHeader('dist/index.cjs');
  },
});
