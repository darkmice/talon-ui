/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose, PopoverArrow } from './popover.js';

function renderPopover(props: { width?: 'sm' | 'md' | 'lg' | 'xl' } = {}) {
  return render(
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">Open popover</button>
      </PopoverTrigger>
      <PopoverContent width={props.width}>
        <p>Popover body text</p>
      </PopoverContent>
    </Popover>,
  );
}

describe('Popover', () => {
  test('trigger renders; content hidden by default', () => {
    renderPopover();
    expect(screen.getByRole('button', { name: 'Open popover' })).toBeInTheDocument();
    expect(screen.queryByText('Popover body text')).not.toBeInTheDocument();
  });

  test('clicking trigger opens content', async () => {
    renderPopover();
    const trigger = screen.getByRole('button', { name: 'Open popover' });
    await userEvent.click(trigger);
    await waitFor(() => expect(screen.getByText('Popover body text')).toBeInTheDocument());
  });

  test('pressing Escape closes content', async () => {
    renderPopover();
    const trigger = screen.getByRole('button', { name: 'Open popover' });
    await userEvent.click(trigger);
    await waitFor(() => expect(screen.getByText('Popover body text')).toBeInTheDocument());
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByText('Popover body text')).not.toBeInTheDocument());
  });

  test('PopoverClose button closes content', async () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button type="button">Open</button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverClose />
          <p>Content with close</p>
        </PopoverContent>
      </Popover>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByText('Content with close')).toBeInTheDocument());
    const closeBtn = screen.getByRole('button', { name: 'Close' });
    await userEvent.click(closeBtn);
    await waitFor(() => expect(screen.queryByText('Content with close')).not.toBeInTheDocument());
  });

  test('width variant "sm" applies w-60', async () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button type="button">Open sm</button>
        </PopoverTrigger>
        <PopoverContent ref={ref} width="sm">
          <p>sm width</p>
        </PopoverContent>
      </Popover>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open sm' }));
    await waitFor(() => expect(ref.current).not.toBeNull());
    expect(ref.current!.className).toMatch(/w-60/);
  });

  test('forwardRef on PopoverContent reaches the underlying div', async () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button type="button">ref test</button>
        </PopoverTrigger>
        <PopoverContent ref={ref}>
          <p>ref content</p>
        </PopoverContent>
      </Popover>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'ref test' }));
    await waitFor(() => expect(ref.current).not.toBeNull());
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  test('PopoverArrow renders inside open popover', async () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button type="button">arrow trigger</button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <p>With arrow</p>
        </PopoverContent>
      </Popover>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'arrow trigger' }));
    await waitFor(() => expect(screen.getByText('With arrow')).toBeInTheDocument());
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });
});
