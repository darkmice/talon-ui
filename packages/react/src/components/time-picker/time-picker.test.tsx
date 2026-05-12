/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeAll, afterAll } from 'vitest';
import { TimePicker } from './time-picker.js';

// Freeze Date.now so "Now" button tests are deterministic
const FIXED_HOUR = 10;
const FIXED_MINUTE = 25;
const FIXED_SECOND = 45;

let RealDate: typeof Date;

beforeAll(() => {
  RealDate = globalThis.Date;
  const fixedDate = new RealDate(2026, 0, 1, FIXED_HOUR, FIXED_MINUTE, FIXED_SECOND);
  // @ts-expect-error partial mock
  globalThis.Date = class extends RealDate {
    constructor(...args: ConstructorParameters<typeof Date>) {
      if (args.length === 0) {
        super(fixedDate.getTime());
      } else {
        // @ts-expect-error spread
        super(...args);
      }
    }
  };
});

afterAll(() => {
  globalThis.Date = RealDate;
});

describe('TimePicker behaviour', () => {
  test('renders trigger with placeholder "HH:MM" by default', () => {
    render(<TimePicker />);
    const trigger = screen.getByRole('button');
    expect(trigger.textContent).toMatch(/HH:MM/);
  });

  test('clicking trigger opens popover; two columns (hours + minutes) appear', async () => {
    const user = userEvent.setup();
    render(<TimePicker />);
    await user.click(screen.getByRole('button'));
    const listboxes = await screen.findAllByRole('listbox');
    expect(listboxes).toHaveLength(2);
    // Hours column
    expect(screen.getByRole('listbox', { name: 'Hours' })).toBeInTheDocument();
    // Minutes column
    expect(screen.getByRole('listbox', { name: 'Minutes' })).toBeInTheDocument();
  });

  test('withSeconds prop adds a third column', async () => {
    const user = userEvent.setup();
    render(<TimePicker withSeconds />);
    await user.click(screen.getByRole('button'));
    const listboxes = await screen.findAllByRole('listbox');
    expect(listboxes).toHaveLength(3);
    expect(screen.getByRole('listbox', { name: 'Seconds' })).toBeInTheDocument();
  });

  test('clicking a value in the hour column fires onValueChange with "HH:MM"', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimePicker onValueChange={onChange} />);
    await user.click(screen.getByRole('button'));
    // Click hour 5 option
    const hoursCol = screen.getByRole('listbox', { name: 'Hours' });
    const option5 = within(hoursCol).getByRole('option', { name: '05' });
    await user.click(option5);
    expect(onChange).toHaveBeenCalledWith('05:00');
  });

  test('defaultValue="14:30" → trigger shows "14:30"; hour option 14 has aria-selected=true', async () => {
    const user = userEvent.setup();
    render(<TimePicker defaultValue="14:30" />);
    const trigger = screen.getByRole('button');
    expect(trigger.textContent).toMatch(/14:30/);
    // Open popover
    await user.click(trigger);
    const hoursCol = screen.getByRole('listbox', { name: 'Hours' });
    const opt14 = within(hoursCol).getByRole('option', { name: '14' });
    expect(opt14).toHaveAttribute('aria-selected', 'true');
  });

  test('clicking "Now" fires onValueChange with current local time formatted', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimePicker onValueChange={onChange} />);
    await user.click(screen.getByRole('button'));
    const nowBtn = await screen.findByRole('button', { name: /now/i });
    await user.click(nowBtn);
    expect(onChange).toHaveBeenCalledWith(
      `${String(FIXED_HOUR).padStart(2, '0')}:${String(FIXED_MINUTE).padStart(2, '0')}`,
    );
  });

  test('clicking "Clear" fires onValueChange with empty string', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimePicker value="09:00" onValueChange={onChange} />);
    await user.click(screen.getByRole('button'));
    const clearBtn = await screen.findByRole('button', { name: /clear/i });
    await user.click(clearBtn);
    expect(onChange).toHaveBeenCalledWith('');
  });

  test('disabled prop disables the trigger button', () => {
    render(<TimePicker disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('clicking minute column fires onValueChange preserving current hour', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimePicker defaultValue="09:00" onValueChange={onChange} />);
    await user.click(screen.getByRole('button'));
    const minutesCol = screen.getByRole('listbox', { name: 'Minutes' });
    const opt30 = within(minutesCol).getByRole('option', { name: '30' });
    await user.click(opt30);
    expect(onChange).toHaveBeenCalledWith('09:30');
  });

  test('withSeconds: clicking "Now" includes seconds in the value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimePicker withSeconds onValueChange={onChange} />);
    await user.click(screen.getByRole('button'));
    const nowBtn = await screen.findByRole('button', { name: /now/i });
    await user.click(nowBtn);
    expect(onChange).toHaveBeenCalledWith(
      `${String(FIXED_HOUR).padStart(2, '0')}:${String(FIXED_MINUTE).padStart(2, '0')}:${String(FIXED_SECOND).padStart(2, '0')}`,
    );
  });
});
