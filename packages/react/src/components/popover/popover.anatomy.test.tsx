/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from './popover.js';

async function renderOpenPopover() {
  const ref = { current: null as HTMLDivElement | null };
  render(
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">Trigger</button>
      </PopoverTrigger>
      <PopoverContent ref={ref}>
        <PopoverClose />
        <p>Anatomy content</p>
      </PopoverContent>
    </Popover>,
  );
  await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));
  await waitFor(() => expect(ref.current).not.toBeNull());
  return ref.current!;
}

describe('Popover anatomy (design.md §6.35)', () => {
  test('open content has role="dialog" and required design token classes', async () => {
    const contentEl = await renderOpenPopover();
    expect(contentEl.getAttribute('role')).toBe('dialog');
    expect(contentEl.className).toMatch(/bg-bg-surface/);
    expect(contentEl.className).toMatch(/border/);
    expect(contentEl.className).toMatch(/border-border/);
    expect(contentEl.className).toMatch(/shadow-pop/);
    expect(contentEl.className).toMatch(/rounded-md/);
  });

  test('close button has aria-label="Close" and X icon', async () => {
    await renderOpenPopover();
    const closeBtn = screen.getByRole('button', { name: 'Close' });
    expect(closeBtn).toBeInTheDocument();
    expect(closeBtn.getAttribute('aria-label')).toBe('Close');
    // X icon rendered as SVG inside the button
    const svg = closeBtn.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('aria-hidden')).toBe('true');
  });
});
