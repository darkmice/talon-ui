/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'dist-docs',
  // Use Talon Pilot brand
  themeConfig: {
    name: 'Talon UI',
    logo: false,
    nav: [
      { title: 'Components', link: '/components/button' },
      { title: 'Tokens', link: '/tokens/overview' },
      { title: 'GitHub', link: 'https://github.com/darkmice/talon-ui' },
    ],
    socialLinks: {
      github: 'https://github.com/darkmice/talon-ui',
    },
    footer: 'MIT Licensed · Talon Contributors',
    prefersColor: { default: 'auto', switch: true },
  },
  // Read site pages from docs/ and components from packages/react/src/components.
  // codeBlockMode: 'passive' prevents plan/spec markdown files in docs/superpowers/
  // from being parsed as live React demos.
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      { type: 'component', dir: 'packages/react/src/components' },
    ],
    codeBlockMode: 'passive',
  },
  // Inject our token CSS globally so demos look like the product
  styles: [
    `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`,
  ],
  // Map @talon-ui/* workspace deps so demos in markdown can import them directly.
  // Point to dist so webpack doesn't need to handle TypeScript ESM .js → .ts extension mapping.
  alias: {
    '@talon-ui/react': path.resolve(__dirname, 'packages/react/dist/index.js'),
    '@talon-ui/tokens': path.resolve(__dirname, 'packages/tokens/src'),
  },
  // dumi compiles MD demos via babel/SWC — make sure JSX transforms work for our TSX
  extraBabelPresets: [],
});
