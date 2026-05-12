/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { test, expect } from '@playwright/test';

const COMPONENTS = [
  // Block 1
  'button', 'input', 'textarea', 'tag', 'avatar', 'card', 'badge', 'divider', 'space', 'typography',
  // Block 2
  'form', 'checkbox', 'radio', 'switch', 'slider', 'number-input', 'rate',
  'select', 'combobox', 'date-picker', 'time-picker', 'upload', 'color-picker',
  // Block 3
  'tabs', 'tooltip', 'popover', 'popconfirm', 'menu', 'modal', 'drawer',
  'banner', 'toast', 'pagination', 'stepper', 'breadcrumb',
  // Block 4
  'skeleton', 'spin', 'empty', 'result', 'statistic', 'progress',
  'descriptions', 'collapse', 'kanban-card', 'business-rows',
] as const;

for (const slug of COMPONENTS) {
  test(`/components/${slug}/ matches baseline`, async ({ page }) => {
    await page.goto(`/components/${slug}/`);
    // Wait for content + Pagefind init + any island hydration.
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);
    // Disable animations to stabilise snapshots.
    await page.addStyleTag({
      content: `*, *::before, *::after { animation-duration: 0ms !important; transition-duration: 0ms !important; }`,
    });
    await expect(page).toHaveScreenshot(`${slug}.png`, {
      fullPage: true,
      // Mask the "On this page" right rail which can shift with scroll position.
      mask: [page.locator('.right-sidebar')],
    });
  });
}
