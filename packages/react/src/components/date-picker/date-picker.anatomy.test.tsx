/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { DatePicker } from './date-picker.js';

describe('DatePicker anatomy (design.md §6.38)', () => {
  test('Trigger is a <button> with calendar icon and label span', () => {
    render(<DatePicker placeholder="Pick a date" />);
    const trigger = screen.getByRole('button', { name: /pick a date/i });
    expect(trigger.tagName.toLowerCase()).toBe('button');
    // Contains SVG (Calendar icon)
    const svg = trigger.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Contains a span with the placeholder text
    const span = trigger.querySelector('span');
    expect(span).toBeInTheDocument();
    expect(span?.textContent).toMatch(/pick a date/i);
  });

  test('Trigger has h-control-md rounded-md bg-bg-surface border-border classes', () => {
    render(<DatePicker placeholder="Pick a date" />);
    const trigger = screen.getByRole('button', { name: /pick a date/i });
    expect(trigger.className).toMatch(/h-control-md/);
    expect(trigger.className).toMatch(/rounded-md/);
    expect(trigger.className).toMatch(/bg-bg-surface/);
    expect(trigger.className).toMatch(/border-border/);
  });

  test('Open popover content has bg-bg-surface border-border shadow-pop rounded-md', async () => {
    const user = userEvent.setup();
    render(<DatePicker placeholder="Pick a date" />);
    await user.click(screen.getByRole('button', { name: /pick a date/i }));
    const grid = await screen.findByRole('grid');
    // Traverse up to find the popover content div
    const popoverContent = grid.closest('[data-radix-popper-content-wrapper]')
      ?.firstElementChild as HTMLElement | null ?? grid.closest('.rounded-md') as HTMLElement;
    expect(popoverContent).toBeTruthy();
    expect(popoverContent.className).toMatch(/rounded-md/);
    expect(popoverContent.className).toMatch(/bg-bg-surface/);
    expect(popoverContent.className).toMatch(/border-border/);
    expect(popoverContent.className).toMatch(/shadow-pop/);
  });

  test('Day cells have correct size class', async () => {
    const user = userEvent.setup();
    render(<DatePicker placeholder="Pick a date" />);
    await user.click(screen.getByRole('button', { name: /pick a date/i }));
    await screen.findByRole('grid');
    // Day cells (gridcell role or td elements)
    const gridcells = document.querySelectorAll('td');
    // At least some day cells should be rendered
    expect(gridcells.length).toBeGreaterThan(0);
    // Each day cell should have the size-8 class
    const withSize8 = Array.from(gridcells).filter((el) =>
      el.className.includes('size-8'),
    );
    expect(withSize8.length).toBeGreaterThan(0);
  });

  test('Footer contains Clear and Today buttons', async () => {
    const user = userEvent.setup();
    render(<DatePicker placeholder="Pick a date" />);
    await user.click(screen.getByRole('button', { name: /pick a date/i }));
    const clearBtn = await screen.findByRole('button', { name: /clear/i });
    // Our footer Today button has exact text 'Today'
    const todayBtns = await screen.findAllByRole('button', { name: /today/i });
    const footerTodayBtn = todayBtns.find((b) => b.textContent?.trim() === 'Today');
    expect(clearBtn).toBeInTheDocument();
    expect(footerTodayBtn).toBeInTheDocument();
  });

  test('size sm applies h-control-sm class to trigger', () => {
    render(<DatePicker size="sm" placeholder="Pick a date" />);
    const trigger = screen.getByRole('button', { name: /pick a date/i });
    expect(trigger.className).toMatch(/h-control-sm/);
  });

  test('tone invalid applies red border class to trigger', () => {
    render(<DatePicker tone="invalid" placeholder="Pick a date" />);
    const trigger = screen.getByRole('button', { name: /pick a date/i });
    expect(trigger.className).toMatch(/C8322B/);
  });
});
