/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    starlight({
      title: 'Talon UI',
      customCss: ['./src/styles/global.css'],
      social: {
        github: 'https://github.com/darkmice/talon-ui',
      },
      sidebar: [
        { label: 'Getting Started', autogenerate: { directory: 'getting-started' } },
        { label: 'Tokens',          autogenerate: { directory: 'tokens' } },
        { label: 'Components',      autogenerate: { directory: 'components' } },
      ],
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src/', import.meta.url)),
      },
    },
  },
});
