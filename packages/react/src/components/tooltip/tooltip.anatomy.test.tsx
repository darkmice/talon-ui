/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './tooltip.js';

async function renderOpenTooltip() {
  const ref = { current: null as HTMLDivElement | null };
  render(
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button">Trigger</button>
        </TooltipTrigger>
        <TooltipContent ref={ref}>Anatomy tooltip</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );
  await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));
  // Wait until the content div appears in the DOM
  await waitFor(() => expect(ref.current).not.toBeNull());
  return ref.current!;
}

describe('Tooltip anatomy (design.md §6.35)', () => {
  test('TooltipContent root div has design token classes: bg-bg-inverse, text-text-on-primary, rounded-sm', async () => {
    const contentEl = await renderOpenTooltip();
    expect(contentEl.tagName).toBe('DIV');
    expect(contentEl.className).toMatch(/bg-bg-inverse/);
    expect(contentEl.className).toMatch(/text-text-on-primary/);
    expect(contentEl.className).toMatch(/rounded-sm/);
  });

  test('Arrow SVG is rendered inside the tooltip content area with fill-bg-inverse', async () => {
    const contentEl = await renderOpenTooltip();
    // The SVG arrow is rendered inside the content div (as a child span contains svg)
    const svg = contentEl.querySelector('svg');
    expect(svg).not.toBeNull();
    // jsdom SVG className may be SVGAnimatedString; normalise to string
    const svgClass = typeof svg!.getAttribute('class') === 'string'
      ? svg!.getAttribute('class')!
      : String((svg!.className as unknown as SVGAnimatedString).baseVal);
    expect(svgClass).toMatch(/fill-bg-inverse/);
  });
});
