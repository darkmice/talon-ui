/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

const preset = require('@talon-ui/tokens/preset');

module.exports = {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}', './src/styles/react.css'],
  darkMode: ['class', '[data-theme="dark"]'],
};
