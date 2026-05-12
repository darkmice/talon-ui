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

// ---------------------------------------------------------------------------
// Harness: provides ToastProvider and a trigger button
// ---------------------------------------------------------------------------
interface HarnessProps {
  onMount?: (api: ReturnType<typeof useToast>) => void;
  triggerProps?: {
    title?: string;
    description?: string;
    tone?: 'info' | 'success' | 'warning' | 'error';
    id?: string;
  };
  max?: number;
}

function Harness({ onMount, triggerProps = { title: 'Test toast' }, max }: HarnessProps) {
  return (
    <ToastProvider max={max}>
      <HarnessInner onMount={onMount} triggerProps={triggerProps} />
    </ToastProvider>
  );
}

function HarnessInner({
  onMount,
  triggerProps = { title: 'Test toast' },
}: Omit<HarnessProps, 'max'>) {
  const api = useToast();
  // expose API via callback on first render
  if (onMount) {
    onMount(api);
  }
  return (
    <button
      type="button"
      onClick={() =>
        api.toast({
          title: triggerProps.title,
          description: triggerProps.description,
          tone: triggerProps.tone,
          id: triggerProps.id,
        })
      }
    >
      Trigger toast
    </button>
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('Toast', () => {
  test('ToastProvider renders without any toasts initially', () => {
    render(<Harness />);
    // No toast list items initially (viewport is <ol>)
    const viewport = document.querySelector('ol');
    expect(viewport).toBeInTheDocument();
    expect(viewport!.querySelectorAll('li')).toHaveLength(0);
  });

  test('calling toast({ title }) adds a toast; title is visible', async () => {
    render(<Harness triggerProps={{ title: 'Hello World' }} />);
    await userEvent.click(screen.getByRole('button', { name: 'Trigger toast' }));
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('toast with description renders description text', async () => {
    render(
      <Harness
        triggerProps={{ title: 'Saved', description: 'Your changes are persisted.' }}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Trigger toast' }));
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Your changes are persisted.')).toBeInTheDocument();
  });

  test('toast tone="error" applies error icon class (text-status-blocked-fg)', async () => {
    render(<Harness triggerProps={{ title: 'Error', tone: 'error' }} />);
    await userEvent.click(screen.getByRole('button', { name: 'Trigger toast' }));
    // The icon wrapper span gets the tone class
    const iconSpan = document.querySelector('span[aria-hidden]') as HTMLElement;
    expect(iconSpan).not.toBeNull();
    expect(iconSpan.className).toMatch(/text-status-blocked-fg/);
  });

  test('dismiss(id) removes the specific toast', async () => {
    let capturedId: string | null = null;

    function DismissHarness() {
      return (
        <ToastProvider>
          <DismissInner
            onReady={(_a) => {
              // api exposed for potential future assertions
            }}
            onId={(id) => {
              capturedId = id;
            }}
          />
        </ToastProvider>
      );
    }

    function DismissInner({
      onReady,
      onId,
    }: {
      onReady: (a: ReturnType<typeof useToast>) => void;
      onId: (id: string) => void;
    }) {
      const a = useToast();
      onReady(a);
      return (
        <>
          <button
            type="button"
            onClick={() => {
              const id = a.toast({ title: 'Dismiss me' });
              onId(id);
            }}
          >
            Add
          </button>
          <button type="button" onClick={() => a.dismiss(capturedId!)}>
            Dismiss
          </button>
        </>
      );
    }

    render(<DismissHarness />);
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Dismiss me')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument();
  });

  test('dismiss() with no id clears all toasts', async () => {
    function ClearHarness() {
      return (
        <ToastProvider>
          <ClearInner />
        </ToastProvider>
      );
    }
    function ClearInner() {
      const { toast, dismiss } = useToast();
      return (
        <>
          <button type="button" onClick={() => toast({ title: 'First' })}>
            Add First
          </button>
          <button type="button" onClick={() => toast({ title: 'Second' })}>
            Add Second
          </button>
          <button type="button" onClick={() => dismiss()}>
            Clear all
          </button>
        </>
      );
    }

    render(<ClearHarness />);
    await userEvent.click(screen.getByRole('button', { name: 'Add First' }));
    await userEvent.click(screen.getByRole('button', { name: 'Add Second' }));
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(screen.queryByText('First')).not.toBeInTheDocument();
    expect(screen.queryByText('Second')).not.toBeInTheDocument();
  });

  test('max=2: posting 3 toasts keeps only the newest 2', async () => {
    function MaxHarness() {
      return (
        <ToastProvider max={2}>
          <MaxInner />
        </ToastProvider>
      );
    }
    function MaxInner() {
      const { toast } = useToast();
      return (
        <>
          <button type="button" onClick={() => toast({ title: 'Toast 1' })}>
            T1
          </button>
          <button type="button" onClick={() => toast({ title: 'Toast 2' })}>
            T2
          </button>
          <button type="button" onClick={() => toast({ title: 'Toast 3' })}>
            T3
          </button>
        </>
      );
    }

    render(<MaxHarness />);
    await userEvent.click(screen.getByRole('button', { name: 'T1' }));
    await userEvent.click(screen.getByRole('button', { name: 'T2' }));
    await userEvent.click(screen.getByRole('button', { name: 'T3' }));

    // Only newest 2 should be in state / DOM
    expect(screen.queryByText('Toast 1')).not.toBeInTheDocument();
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
    expect(screen.getByText('Toast 3')).toBeInTheDocument();
  });

  test('useToast outside provider throws an error', () => {
    function BadComponent() {
      useToast();
      return null;
    }
    // Suppress React's error boundary console output
    const originalError = console.error;
    console.error = () => {};
    expect(() => render(<BadComponent />)).toThrow(
      'useToast must be used inside <ToastProvider>',
    );
    console.error = originalError;
  });
});
