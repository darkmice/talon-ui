/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Switch } from './switch.js';

describe('Switch anatomy', () => {
  test('default rendering: button role="switch" with track classes and inner thumb span', () => {
    const { container } = render(<Switch />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('role', 'switch');
    expect(btn.className).toMatch(/h-\[18px\]/);
    expect(btn.className).toMatch(/w-8/);
    expect(btn.className).toMatch(/rounded-pill/);
    expect(btn.className).toMatch(/bg-bg-subtle/);
    expect(btn.className).toMatch(/border/);
    expect(btn.className).toMatch(/border-transparent/);
    // thumb span is rendered inside
    const thumb = btn.querySelector('span') as HTMLSpanElement;
    expect(thumb).toBeInTheDocument();
  });

  test('checked: data-state="checked", track has bg-primary-500, thumb has translate-x-[16px]', () => {
    const { container } = render(<Switch defaultChecked />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn).toHaveAttribute('data-state', 'checked');
    expect(btn.className).toMatch(/data-\[state=checked\]:bg-primary-500/);
    const thumb = btn.querySelector('span') as HTMLSpanElement;
    expect(thumb.className).toMatch(/data-\[state=checked\]:translate-x-\[16px\]/);
  });

  test('thumb classes include rounded-pill bg-bg-surface shadow-sm', () => {
    const { container } = render(<Switch />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    const thumb = btn.querySelector('span') as HTMLSpanElement;
    expect(thumb.className).toMatch(/rounded-pill/);
    expect(thumb.className).toMatch(/bg-bg-surface/);
    expect(thumb.className).toMatch(/shadow-sm/);
  });
});
