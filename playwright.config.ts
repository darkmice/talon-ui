/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  outputDir: './tests/visual/.results',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [['list'], ['html', { outputFolder: './tests/visual/.report', open: 'never' }]],
  expect: {
    toMatchSnapshot: { maxDiffPixelRatio: 0.001 },
    toHaveScreenshot: { maxDiffPixelRatio: 0.001 },
  },
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'retain-on-failure',
    viewport: { width: 1280, height: 800 },
  },
  webServer: {
    command: 'pnpm --filter @talon-ui/docs preview --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321',
    timeout: 60_000,
    reuseExistingServer: false,
  },
  projects: [
    {
      name: 'chromium-light',
      use: { ...devices['Desktop Chrome'], colorScheme: 'light' },
    },
  ],
});
