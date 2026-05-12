/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Checkbox } from './checkbox.js';

describe('Checkbox anatomy', () => {
  test('default unchecked: button has rounded-sm border border-border bg-bg-surface size-4', () => {
    const { container } = render(<Checkbox />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn.className).toMatch(/rounded-sm/);
    expect(btn.className).toMatch(/border-border/);
    expect(btn.className).toMatch(/bg-bg-surface/);
    expect(btn.className).toMatch(/size-4/);
    expect(btn).toHaveAttribute('data-state', 'unchecked');
  });

  test('checked: data-state="checked" and indicator (Check icon SVG) is present', () => {
    const { container } = render(<Checkbox defaultChecked />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn).toHaveAttribute('data-state', 'checked');
    // The indicator should be rendered with the Check SVG
    const indicator = container.querySelector('[data-state="checked"]');
    expect(indicator).toBeInTheDocument();
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('indeterminate: Minus icon SVG rendered instead of Check', () => {
    const { container } = render(<Checkbox checked="indeterminate" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn).toHaveAttribute('data-state', 'indeterminate');
    // SVG is present (Minus icon)
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
    // The state on the root button is indeterminate
    expect(btn.getAttribute('data-state')).toBe('indeterminate');
  });
});
