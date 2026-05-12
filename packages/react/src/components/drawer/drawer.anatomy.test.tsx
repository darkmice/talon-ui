/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
} from './drawer.js';

async function renderOpenDrawer(side?: 'right' | 'left' | 'top' | 'bottom') {
  const ref = { current: null as HTMLDivElement | null };
  render(
    <Drawer>
      <DrawerTrigger asChild>
        <button type="button">Trigger</button>
      </DrawerTrigger>
      <DrawerContent ref={ref} side={side}>
        <DrawerHeader>
          <DrawerTitle>Anatomy title</DrawerTitle>
          <DrawerDescription>Anatomy description</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>Anatomy content</p>
        </DrawerBody>
        <DrawerFooter>
          <span>Footer</span>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>,
  );
  await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));
  await waitFor(() => expect(ref.current).not.toBeNull());
  return ref.current!;
}

describe('Drawer anatomy (design.md §6.37)', () => {
  test('open drawer has role="dialog" with side-specific positional classes (right default)', async () => {
    const contentEl = await renderOpenDrawer();
    expect(contentEl.getAttribute('role')).toBe('dialog');
    // default side=right: top-0 right-0 h-full
    expect(contentEl.className).toMatch(/top-0/);
    expect(contentEl.className).toMatch(/right-0/);
    expect(contentEl.className).toMatch(/h-full/);
    expect(contentEl.className).toMatch(/bg-bg-surface/);
    expect(contentEl.className).toMatch(/shadow-\[var\(--tp-shadow-modal\)\]/);
  });

  test('DrawerHeader has border-b border-border; DrawerFooter has border-t border-border', async () => {
    await renderOpenDrawer();
    const allDivs = Array.from(document.querySelectorAll('div'));

    const headerEl = allDivs.find(
      (el) => el.className.includes('border-b') && el.className.includes('border-border') && el.className.includes('p-tp-5'),
    );
    expect(headerEl).not.toBeNull();
    expect(headerEl!.className).toMatch(/border-b/);
    expect(headerEl!.className).toMatch(/border-border/);

    const footerEl = allDivs.find(
      (el) => el.className.includes('border-t') && el.className.includes('border-border') && el.className.includes('flex'),
    );
    expect(footerEl).not.toBeNull();
    expect(footerEl!.className).toMatch(/border-t/);
    expect(footerEl!.className).toMatch(/border-border/);
  });

  test('overlay div has fixed inset-0 and backdrop color class', async () => {
    await renderOpenDrawer();
    const allDivs = Array.from(document.querySelectorAll('div'));
    const overlayEl = allDivs.find(
      (el) => el.className.includes('fixed') && el.className.includes('inset-0'),
    );
    expect(overlayEl).not.toBeNull();
    expect(overlayEl!.className).toMatch(/fixed/);
    expect(overlayEl!.className).toMatch(/inset-0/);
    expect(overlayEl!.className).toMatch(/bg-\[rgba\(15,23,42,0\.4\)\]/);
  });

  test('DrawerBody has flex-1 overflow-y-auto class', async () => {
    await renderOpenDrawer();
    const allDivs = Array.from(document.querySelectorAll('div'));
    const bodyEl = allDivs.find(
      (el) => el.className.includes('flex-1') && el.className.includes('overflow-y-auto'),
    );
    expect(bodyEl).not.toBeNull();
    expect(bodyEl!.className).toMatch(/flex-1/);
    expect(bodyEl!.className).toMatch(/overflow-y-auto/);
  });
});
