/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Pagination } from './pagination.js';

describe('Pagination anatomy (design.md §6.42)', () => {
  test('wrapper is <nav role="navigation" aria-label="Pagination">', () => {
    render(<Pagination page={1} pageSize={10} total={30} onChange={() => {}} showPageSize={false} />);
    const nav = screen.getByRole('navigation');
    expect(nav.tagName).toBe('NAV');
    expect(nav).toHaveAttribute('aria-label', 'Pagination');
  });

  test('custom label sets aria-label on the nav element', () => {
    render(
      <Pagination
        page={1}
        pageSize={10}
        total={30}
        onChange={() => {}}
        showPageSize={false}
        label="Table navigation"
      />,
    );
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Table navigation');
  });

  test('page buttons have correct size class for md (size-8)', () => {
    render(<Pagination page={1} pageSize={10} total={30} onChange={() => {}} showPageSize={false} />);
    const page1Btn = screen.getByRole('button', { name: 'Page 1' });
    expect(page1Btn.className).toMatch(/size-8/);
  });

  test('page buttons have correct size class for sm (size-7)', () => {
    render(
      <Pagination
        page={1}
        pageSize={10}
        total={30}
        onChange={() => {}}
        showPageSize={false}
        size="sm"
      />,
    );
    const page1Btn = screen.getByRole('button', { name: 'Page 1' });
    expect(page1Btn.className).toMatch(/size-7/);
  });
});
