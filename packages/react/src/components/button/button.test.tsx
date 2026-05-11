/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { Button } from './button.js';

describe('Button', () => {
  test('renders children', () => {
    render(<Button>新建项目</Button>);
    expect(screen.getByRole('button', { name: '新建项目' })).toBeInTheDocument();
  });

  test('applies variant classes', () => {
    render(<Button variant="secondary">辅</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/bg-bg-surface/);
    expect(btn.className).toMatch(/border-border/);
  });

  test('fires onClick when clicked', async () => {
    const fn = vi.fn();
    render(<Button onClick={fn}>点</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(fn).toHaveBeenCalledOnce();
  });

  test('does not fire onClick when disabled', async () => {
    const fn = vi.fn();
    render(<Button disabled onClick={fn}>点</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(fn).not.toHaveBeenCalled();
  });

  test('loading state disables the button, shows aria-busy, hides trailing slot', () => {
    render(<Button loading trailing={<span data-testid="trail" />}>提交</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByTestId('trail')).not.toBeInTheDocument();
  });

  test('asChild renders as the child element (anchor)', () => {
    render(
      <Button asChild>
        <a href="/x" data-testid="link">go</a>
      </Button>,
    );
    const a = screen.getByTestId('link');
    expect(a.tagName).toBe('A');
    expect(a).toHaveAttribute('href', '/x');
    // and inherits the button styling
    expect(a.className).toMatch(/h-control-md/);
  });

  test('forwardRef passes ref to the underlying button', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>r</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  test('leading slot renders before children', () => {
    render(<Button leading={<span data-testid="lead">L</span>}>label</Button>);
    const btn = screen.getByRole('button');
    const lead = screen.getByTestId('lead');
    expect(btn.firstChild).toBe(lead);
  });
});
