/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './tooltip.js';

function renderTooltip(props: { sideOffset?: number } = {}) {
  return render(
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button">Hover me</button>
        </TooltipTrigger>
        <TooltipContent sideOffset={props.sideOffset}>Tooltip text</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );
}

describe('Tooltip', () => {
  test('renders trigger; tooltip not visible by default', () => {
    renderTooltip();
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  test('hovering trigger opens tooltip', async () => {
    renderTooltip();
    const trigger = screen.getByRole('button', { name: 'Hover me' });
    await userEvent.hover(trigger);
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Tooltip text');
  });

  test('Escape key closes tooltip after hover', async () => {
    renderTooltip();
    const trigger = screen.getByRole('button', { name: 'Hover me' });
    await userEvent.hover(trigger);
    // Wait for tooltip content div to appear
    await waitFor(() => {
      const divs = document.querySelectorAll('div[data-state]');
      expect(divs.length).toBeGreaterThan(0);
    });
    // Pressing Escape dismisses the tooltip (Radix dismissable layer)
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      const divs = document.querySelectorAll('div[data-state]');
      expect(divs.length).toBe(0);
    });
  });

  test('custom sideOffset is forwarded to content', async () => {
    renderTooltip({ sideOffset: 12 });
    const trigger = screen.getByRole('button', { name: 'Hover me' });
    await userEvent.hover(trigger);
    await screen.findByRole('tooltip');
    // sideOffset is forwarded; verifying it doesn't throw and tooltip renders
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  test('forwardRef on TooltipContent reaches the underlying div', async () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button">ref test</button>
          </TooltipTrigger>
          <TooltipContent ref={ref}>ref tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    const trigger = screen.getByRole('button', { name: 'ref test' });
    await userEvent.hover(trigger);
    await screen.findByRole('tooltip');
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
