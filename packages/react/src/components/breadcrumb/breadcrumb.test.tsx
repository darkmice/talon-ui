/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { Breadcrumb } from './breadcrumb.js';

const three = [
  { label: 'Workspace', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Talon UI' },
];

const five = [
  { label: 'Org', href: '/' },
  { label: 'Workspace', href: '/ws' },
  { label: 'Engineering', href: '/ws/eng' },
  { label: 'Projects', href: '/ws/eng/projects' },
  { label: 'Talon UI' },
];

describe('Breadcrumb', () => {
  test('renders 3 items with 2 separators between them', () => {
    render(<Breadcrumb items={three} />);
    expect(screen.getByText('Workspace')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Talon UI')).toBeInTheDocument();
    // default separator is '/'
    const seps = screen.getAllByText('/');
    expect(seps).toHaveLength(2);
  });

  test('last item has aria-current="page"', () => {
    render(<Breadcrumb items={three} />);
    const last = screen.getByText('Talon UI').closest('[aria-current="page"]');
    expect(last).toBeInTheDocument();
  });

  test('item with href renders as <a>; item with only onClick renders as <button>; item without either renders as <span>', () => {
    const onClick = vi.fn();
    const items = [
      { label: 'Link', href: '/link' },
      { label: 'Button', onClick },
      { label: 'Current' },
    ];
    render(<Breadcrumb items={items} />);

    const link = screen.getByText('Link').closest('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/link');

    const btn = screen.getByText('Button').closest('button');
    expect(btn).toBeInTheDocument();

    // 'Current' is last item, wrapped in aria-current span
    const current = screen.getByText('Current').closest('[aria-current="page"]');
    expect(current?.tagName).toBe('SPAN');
  });

  test('maxItems=3 folds 5 items → first + ellipsis trigger + last item', () => {
    render(<Breadcrumb items={five} maxItems={3} />);
    expect(screen.getByText('Org')).toBeInTheDocument();
    expect(screen.getByText('Talon UI')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show hidden breadcrumbs' })).toBeInTheDocument();
    // Middle items should NOT be visible (they're in the dropdown)
    expect(screen.queryByText('Workspace')).not.toBeInTheDocument();
    expect(screen.queryByText('Engineering')).not.toBeInTheDocument();
    expect(screen.queryByText('Projects')).not.toBeInTheDocument();
  });

  test('clicking ellipsis trigger opens menu containing hidden items', async () => {
    render(<Breadcrumb items={five} maxItems={3} />);
    const trigger = screen.getByRole('button', { name: 'Show hidden breadcrumbs' });
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
    expect(screen.getByRole('menuitem', { name: 'Workspace' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Engineering' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Projects' })).toBeInTheDocument();
  });

  test('custom separator renders instead of default /', () => {
    render(<Breadcrumb items={three} separator=">" />);
    const seps = screen.getAllByText('>');
    expect(seps).toHaveLength(2);
    expect(screen.queryByText('/')).not.toBeInTheDocument();
  });

  test('no folding when items.length <= maxItems', () => {
    render(<Breadcrumb items={three} maxItems={5} />);
    expect(screen.queryByRole('button', { name: 'Show hidden breadcrumbs' })).not.toBeInTheDocument();
    expect(screen.getByText('Workspace')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Talon UI')).toBeInTheDocument();
  });

  test('custom label sets aria-label on nav', () => {
    render(<Breadcrumb items={three} label="Page path" />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Page path');
  });
});
