/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { ColorPicker } from './color-picker.js';

describe('ColorPicker anatomy (design.md §6.39)', () => {
  test('Trigger has a <span style="background-color: …"> swatch and uppercase hex text', () => {
    render(<ColorPicker defaultValue="#4F60FF" />);
    const trigger = screen.getByRole('button', { name: /pick a color/i });
    // Coloured swatch
    const swatch = trigger.querySelector('span[style]') as HTMLElement;
    expect(swatch).toBeInTheDocument();
    expect(swatch.style.backgroundColor).toBeTruthy();
    // Hex text
    const textSpan = trigger.querySelector('span:not([style])');
    expect(textSpan?.textContent).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  test('Open popover contains a div[role="grid"] with button[role="gridcell"] children', async () => {
    const user = userEvent.setup();
    render(<ColorPicker />);
    await user.click(screen.getByRole('button', { name: /pick a color/i }));
    const grid = await screen.findByRole('grid');
    expect(grid).toBeInTheDocument();
    const cells = grid.querySelectorAll('button[role="gridcell"]');
    expect(cells.length).toBeGreaterThan(0);
  });

  test('Each preset cell has aria-label equal to its hex string', async () => {
    const user = userEvent.setup();
    const presets = ['#4F60FF', '#3B4DE6', '#0F172A'];
    render(<ColorPicker presets={presets} />);
    await user.click(screen.getByRole('button', { name: /pick a color/i }));
    for (const hex of presets) {
      const cell = await screen.findByRole('gridcell', { name: hex });
      expect(cell).toBeInTheDocument();
      expect(cell).toHaveAttribute('aria-label', hex);
    }
  });

  test('Active preset cell has aria-selected="true" and renders a Check icon', async () => {
    const user = userEvent.setup();
    render(<ColorPicker defaultValue="#4F60FF" />);
    await user.click(screen.getByRole('button', { name: /pick a color/i }));
    const activeCell = await screen.findByRole('gridcell', { name: '#4F60FF' });
    expect(activeCell).toHaveAttribute('aria-selected', 'true');
    expect(activeCell.querySelector('svg')).toBeInTheDocument();
  });

  test('Trigger with tone=invalid has red border class', () => {
    render(<ColorPicker tone="invalid" />);
    const trigger = screen.getByRole('button', { name: /pick a color/i });
    expect(trigger.className).toMatch(/C8322B/);
  });

  test('Trigger with size=sm has h-control-sm class', () => {
    render(<ColorPicker size="sm" />);
    const trigger = screen.getByRole('button', { name: /pick a color/i });
    expect(trigger.className).toMatch(/h-control-sm/);
  });

  test('Hex input row is rendered by default and has correct aria-label', async () => {
    const user = userEvent.setup();
    render(<ColorPicker />);
    await user.click(screen.getByRole('button', { name: /pick a color/i }));
    const hexInput = await screen.findByRole('textbox', { name: /hex color value/i });
    expect(hexInput).toBeInTheDocument();
    expect(hexInput).toHaveAttribute('aria-label', 'Hex color value');
  });

  test('showHexInput=false hides the hex text input', async () => {
    const user = userEvent.setup();
    render(<ColorPicker showHexInput={false} />);
    await user.click(screen.getByRole('button', { name: /pick a color/i }));
    await screen.findByRole('grid'); // wait for popover
    expect(screen.queryByRole('textbox', { name: /hex color value/i })).not.toBeInTheDocument();
  });
});
