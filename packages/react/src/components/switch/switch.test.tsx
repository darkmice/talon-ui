/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Switch } from './switch.js';

describe('Switch', () => {
  test('renders unchecked by default — data-state=unchecked', () => {
    const { container } = render(<Switch />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('data-state', 'unchecked');
  });

  test('toggles to checked on click and fires onCheckedChange', () => {
    const handler = vi.fn();
    render(<Switch onCheckedChange={handler} />);
    const btn = screen.getByRole('switch');
    fireEvent.click(btn);
    expect(handler).toHaveBeenCalledWith(true);
  });

  test('defaultChecked sets initial data-state=checked', () => {
    const { container } = render(<Switch defaultChecked />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn).toHaveAttribute('data-state', 'checked');
  });

  test('disabled prevents toggle and onCheckedChange is not called', () => {
    const handler = vi.fn();
    render(<Switch disabled onCheckedChange={handler} />);
    const btn = screen.getByRole('switch');
    fireEvent.click(btn);
    expect(handler).not.toHaveBeenCalled();
  });

  test('size="sm" applies h-4 w-7 classes', () => {
    const { container } = render(<Switch size="sm" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn.className).toMatch(/h-4/);
    expect(btn.className).toMatch(/w-7/);
  });

  test('tone="danger" applies bg-danger-500 class string', () => {
    const { container } = render(<Switch tone="danger" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn.className).toMatch(/data-\[state=checked\]:bg-danger-500/);
  });

  test('forwardRef points to the underlying button element', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Switch ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
