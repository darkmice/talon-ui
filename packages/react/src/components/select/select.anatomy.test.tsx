/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './select.js';

describe('Select anatomy (design.md §6.33)', () => {
  test('SelectTrigger default: button[role=combobox] with h-control-md, rounded-md and data-state=closed', () => {
    const { container } = render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    );
    const trigger = container.querySelector('button[role="combobox"]') as HTMLButtonElement;
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('data-state', 'closed');
    expect(trigger.className).toMatch(/h-control-md/);
    expect(trigger.className).toMatch(/rounded-md/);
    expect(trigger.className).toMatch(/bg-bg-surface/);
    expect(trigger.className).toMatch(/border-border/);
  });

  test('SelectContent when open: listbox has bg-bg-surface, border-border, shadow-pop', async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );
    await user.click(screen.getByRole('combobox'));
    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    // Radix v2: our className is forwarded to the listbox element itself
    expect(listbox.className).toMatch(/bg-bg-surface/);
    expect(listbox.className).toMatch(/border-border/);
    expect(listbox.className).toMatch(/shadow-pop/);
  });

  test('SelectItem when selected: data-state=checked and ItemIndicator visible', async () => {
    const user = userEvent.setup();
    render(
      <Select defaultValue="apple">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>,
    );
    await user.click(screen.getByRole('combobox'));
    const appleOption = screen.getByRole('option', { name: 'Apple' });
    expect(appleOption).toHaveAttribute('data-state', 'checked');
    // Radix ItemIndicator renders a span when item is checked; look for Check SVG inside the item
    const svgsInOption = appleOption.querySelectorAll('svg');
    expect(svgsInOption.length).toBeGreaterThan(0);
  });
});
