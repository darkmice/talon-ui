/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { ColorPicker } from './color-picker.js';

describe('ColorPicker', () => {
  test('renders trigger with default color swatch and hex text', () => {
    render(<ColorPicker defaultValue="#4F60FF" />);
    const trigger = screen.getByRole('button', { name: /pick a color/i });
    expect(trigger).toBeInTheDocument();
    // Swatch span
    const swatch = trigger.querySelector('span[style]') as HTMLElement;
    expect(swatch).toBeInTheDocument();
    expect(swatch.style.backgroundColor).toBeTruthy();
    // Hex text span
    const hexSpan = trigger.querySelector('span:not([style])');
    expect(hexSpan?.textContent?.toUpperCase()).toBe('#4F60FF');
  });

  test('clicking trigger opens popover and shows presets grid', async () => {
    const user = userEvent.setup();
    render(<ColorPicker />);
    await user.click(screen.getByRole('button', { name: /pick a color/i }));
    const grid = await screen.findByRole('grid');
    expect(grid).toBeInTheDocument();
    const cells = grid.querySelectorAll('[role="gridcell"]');
    expect(cells.length).toBeGreaterThan(0);
  });

  test('clicking a preset commits its hex via onValueChange', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ColorPicker onValueChange={onValueChange} />);
    await user.click(screen.getByRole('button', { name: /pick a color/i }));
    // Click the preset cell labelled #3B4DE6
    const preset = await screen.findByRole('gridcell', { name: '#3B4DE6' });
    await user.click(preset);
    expect(onValueChange).toHaveBeenCalledWith('#3B4DE6');
  });

  test('typing hex into input and pressing Enter commits the colour', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ColorPicker onValueChange={onValueChange} />);
    await user.click(screen.getByRole('button', { name: /pick a color/i }));
    const hexInput = await screen.findByRole('textbox', { name: /hex color value/i });
    await user.clear(hexInput);
    await user.type(hexInput, '#AABBCC');
    await user.keyboard('{Enter}');
    expect(onValueChange).toHaveBeenCalledWith('#AABBCC');
  });

  test('invalid hex on Enter reverts input to current value', async () => {
    const user = userEvent.setup();
    render(<ColorPicker defaultValue="#4F60FF" />);
    await user.click(screen.getByRole('button', { name: /pick a color/i }));
    const hexInput = await screen.findByRole('textbox', { name: /hex color value/i });
    await user.clear(hexInput);
    await user.type(hexInput, 'not-a-hex');
    await user.keyboard('{Enter}');
    // Input should revert to the current value
    expect((hexInput as HTMLInputElement).value.toUpperCase()).toBe('#4F60FF');
  });

  test('defaultValue colour appears in the trigger swatch and text', () => {
    render(<ColorPicker defaultValue="#0E8A55" />);
    const trigger = screen.getByRole('button', { name: /pick a color/i });
    const hexSpan = trigger.querySelector('span:not([style])');
    expect(hexSpan?.textContent?.toUpperCase()).toBe('#0E8A55');
  });

  test('disabled prop disables the trigger', () => {
    render(<ColorPicker disabled />);
    expect(screen.getByRole('button', { name: /pick a color/i })).toBeDisabled();
  });

  test('controlled value overrides internal state', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ColorPicker value="#FF7A45" onValueChange={onValueChange} />);
    const trigger = screen.getByRole('button', { name: /pick a color/i });
    const hexSpan = trigger.querySelector('span:not([style])');
    expect(hexSpan?.textContent?.toUpperCase()).toBe('#FF7A45');
    // Clicking a preset calls handler but controlled value stays until parent re-renders
    await user.click(trigger);
    const preset = await screen.findByRole('gridcell', { name: '#4F60FF' });
    await user.click(preset);
    expect(onValueChange).toHaveBeenCalledWith('#4F60FF');
  });

  test('custom presets array is rendered in the grid', async () => {
    const user = userEvent.setup();
    const customPresets = ['#AABBCC', '#DDEEFF', '#112233'];
    render(<ColorPicker presets={customPresets} />);
    await user.click(screen.getByRole('button', { name: /pick a color/i }));
    for (const c of customPresets) {
      expect(await screen.findByRole('gridcell', { name: c })).toBeInTheDocument();
    }
  });
});
