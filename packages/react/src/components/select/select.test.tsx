/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './select.js';

function BasicSelect({
  value,
  onValueChange,
  disabled,
}: {
  value?: string;
  onValueChange?: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder="Choose..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana" disabled>Banana</SelectItem>
        <SelectItem value="delete" tone="danger">Delete account</SelectItem>
      </SelectContent>
    </Select>
  );
}

describe('Select', () => {
  test('renders trigger with placeholder when no value', () => {
    render(<BasicSelect />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Choose...')).toBeInTheDocument();
  });

  test('clicking trigger opens content; options become visible', async () => {
    const user = userEvent.setup();
    render(<BasicSelect />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Delete account' })).toBeInTheDocument();
  });

  test('selecting an item commits value via onValueChange', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<BasicSelect onValueChange={onValueChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'Apple' }));
    expect(onValueChange).toHaveBeenCalledWith('apple');
  });

  test('disabled prop disables the trigger', () => {
    render(<BasicSelect disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  test('disabled item is not selectable', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<BasicSelect onValueChange={onValueChange} />);
    await user.click(screen.getByRole('combobox'));
    const banana = screen.getByRole('option', { name: 'Banana' });
    expect(banana).toHaveAttribute('data-disabled');
    await user.click(banana);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  test('tone="danger" item has danger text colour class', async () => {
    const user = userEvent.setup();
    render(<BasicSelect />);
    await user.click(screen.getByRole('combobox'));
    const dangerItem = screen.getByRole('option', { name: 'Delete account' });
    expect(dangerItem.className).toMatch(/text-\[#C8322B\]/);
  });

  test('forwardRef on SelectTrigger reaches the underlying button', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(
      <Select>
        <SelectTrigger ref={ref}>
          <SelectValue placeholder="..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="x">X</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  test('groups and labels render correctly', async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose region" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Americas</SelectLabel>
            <SelectItem value="us">United States</SelectItem>
          </SelectGroup>
          <SelectSeparator />
        </SelectContent>
      </Select>,
    );
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'United States' })).toBeInTheDocument();
  });
});
