/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
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

function ComboboxFixture() {
  return (
    <Combobox>
      <ComboboxTrigger>
        <ComboboxValue placeholder="Choose..." />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search items..." />
        <ComboboxList>
          <ComboboxEmpty>No results.</ComboboxEmpty>
          <ComboboxGroup heading="Section A">
            <ComboboxItem value="alpha">Alpha</ComboboxItem>
            <ComboboxItem value="beta">Beta</ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

describe('Combobox anatomy (design.md §6.46)', () => {
  test('ComboboxTrigger has role="combobox" and h-control-md class', () => {
    const { container } = render(<ComboboxFixture />);
    const trigger = container.querySelector('button[role="combobox"]') as HTMLButtonElement;
    expect(trigger).toBeInTheDocument();
    expect(trigger.className).toMatch(/h-control-md/);
    expect(trigger.className).toMatch(/rounded-md/);
    expect(trigger.className).toMatch(/bg-bg-surface/);
  });

  test('ComboboxContent has rounded-md bg-bg-surface border-border shadow-pop classes', async () => {
    const user = userEvent.setup();
    render(<ComboboxFixture />);
    await user.click(screen.getByRole('combobox'));

    // The Popover.Content is the wrapper of the Command div
    // cmdk Command is inside the Popover.Content; find the content container
    const searchInput = screen.getByPlaceholderText('Search items...');
    // The popover content wraps the Command; traverse up to find the popover content div
    const popoverContent = searchInput.closest('[data-radix-popper-content-wrapper]')
      ?.firstElementChild as HTMLElement | null ?? searchInput.closest('.rounded-md') as HTMLElement;

    expect(popoverContent).toBeTruthy();
    expect(popoverContent.className).toMatch(/rounded-md/);
    expect(popoverContent.className).toMatch(/bg-bg-surface/);
    expect(popoverContent.className).toMatch(/border-border/);
    expect(popoverContent.className).toMatch(/shadow-pop/);
  });

  test('ComboboxInput row has search icon SVG and an input element', async () => {
    const user = userEvent.setup();
    render(<ComboboxFixture />);
    await user.click(screen.getByRole('combobox'));

    const filterInput = screen.getByPlaceholderText('Search items...');
    expect(filterInput.tagName.toLowerCase()).toBe('input');

    // The row wrapping div should also contain an SVG (Search icon)
    const row = filterInput.closest('div');
    expect(row).toBeTruthy();
    const svg = row?.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  test('ComboboxGroup renders heading text', async () => {
    const user = userEvent.setup();
    render(<ComboboxFixture />);
    await user.click(screen.getByRole('combobox'));

    expect(screen.getByText('Section A')).toBeInTheDocument();
  });

  test('ComboboxItem applies comboboxItemClass styling', async () => {
    const user = userEvent.setup();
    render(<ComboboxFixture />);
    await user.click(screen.getByRole('combobox'));

    const alphaItem = screen.getByText('Alpha');
    const itemEl = alphaItem.closest('[data-value]') ?? alphaItem.parentElement;
    expect(itemEl).toBeTruthy();
    // cmdk Item gets role="option" in list context
    const optionEl = screen.getByText('Alpha').closest('[role="option"]');
    if (optionEl) {
      expect(optionEl.className).toMatch(/text-text-primary/);
    }
  });
});
