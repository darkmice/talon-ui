/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { defineConfig } from 'dumi';
import { resolve } from 'node:path';

// dumi loads this config via CJS require(), so __dirname is available even in TS files.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const here: string = __dirname;
const monorepoRoot = resolve(here, '../..');

export default defineConfig({
  outputPath: 'dist',
  title: 'Talon UI',
  // Bilingual: Chinese default, English alternate
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  themeConfig: {
    name: 'Talon UI',
    logo: false,
    nav: {
      'zh-CN': [
        { title: '组件', link: '/components/button' },
        { title: 'Tokens', link: '/tokens/overview' },
        { title: 'GitHub', link: 'https://github.com/darkmice/talon-ui' },
      ],
      'en-US': [
        { title: 'Components', link: '/en-US/components/button' },
        { title: 'Tokens', link: '/en-US/tokens/overview' },
        { title: 'GitHub', link: 'https://github.com/darkmice/talon-ui' },
      ],
    },
    socialLinks: { github: 'https://github.com/darkmice/talon-ui' },
    footer: 'MIT Licensed · Talon Contributors',
    prefersColor: { default: 'auto', switch: true },
  },
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      // dumi does path.join(api.cwd, dir) internally, so dir must be relative to apps/docs
      { type: 'component', dir: '../../packages/react/src/components' },
    ],
  },
  // Map @talon-ui/* workspace deps so demos in markdown can import them directly.
  // Point to dist so webpack doesn't need to handle TypeScript ESM .js → .ts extension mapping.
  alias: {
    '@talon-ui/react': resolve(monorepoRoot, 'packages/react/dist/index.js'),
    '@talon-ui/tokens': resolve(monorepoRoot, 'packages/tokens/src'),
  },
});
