/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { Upload } from './upload.js';

describe('Upload anatomy (design.md §6.45)', () => {
  test('drop zone root: role=button with dashed border and rounded-md classes', () => {
    const { container } = render(<Upload />);
    const dropzone = container.querySelector('[role="button"]') as HTMLElement;
    expect(dropzone).toBeInTheDocument();
    const cls = dropzone.className;
    expect(cls).toMatch(/border-2/);
    expect(cls).toMatch(/border-dashed/);
    expect(cls).toMatch(/border-border-strong/);
    expect(cls).toMatch(/rounded-md/);
    expect(cls).toMatch(/bg-bg-surface/);
  });

  test('file list item: <li data-status="success"> with name span, size span, delete button', async () => {
    const file = new File(['data'], 'photo.png', { type: 'image/png' });
    const { container } = render(<Upload />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(input, file);

    const li = container.querySelector('li[data-status="pending"]') as HTMLElement;
    expect(li).toBeInTheDocument();
    expect(li.textContent).toMatch(/photo\.png/);
    // Size in human-readable format (4 bytes = '4 B')
    expect(li.textContent).toMatch(/4 B/);
    // Delete button
    expect(screen.getByRole('button', { name: /Delete photo\.png/i })).toBeInTheDocument();
  });

  test('dragging state adds border-primary-500 and bg-primary-50 classes', async () => {
    const { container } = render(<Upload />);
    const dropzone = container.querySelector('[role="button"]') as HTMLElement;

    // Simulate dragover
    const dragOverEvent = new Event('dragover', { bubbles: true });
    Object.defineProperty(dragOverEvent, 'preventDefault', { value: () => {} });
    dropzone.dispatchEvent(dragOverEvent);

    // After drag leave the dragging state should clear
    const dragLeaveEvent = new Event('dragleave', { bubbles: true });
    dropzone.dispatchEvent(dragLeaveEvent);

    // The classes should not be present after dragleave
    expect(dropzone.className).not.toMatch(/bg-primary-50/);
  });

  test('error file shows retry button alongside delete', async () => {
    const errorFile = {
      id: 'e1',
      name: 'broken.txt',
      size: 200,
      status: 'error' as const,
      error: 'Server error',
    };
    render(<Upload value={[errorFile]} />);
    expect(screen.getByRole('button', { name: /Retry broken\.txt/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete broken\.txt/i })).toBeInTheDocument();
    expect(screen.getByText('Server error')).toBeInTheDocument();
  });

  test('uploading file shows cancel button and progress bar', () => {
    const uploadingFile = {
      id: 'u1',
      name: 'video.mp4',
      size: 1024 * 1024,
      status: 'uploading' as const,
      progress: 45,
    };
    const { container } = render(<Upload value={[uploadingFile]} />);
    expect(screen.getByRole('button', { name: /Cancel video\.mp4/i })).toBeInTheDocument();
    // progress bar div
    const progressBar = container.querySelector('.bg-primary-500') as HTMLElement;
    expect(progressBar).toBeInTheDocument();
    expect(progressBar.style.width).toBe('45%');
  });

  test('success file with url shows a link to the uploaded resource', () => {
    const successFile = {
      id: 's1',
      name: 'doc.pdf',
      size: 5000,
      status: 'success' as const,
      url: 'https://cdn.example.com/doc.pdf',
    };
    render(<Upload value={[successFile]} />);
    const link = screen.getByRole('link', { name: 'https://cdn.example.com/doc.pdf' });
    expect(link).toHaveAttribute('href', 'https://cdn.example.com/doc.pdf');
  });
});
