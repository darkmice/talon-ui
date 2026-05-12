/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, afterEach } from 'vitest';
import { Popconfirm } from './popconfirm.js';

async function renderOpen(props: Partial<React.ComponentProps<typeof Popconfirm>> = {}) {
  const ref = { current: null as HTMLDivElement | null };
  render(
    <Popconfirm
      ref={ref}
      title="Confirm action"
      description="Are you sure?"
      {...props}
    >
      <button type="button">Trigger</button>
    </Popconfirm>,
  );
  await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));
  await waitFor(() => expect(ref.current).not.toBeNull());
  return ref.current!;
}

describe('Popconfirm anatomy (design.md §6.35)', () => {
  afterEach(() => cleanup());
  test('open content has role="dialog" and required design token classes', async () => {
    const contentEl = await renderOpen();
    expect(contentEl.getAttribute('role')).toBe('dialog');
    expect(contentEl.className).toMatch(/bg-bg-surface/);
    expect(contentEl.className).toMatch(/border/);
    expect(contentEl.className).toMatch(/border-border/);
    expect(contentEl.className).toMatch(/shadow-pop/);
    expect(contentEl.className).toMatch(/rounded-md/);
    expect(contentEl.className).toMatch(/w-72/);
  });

  test('icon defaults to Info SVG for default tone with primary-500 colour', async () => {
    // Default tone → Info icon
    const defaultContent = await renderOpen({ tone: 'default' });
    // Both icons render as SVG — verify an svg exists and the icon class matches tone
    const svgs = defaultContent.querySelectorAll('svg[aria-hidden]');
    expect(svgs.length).toBeGreaterThan(0);
    // SVGAnimatedString — use getAttribute('class') to get a plain string
    expect(svgs[0]!.getAttribute('class')).toMatch(/text-primary-500/);
  });

  test('icon uses AlertTriangle SVG with danger-500 colour for danger tone', async () => {
    // Danger tone → AlertTriangle + danger colour class
    const dangerContent = await renderOpen({ tone: 'danger' });
    const dangerSvgs = dangerContent.querySelectorAll('svg[aria-hidden]');
    expect(dangerSvgs.length).toBeGreaterThan(0);
    expect(dangerSvgs[0]!.getAttribute('class')).toMatch(/text-danger-500/);
  });
});
