/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { Tag } from './tag.js';

describe('Tag', () => {
  test('renders children as label', () => {
    render(<Tag>typescript</Tag>);
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  test('default tone neutral has no role="status"; status tone adds role="status"', () => {
    const { rerender } = render(<Tag>neutral</Tag>);
    expect(screen.getByText('neutral').closest('span[class]')).not.toHaveAttribute('role');

    rerender(<Tag tone="done">done</Tag>);
    expect(screen.getByText('done').closest('[role="status"]')).toBeInTheDocument();
  });

  test('dot prop renders a leading aria-hidden dot span', () => {
    const { container } = render(<Tag dot>label</Tag>);
    const dotSpan = container.querySelector('span[aria-hidden]');
    expect(dotSpan).toBeInTheDocument();
  });

  test('removable renders a button with default aria-label "Remove" and clicking fires onRemove', async () => {
    const fn = vi.fn();
    render(<Tag removable onRemove={fn}>tag</Tag>);
    const btn = screen.getByRole('button', { name: 'Remove' });
    expect(btn).toBeInTheDocument();
    await userEvent.click(btn);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('custom removeLabel sets the aria-label on the remove button', () => {
    render(<Tag removable removeLabel="削除">tag</Tag>);
    expect(screen.getByRole('button', { name: '削除' })).toBeInTheDocument();
  });

  test('forwardRef passes ref to the outer span', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Tag ref={ref}>ref-test</Tag>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  test('no remove button when removable is false (default)', () => {
    render(<Tag>no-remove</Tag>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
