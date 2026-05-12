/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { Modal, ModalTrigger, ModalContent, ModalTitle, ModalDescription } from './modal.js';

async function renderOpenModal() {
  const ref = { current: null as HTMLDivElement | null };
  render(
    <Modal>
      <ModalTrigger asChild>
        <button type="button">Trigger</button>
      </ModalTrigger>
      <ModalContent ref={ref}>
        <ModalTitle>Anatomy title</ModalTitle>
        <ModalDescription>Anatomy description</ModalDescription>
        <p>Anatomy content</p>
      </ModalContent>
    </Modal>,
  );
  await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));
  await waitFor(() => expect(ref.current).not.toBeNull());
  return ref.current!;
}

describe('Modal anatomy (design.md §6.36)', () => {
  test('open modal has role="dialog" with bg-bg-surface shadow and rounded-lg', async () => {
    const contentEl = await renderOpenModal();
    expect(contentEl.getAttribute('role')).toBe('dialog');
    expect(contentEl.className).toMatch(/bg-bg-surface/);
    expect(contentEl.className).toMatch(/shadow-\[var\(--tp-shadow-modal\)\]/);
    expect(contentEl.className).toMatch(/rounded-lg/);
  });

  test('overlay div has fixed inset-0 and backdrop color class', async () => {
    await renderOpenModal();
    // The overlay is rendered inside the portal; query the document for it
    // Radix renders overlay as a div; look for elements with fixed inset-0 class pattern
    const allDivs = Array.from(document.querySelectorAll('div'));
    const overlayEl = allDivs.find(
      (el) => el.className.includes('fixed') && el.className.includes('inset-0'),
    );
    expect(overlayEl).not.toBeNull();
    expect(overlayEl!.className).toMatch(/fixed/);
    expect(overlayEl!.className).toMatch(/inset-0/);
    expect(overlayEl!.className).toMatch(/bg-\[rgba\(15,23,42,0\.4\)\]/);
  });
});
