/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs.js';

function BasicTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
        <TabsTrigger value="logs" disabled>Logs</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content</TabsContent>
      <TabsContent value="metrics">Metrics content</TabsContent>
      <TabsContent value="logs">Logs content</TabsContent>
    </Tabs>
  );
}

describe('Tabs anatomy (design.md §6.6 + §6.21)', () => {
  test('Tabs root has dir="ltr" and is a <div>', () => {
    const { container } = render(<BasicTabs />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe('DIV');
    expect(root).toHaveAttribute('dir', 'ltr');
  });

  test('TabsList renders <div role="tablist"> with border-b border-border and gap-tp-6', () => {
    render(<BasicTabs />);
    const list = screen.getByRole('tablist');
    expect(list.tagName).toBe('DIV');
    expect(list.className).toMatch(/border-b/);
    expect(list.className).toMatch(/border-border/);
    expect(list.className).toMatch(/gap-tp-6/);
  });

  test('active trigger has data-state="active" and border-primary-500 class', async () => {
    const user = userEvent.setup();
    render(<BasicTabs />);
    const overviewTab = screen.getByRole('tab', { name: 'Overview' });
    // default active tab
    expect(overviewTab).toHaveAttribute('data-state', 'active');
    expect(overviewTab.className).toMatch(/border-primary-500/);

    // switch to metrics
    await user.click(screen.getByRole('tab', { name: 'Metrics' }));
    const metricsTab = screen.getByRole('tab', { name: 'Metrics' });
    expect(metricsTab).toHaveAttribute('data-state', 'active');
    expect(metricsTab.className).toMatch(/border-primary-500/);
  });
});
