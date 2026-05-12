/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Button } from './button.js';

describe('Button anatomy (design.md §6.1)', () => {
  test('primary md button: 1 root <button>, label child, gap utility, focus-ring class, control-md height utility', () => {
    const { container } = render(<Button>新建</Button>);
    const btn = container.firstElementChild as HTMLElement;
    expect(btn.tagName).toBe('BUTTON');
    expect(btn).toHaveAttribute('type', 'button');
    // class list must include the canonical tokens
    const cls = btn.className;
    expect(cls).toMatch(/h-control-md/);
    expect(cls).toMatch(/rounded-md/);
    expect(cls).toMatch(/bg-primary-500/);
    expect(cls).toMatch(/text-text-on-primary/);
    expect(cls).toMatch(/focus-visible:tp-focus-ring/);
    expect(btn.textContent).toBe('新建');
  });

  test('iconOnly button has aspect-square and no horizontal padding', () => {
    const { container } = render(
      <Button iconOnly aria-label="add"><span data-testid="icon" /></Button>,
    );
    const btn = container.firstElementChild as HTMLElement;
    expect(btn.className).toMatch(/aspect-square/);
    expect(btn.className).toMatch(/px-0/);
  });

  test('danger variant uses Talon brand red tokens', () => {
    const { container } = render(<Button variant="danger">删除</Button>);
    const btn = container.firstElementChild as HTMLElement;
    expect(btn.className).toMatch(/bg-danger-500/);
    expect(btn.className).toMatch(/text-text-on-primary/);
  });
});
