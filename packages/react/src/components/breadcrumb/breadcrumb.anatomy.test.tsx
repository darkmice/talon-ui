/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Breadcrumb } from './breadcrumb.js';

const items = [
  { label: 'Workspace', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Talon UI' },
];

describe('Breadcrumb anatomy (design.md §6.43)', () => {
  test('wrapper is <nav aria-label="Breadcrumb"> containing an <ol>', () => {
    render(<Breadcrumb items={items} />);
    const nav = screen.getByRole('navigation');
    expect(nav.tagName).toBe('NAV');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
    const ol = nav.querySelector('ol');
    expect(ol).toBeInTheDocument();
  });

  test('each item is wrapped in <li> with flex gap classes', () => {
    render(<Breadcrumb items={items} />);
    const nav = screen.getByRole('navigation');
    const listItems = nav.querySelectorAll('li');
    expect(listItems.length).toBeGreaterThanOrEqual(3);
    listItems.forEach((li) => {
      expect(li.className).toMatch(/flex/);
      expect(li.className).toMatch(/items-center/);
    });
  });

  test('last item has aria-current="page" and no link wrapper', () => {
    render(<Breadcrumb items={items} />);
    const currentPage = screen.getByText('Talon UI').closest('[aria-current="page"]');
    expect(currentPage).toBeInTheDocument();
    expect(currentPage?.tagName).toBe('SPAN');
    // should not be inside an <a>
    expect(currentPage?.closest('a')).toBeNull();
  });

  test('displayName is "Breadcrumb"', async () => {
    const { Breadcrumb: BC } = await import('./breadcrumb.js');
    expect(BC.displayName).toBe('Breadcrumb');
  });
});
