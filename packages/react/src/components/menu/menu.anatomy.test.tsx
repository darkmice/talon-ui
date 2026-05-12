/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { Pencil } from 'lucide-react';
import { Menu, MenuTrigger, MenuContent, MenuItem } from './menu.js';

async function openMenu() {
  render(
    <Menu>
      <MenuTrigger asChild>
        <button type="button">Trigger</button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem icon={<Pencil data-testid="icon-pencil" />} shortcut="⌘E">Edit</MenuItem>
        <MenuItem>Plain</MenuItem>
      </MenuContent>
    </Menu>,
  );
  await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));
  await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());
}

describe('Menu anatomy (design.md §6.34)', () => {
  test('open content has role="menu" with bg-bg-surface, border-border, shadow-pop classes', async () => {
    await openMenu();
    const menu = screen.getByRole('menu');
    expect(menu.tagName).toBe('DIV');
    expect(menu.className).toMatch(/bg-bg-surface/);
    expect(menu.className).toMatch(/border-border/);
    expect(menu.className).toMatch(/shadow-pop/);
    expect(menu.className).toMatch(/min-w-\[160px\]/);
    expect(menu.className).toMatch(/max-w-\[320px\]/);
  });

  test('MenuItem renders div[role=menuitem] with icon span + label span + optional shortcut span', async () => {
    await openMenu();
    const editItem = screen.getByRole('menuitem', { name: /Edit/ });
    expect(editItem.tagName).toBe('DIV');
    // icon wrapper span
    const spans = editItem.querySelectorAll('span');
    // At least: icon span, label span, shortcut span
    expect(spans.length).toBeGreaterThanOrEqual(3);
    // shortcut span contains the keyboard shortcut
    const shortcutSpan = Array.from(spans).find(s => s.textContent === '⌘E');
    expect(shortcutSpan).toBeDefined();
    expect(shortcutSpan!.className).toMatch(/font-mono/);
  });
});
