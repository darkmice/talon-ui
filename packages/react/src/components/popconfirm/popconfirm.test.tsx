/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { Popconfirm } from './popconfirm.js';

function renderPopconfirm(props: Partial<React.ComponentProps<typeof Popconfirm>> = {}) {
  return render(
    <Popconfirm
      title="Delete this item?"
      description="This cannot be undone."
      okText="Delete"
      cancelText="Cancel"
      {...props}
    >
      <button type="button">Open</button>
    </Popconfirm>,
  );
}

describe('Popconfirm', () => {
  test('trigger renders; popover closed by default', () => {
    renderPopconfirm();
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
    expect(screen.queryByText('Delete this item?')).not.toBeInTheDocument();
    expect(screen.queryByText('This cannot be undone.')).not.toBeInTheDocument();
  });

  test('clicking trigger opens; title, description, and buttons are visible', async () => {
    renderPopconfirm();
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByText('Delete this item?')).toBeInTheDocument());
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  test('clicking OK fires onConfirm and closes the popover', async () => {
    const onConfirm = vi.fn();
    renderPopconfirm({ onConfirm });
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument());
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() => expect(screen.queryByText('Delete this item?')).not.toBeInTheDocument());
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  test('clicking Cancel fires onCancel and closes the popover', async () => {
    const onCancel = vi.fn();
    renderPopconfirm({ onCancel });
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument());
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() => expect(screen.queryByText('Delete this item?')).not.toBeInTheDocument());
    expect(onCancel).toHaveBeenCalledOnce();
  });

  test('tone="danger" renders OK button with danger variant classes', async () => {
    renderPopconfirm({ tone: 'danger', okText: 'Confirm' });
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument());
    const okBtn = screen.getByRole('button', { name: 'Confirm' });
    // danger variant applies bg-danger or similar token class
    expect(okBtn.className).toMatch(/danger/);
  });

  test('confirming={true} puts loading state on the OK button', async () => {
    renderPopconfirm({ confirming: true, okText: 'Submit' });
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument());
    const okBtn = screen.getByRole('button', { name: 'Submit' });
    // Button sets aria-busy when loading
    expect(okBtn.getAttribute('aria-busy')).toBe('true');
  });

  test('description is optional — no description paragraph when omitted', async () => {
    render(
      <Popconfirm title="Are you sure?">
        <button type="button">Trigger</button>
      </Popconfirm>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));
    await waitFor(() => expect(screen.getByText('Are you sure?')).toBeInTheDocument());
    // No secondary text element
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBe(1);
  });
});
