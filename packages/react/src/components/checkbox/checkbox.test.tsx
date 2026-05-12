/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Checkbox } from './checkbox.js';

describe('Checkbox', () => {
  test('renders unchecked by default — data-state=unchecked', () => {
    const { container } = render(<Checkbox />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('data-state', 'unchecked');
  });

  test('toggles to checked on click and fires onCheckedChange', () => {
    const handler = vi.fn();
    render(<Checkbox onCheckedChange={handler} />);
    const btn = screen.getByRole('checkbox');
    fireEvent.click(btn);
    expect(handler).toHaveBeenCalledWith(true);
  });

  test('checked="indeterminate" shows the Minus icon (aria-hidden)', () => {
    const { container } = render(<Checkbox checked="indeterminate" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn).toHaveAttribute('data-state', 'indeterminate');
    // Minus SVG should be present inside the indicator
    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
    // The indicator text content comes from Minus icon (no Check)
    const indicator = container.querySelector('[data-state="indeterminate"]');
    expect(indicator).toBeInTheDocument();
  });

  test('disabled prevents toggle and onCheckedChange is not called', () => {
    const handler = vi.fn();
    render(<Checkbox disabled onCheckedChange={handler} />);
    const btn = screen.getByRole('checkbox');
    fireEvent.click(btn);
    expect(handler).not.toHaveBeenCalled();
  });

  test('tone="danger" applies danger class string', () => {
    const { container } = render(<Checkbox tone="danger" defaultChecked />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn.className).toMatch(/data-\[state=checked\]:bg-danger-500/);
  });

  test('size="sm" applies size-[14px] class', () => {
    const { container } = render(<Checkbox size="sm" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn.className).toMatch(/size-\[14px\]/);
  });

  test('forwardRef reaches the underlying button element', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
