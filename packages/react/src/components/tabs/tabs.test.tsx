/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { createRef } from 'react';
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

describe('Tabs', () => {
  test('three triggers render; first content visible by default when defaultValue is set', () => {
    render(<BasicTabs />);
    expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Metrics' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Logs' })).toBeInTheDocument();
    expect(screen.getByText('Overview content')).toBeVisible();
  });

  test('clicking second trigger activates it; second content visible; first hidden', async () => {
    const user = userEvent.setup();
    render(<BasicTabs />);
    await user.click(screen.getByRole('tab', { name: 'Metrics' }));
    expect(screen.getByRole('tab', { name: 'Metrics' })).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('Metrics content')).toBeVisible();
    // Radix removes inactive content from the DOM by default
    expect(screen.queryByText('Overview content')).not.toBeInTheDocument();
  });

  test('disabled trigger ignores clicks', async () => {
    const user = userEvent.setup();
    render(<BasicTabs />);
    const logsTab = screen.getByRole('tab', { name: 'Logs' });
    await user.click(logsTab);
    // Still on overview - logs tab is disabled
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('data-state', 'active');
    expect(logsTab).toBeDisabled();
  });

  test('onValueChange fires with the new value', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Tabs defaultValue="overview" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="metrics">Metrics content</TabsContent>
      </Tabs>,
    );
    await user.click(screen.getByRole('tab', { name: 'Metrics' }));
    expect(onValueChange).toHaveBeenCalledWith('metrics');
  });

  test('keyboard ArrowRight on focused trigger moves to next', async () => {
    const user = userEvent.setup();
    render(<BasicTabs />);
    const overviewTab = screen.getByRole('tab', { name: 'Overview' });
    overviewTab.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Metrics' })).toHaveFocus();
  });

  test('forwardRef on Tabs root reaches the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Tabs ref={ref} defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">A content</TabsContent>
      </Tabs>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
