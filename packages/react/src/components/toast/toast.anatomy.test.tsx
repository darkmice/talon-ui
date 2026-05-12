/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { ToastProvider } from './toast.js';
import { useToast } from './use-toast.js';

// Minimal harness
function Harness({ tone }: { tone?: 'info' | 'success' | 'warning' | 'error' }) {
  return (
    <ToastProvider>
      <Inner tone={tone} />
    </ToastProvider>
  );
}

function Inner({ tone }: { tone?: 'info' | 'success' | 'warning' | 'error' }) {
  const { toast } = useToast();
  return (
    <button
      type="button"
      onClick={() => toast({ title: 'Anatomy toast', tone })}
    >
      Show
    </button>
  );
}

describe('Toast anatomy (design.md §6.44)', () => {
  test('Toast root is an <li> element with bg-bg-surface, border-border, shadow-pop, and rounded-md', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Show' }));

    const li = document.querySelector('li') as HTMLElement;
    expect(li).not.toBeNull();
    expect(li.className).toMatch(/bg-bg-surface/);
    expect(li.className).toMatch(/border-border/);
    expect(li.className).toMatch(/shadow-pop/);
    expect(li.className).toMatch(/rounded-md/);
  });

  test('Viewport is an <ol> element fixed to top-4 right-4', () => {
    render(<Harness />);
    const ol = document.querySelector('ol') as HTMLElement;
    expect(ol).not.toBeNull();
    expect(ol.className).toMatch(/fixed/);
    expect(ol.className).toMatch(/top-4/);
    expect(ol.className).toMatch(/right-4/);
  });

  test('Toast root has max-w-[360px] matching spec width', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Show' }));

    const li = document.querySelector('li') as HTMLElement;
    expect(li.className).toMatch(/max-w-\[360px\]/);
  });

  test('Close button has aria-label="Close"', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Show' }));

    const closeBtn = screen.getByRole('button', { name: 'Close' });
    expect(closeBtn).toBeInTheDocument();
  });

  test('tone="success" icon span has text-status-done-fg class', async () => {
    render(<Harness tone="success" />);
    await userEvent.click(screen.getByRole('button', { name: 'Show' }));

    const iconSpan = document.querySelector('span[aria-hidden]') as HTMLElement;
    expect(iconSpan).not.toBeNull();
    expect(iconSpan.className).toMatch(/text-status-done-fg/);
  });

  test('tone="warning" icon span has text-status-pending-fg class', async () => {
    render(<Harness tone="warning" />);
    await userEvent.click(screen.getByRole('button', { name: 'Show' }));

    const iconSpan = document.querySelector('span[aria-hidden]') as HTMLElement;
    expect(iconSpan).not.toBeNull();
    expect(iconSpan.className).toMatch(/text-status-pending-fg/);
  });
});
