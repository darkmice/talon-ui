/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { Config } from 'tailwindcss';
import preset from '@talon-ui/tokens/preset';

export default {
  presets: [preset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/react/dist/**/*.js',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
} satisfies Config;
