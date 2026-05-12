/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { Pagination } from './pagination.js';

describe('Pagination', () => {
  test('renders correct page buttons for small total (total=30 pageSize=10 → pages 1/2/3)', () => {
    render(<Pagination page={1} pageSize={10} total={30} onChange={vi.fn()} showPageSize={false} />);
    expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 3' })).toBeInTheDocument();
  });

  test('clicking page 2 fires onChange(2, 10)', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination page={1} pageSize={10} total={30} onChange={onChange} showPageSize={false} />);
    await user.click(screen.getByRole('button', { name: 'Page 2' }));
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });

  test('ChevronLeft disabled when on page 1', () => {
    render(<Pagination page={1} pageSize={10} total={30} onChange={vi.fn()} showPageSize={false} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  });

  test('ChevronRight disabled when on last page', () => {
    render(<Pagination page={3} pageSize={10} total={30} onChange={vi.fn()} showPageSize={false} />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  test('ellipsis shows when totalPages large (page=10, total=200, pageSize=10)', () => {
    render(
      <Pagination page={10} pageSize={10} total={200} onChange={vi.fn()} showPageSize={false} />,
    );
    // Should render at least one ellipsis (aria-hidden element with "…")
    const ellipses = document.querySelectorAll('[aria-hidden="true"]');
    const ellipsisItems = Array.from(ellipses).filter((el) => el.textContent?.includes('…'));
    expect(ellipsisItems.length).toBeGreaterThan(0);
  });

  test('active page button has aria-current="page" and primary background class', () => {
    render(<Pagination page={2} pageSize={10} total={30} onChange={vi.fn()} showPageSize={false} />);
    const activePage = screen.getByRole('button', { name: 'Page 2' });
    expect(activePage).toHaveAttribute('aria-current', 'page');
    expect(activePage.className).toMatch(/bg-primary-500/);
  });

  test('changing pageSize via the Select fires onChange(1, newSize)', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Pagination
        page={3}
        pageSize={10}
        total={500}
        onChange={onChange}
        pageSizeOptions={[10, 20, 50]}
      />,
    );
    // Open the select
    const trigger = screen.getByRole('combobox');
    await user.click(trigger);
    // Select 20
    const option = screen.getByRole('option', { name: '20 / page' });
    await user.click(option);
    expect(onChange).toHaveBeenCalledWith(1, 20);
  });

  test('disabled prop prevents onChange from firing when clicking page buttons', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Pagination page={1} pageSize={10} total={30} onChange={onChange} disabled showPageSize={false} />,
    );
    const page2 = screen.getByRole('button', { name: 'Page 2' });
    expect(page2).toBeDisabled();
    await user.click(page2);
    expect(onChange).not.toHaveBeenCalled();
  });
});
