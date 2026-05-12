/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { TimePicker } from './time-picker.js';

describe('TimePicker anatomy (design.md §6.39)', () => {
  test('Trigger is a <button> with clock icon and label span', () => {
    render(<TimePicker />);
    const trigger = screen.getByRole('button');
    expect(trigger.tagName.toLowerCase()).toBe('button');
    // Contains SVG (Clock icon)
    const svg = trigger.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Contains a span with the placeholder text
    const span = trigger.querySelector('span');
    expect(span).toBeInTheDocument();
    expect(span?.textContent).toMatch(/HH:MM/);
  });

  test('Trigger has h-control-md rounded-md bg-bg-surface border-border classes', () => {
    render(<TimePicker />);
    const trigger = screen.getByRole('button');
    expect(trigger.className).toMatch(/h-control-md/);
    expect(trigger.className).toMatch(/rounded-md/);
    expect(trigger.className).toMatch(/bg-bg-surface/);
    expect(trigger.className).toMatch(/border-border/);
  });

  test('Open popover: outer div has bg-bg-surface border-border shadow-pop rounded-md, contains 2 listboxes', async () => {
    const user = userEvent.setup();
    render(<TimePicker />);
    await user.click(screen.getByRole('button'));
    const listboxes = await screen.findAllByRole('listbox');
    expect(listboxes).toHaveLength(2);
    // Traverse up to the popover content
    const popoverContent = listboxes[0]!.closest('[data-radix-popper-content-wrapper]')
      ?.firstElementChild as HTMLElement | null ??
      listboxes[0]!.closest('.rounded-md') as HTMLElement;
    expect(popoverContent).toBeTruthy();
    expect(popoverContent.className).toMatch(/rounded-md/);
    expect(popoverContent.className).toMatch(/bg-bg-surface/);
    expect(popoverContent.className).toMatch(/border-border/);
    expect(popoverContent.className).toMatch(/shadow-pop/);
  });

  test('Each option has role="option" and tabular-nums class', async () => {
    const user = userEvent.setup();
    render(<TimePicker defaultValue="06:15" />);
    await user.click(screen.getByRole('button'));
    const options = await screen.findAllByRole('option');
    expect(options.length).toBeGreaterThan(0);
    // Check tabular-nums class on options
    options.forEach((opt) => {
      expect(opt.className).toMatch(/tabular-nums/);
    });
  });

  test('withSeconds: open popover contains 3 listboxes', async () => {
    const user = userEvent.setup();
    render(<TimePicker withSeconds />);
    await user.click(screen.getByRole('button'));
    const listboxes = await screen.findAllByRole('listbox');
    expect(listboxes).toHaveLength(3);
  });

  test('size sm applies h-control-sm class to trigger', () => {
    render(<TimePicker size="sm" />);
    const trigger = screen.getByRole('button');
    expect(trigger.className).toMatch(/h-control-sm/);
  });

  test('tone invalid applies red border class to trigger', () => {
    render(<TimePicker tone="invalid" />);
    const trigger = screen.getByRole('button');
    expect(trigger.className).toMatch(/C8322B/);
  });

  test('Footer contains Now and Clear buttons', async () => {
    const user = userEvent.setup();
    render(<TimePicker />);
    await user.click(screen.getByRole('button'));
    const nowBtn = await screen.findByRole('button', { name: /now/i });
    const clearBtn = await screen.findByRole('button', { name: /clear/i });
    expect(nowBtn).toBeInTheDocument();
    expect(clearBtn).toBeInTheDocument();
  });
});
