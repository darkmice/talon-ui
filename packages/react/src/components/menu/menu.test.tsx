/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import React, { useState } from 'react';
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
} from './menu.js';

function renderMenu(extraItems?: React.ReactNode) {
  return render(
    <Menu>
      <MenuTrigger asChild>
        <button type="button">Open</button>
      </MenuTrigger>
      <MenuContent>
        <MenuLabel>Label</MenuLabel>
        <MenuItem>Item One</MenuItem>
        <MenuItem>Item Two</MenuItem>
        <MenuSeparator />
        <MenuItem tone="danger">Delete</MenuItem>
        {extraItems}
      </MenuContent>
    </Menu>,
  );
}

describe('Menu', () => {
  test('trigger renders; content hidden by default', () => {
    renderMenu();
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  test('clicking trigger opens the menu; items become visible', async () => {
    renderMenu();
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
    expect(screen.getByRole('menuitem', { name: 'Item One' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Item Two' })).toBeInTheDocument();
  });

  test('clicking an item fires its onSelect callback', async () => {
    const onSelect = vi.fn();
    render(
      <Menu>
        <MenuTrigger asChild>
          <button type="button">Open</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem onSelect={onSelect}>Clickable</MenuItem>
        </MenuContent>
      </Menu>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Clickable' })).toBeInTheDocument());
    await userEvent.click(screen.getByRole('menuitem', { name: 'Clickable' }));
    expect(onSelect).toHaveBeenCalledOnce();
  });

  test('disabled item is not interactive (has data-disabled)', async () => {
    const onSelect = vi.fn();
    render(
      <Menu>
        <MenuTrigger asChild>
          <button type="button">Open</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem disabled onSelect={onSelect}>Disabled</MenuItem>
        </MenuContent>
      </Menu>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Disabled' })).toBeInTheDocument());
    const item = screen.getByRole('menuitem', { name: 'Disabled' });
    expect(item).toHaveAttribute('data-disabled');
    await userEvent.click(item);
    expect(onSelect).not.toHaveBeenCalled();
  });

  test('tone="danger" item has text-danger-500 class', async () => {
    renderMenu();
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());
    const deleteItem = screen.getByRole('menuitem', { name: 'Delete' });
    expect(deleteItem.className).toMatch(/text-danger-500/);
  });

  test('MenuCheckboxItem toggles its checked state', async () => {
    function CheckboxMenu() {
      const [checked, setChecked] = useState(false);
      return (
        <Menu>
          <MenuTrigger asChild>
            <button type="button">Open</button>
          </MenuTrigger>
          <MenuContent>
            <MenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
              Toggle
            </MenuCheckboxItem>
          </MenuContent>
        </Menu>
      );
    }
    render(<CheckboxMenu />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('menuitemcheckbox', { name: 'Toggle' })).toBeInTheDocument());
    const checkboxItem = screen.getByRole('menuitemcheckbox', { name: 'Toggle' });
    expect(checkboxItem).toHaveAttribute('data-state', 'unchecked');
    await userEvent.click(checkboxItem);
    // Menu closes after selection; re-open to check state
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('menuitemcheckbox', { name: 'Toggle' })).toBeInTheDocument());
    expect(screen.getByRole('menuitemcheckbox', { name: 'Toggle' })).toHaveAttribute('data-state', 'checked');
  });

  test('MenuRadioGroup renders radio items', async () => {
    render(
      <Menu>
        <MenuTrigger asChild>
          <button type="button">Open</button>
        </MenuTrigger>
        <MenuContent>
          <MenuRadioGroup value="a">
            <MenuRadioItem value="a">Option A</MenuRadioItem>
            <MenuRadioItem value="b">Option B</MenuRadioItem>
          </MenuRadioGroup>
        </MenuContent>
      </Menu>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());
    const radioA = screen.getByRole('menuitemradio', { name: 'Option A' });
    const radioB = screen.getByRole('menuitemradio', { name: 'Option B' });
    expect(radioA).toHaveAttribute('data-state', 'checked');
    expect(radioB).toHaveAttribute('data-state', 'unchecked');
  });
});
