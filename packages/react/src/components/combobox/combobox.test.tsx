/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import {
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
} from './combobox.js';

function BasicCombobox({
  value,
  onValueChange,
  defaultValue,
}: {
  value?: string;
  onValueChange?: (v: string) => void;
  defaultValue?: string;
}) {
  return (
    <Combobox value={value} onValueChange={onValueChange} defaultValue={defaultValue}>
      <ComboboxTrigger>
        <ComboboxValue placeholder="Pick a framework..." />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Filter..." />
        <ComboboxList>
          <ComboboxEmpty>Nothing matched.</ComboboxEmpty>
          <ComboboxGroup heading="Frontend">
            <ComboboxItem value="react">React</ComboboxItem>
            <ComboboxItem value="vue">Vue</ComboboxItem>
            <ComboboxItem value="svelte">Svelte</ComboboxItem>
          </ComboboxGroup>
          <ComboboxGroup heading="Backend">
            <ComboboxItem value="express" disabled>
              Express (disabled)
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

describe('Combobox', () => {
  test('renders trigger; click opens content; search input visible', async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    // The filter input should be visible
    const filterInput = screen.getByPlaceholderText('Filter...');
    expect(filterInput).toBeInTheDocument();

    // Items should be visible
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vue')).toBeInTheDocument();
  });

  test('typing filters items (case-insensitive)', async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);

    await user.click(screen.getByRole('combobox'));
    const filterInput = screen.getByPlaceholderText('Filter...');
    await user.type(filterInput, 'vue');

    // Vue should still be visible
    await waitFor(() => {
      expect(screen.getByText('Vue')).toBeInTheDocument();
    });

    // React and Svelte should be removed from the DOM by cmdk filtering
    await waitFor(() => {
      expect(screen.queryByText('React')).toBeNull();
    });
  });

  test('selecting an item commits value via onValueChange; popover closes', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<BasicCombobox onValueChange={onValueChange} />);

    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('React')).toBeInTheDocument();

    await user.click(screen.getByText('React'));

    expect(onValueChange).toHaveBeenCalledWith('react');

    // After selection popover should close — filter input gone
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Filter...')).not.toBeInTheDocument();
    });
  });

  test('empty filter shows ComboboxEmpty', async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);

    await user.click(screen.getByRole('combobox'));
    const filterInput = screen.getByPlaceholderText('Filter...');
    await user.type(filterInput, 'xyznonexistent');

    await waitFor(() => {
      expect(screen.getByText('Nothing matched.')).toBeInTheDocument();
    });
  });

  test('disabled item is not selectable', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<BasicCombobox onValueChange={onValueChange} />);

    await user.click(screen.getByRole('combobox'));

    const disabledItem = screen.getByText('Express (disabled)');
    // Verify the element has the disabled attribute
    const cmdkItem = disabledItem.closest('[data-disabled]');
    expect(cmdkItem).toBeTruthy();

    await user.click(disabledItem);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  test('ComboboxValue renders placeholder when no value; renders label when selected', async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);

    // Placeholder shown when no value
    expect(screen.getByText('Pick a framework...')).toBeInTheDocument();

    // Open and select React
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('React'));

    // After selection, the trigger should show "React" as the label
    await waitFor(() => {
      const trigger = screen.getByRole('combobox');
      expect(trigger.textContent).toContain('React');
    });
  });

  test('defaultValue pre-selects without external state', async () => {
    const user = userEvent.setup();
    render(<BasicCombobox defaultValue="vue" />);

    // Open the combobox to register items
    await user.click(screen.getByRole('combobox'));
    // Close it
    await user.keyboard('{Escape}');

    await waitFor(() => {
      // Vue label should be displayed in trigger after items registered
      const trigger = screen.getByRole('combobox');
      expect(trigger.textContent).toContain('Vue');
    });
  });
});
