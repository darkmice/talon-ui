/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import type { UploadFile } from './upload.types.js';
import { Upload } from './upload.js';

const makeFile = (name = 'hello.txt', content = 'data', type = 'text/plain') =>
  new File([content], name, { type });

/** Extract the last call's first argument from an onChange mock. */
const lastFiles = (fn: ReturnType<typeof vi.fn>): UploadFile[] =>
  fn.mock.calls[fn.mock.calls.length - 1]?.[0] as UploadFile[];

/** Extract the first call's first argument from an onChange mock. */
const firstFiles = (fn: ReturnType<typeof vi.fn>): UploadFile[] =>
  fn.mock.calls[0]?.[0] as UploadFile[];

describe('Upload', () => {
  test('renders drop zone with default prompt and hint', () => {
    render(<Upload />);
    expect(screen.getByText('Click or drag files to upload')).toBeInTheDocument();
    expect(screen.getByText('Up to 10 MB each')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('clicking drop zone triggers the hidden file input click', async () => {
    render(<Upload />);
    const dropzone = screen.getByRole('button');
    const input = dropzone.parentElement!.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');
    await userEvent.click(dropzone);
    expect(clickSpy).toHaveBeenCalled();
  });

  test('selecting a file adds it to the list with status=pending (no onUpload)', async () => {
    const onChange = vi.fn();
    render(<Upload onValueChange={onChange} />);
    const dropzone = screen.getByRole('button');
    const input = dropzone.parentElement!.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(input, makeFile('hello.txt'));
    expect(onChange).toHaveBeenCalledOnce();
    const files = firstFiles(onChange);
    expect(files).toHaveLength(1);
    expect(files[0]!.name).toBe('hello.txt');
    expect(files[0]!.status).toBe('pending');
  });

  test('with onUpload resolving → status transitions to success with url', async () => {
    const onChange = vi.fn();
    const onUpload = vi.fn().mockResolvedValue({ url: 'https://cdn.example.com/hello.txt' });
    render(<Upload onValueChange={onChange} onUpload={onUpload} />);
    const input = screen
      .getByRole('button')
      .parentElement!.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(input, makeFile('hello.txt'));
    await waitFor(() => {
      const files = lastFiles(onChange);
      expect(files[0]!.status).toBe('success');
      expect(files[0]!.url).toBe('https://cdn.example.com/hello.txt');
    });
  });

  test('with onUpload rejecting → status transitions to error with message', async () => {
    const onChange = vi.fn();
    const onUpload = vi.fn().mockRejectedValue(new Error('Server rejected the file.'));
    render(<Upload onValueChange={onChange} onUpload={onUpload} />);
    const input = screen
      .getByRole('button')
      .parentElement!.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(input, makeFile('fail.txt'));
    await waitFor(() => {
      const files = lastFiles(onChange);
      expect(files[0]!.status).toBe('error');
      expect(files[0]!.error).toBe('Server rejected the file.');
    });
  });

  test('delete button removes the file from the list', async () => {
    const onChange = vi.fn();
    render(<Upload onValueChange={onChange} />);
    const input = screen
      .getByRole('button')
      .parentElement!.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(input, makeFile('hello.txt'));

    const deleteBtn = await screen.findByRole('button', { name: /Delete hello\.txt/i });
    await userEvent.click(deleteBtn);
    const files = lastFiles(onChange);
    expect(files).toHaveLength(0);
  });

  test('disabled prop prevents click from opening file picker', async () => {
    render(<Upload disabled />);
    const dropzone = screen.getByRole('button');
    const input = dropzone.parentElement!.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');
    await userEvent.click(dropzone);
    expect(clickSpy).not.toHaveBeenCalled();
  });

  test('maxFiles limits how many files are added in one go', async () => {
    const onChange = vi.fn();
    render(<Upload onValueChange={onChange} maxFiles={2} />);
    const input = screen
      .getByRole('button')
      .parentElement!.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(input, [makeFile('a.txt'), makeFile('b.txt'), makeFile('c.txt')]);
    const files = firstFiles(onChange);
    expect(files).toHaveLength(2);
  });

  test('hideList hides the file list even when files exist', async () => {
    const onChange = vi.fn();
    render(<Upload onValueChange={onChange} hideList />);
    const input = screen
      .getByRole('button')
      .parentElement!.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(input, makeFile('hello.txt'));
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('custom prompt and hint are rendered', () => {
    render(<Upload prompt="Drop files here" hint="Max 5 MB" />);
    expect(screen.getByText('Drop files here')).toBeInTheDocument();
    expect(screen.getByText('Max 5 MB')).toBeInTheDocument();
  });

  test('maxSize filters out files that exceed the limit', async () => {
    const onChange = vi.fn();
    // 5 bytes max, 'hello' is 5 bytes (ok), 'hello world!' is 12 bytes (rejected)
    render(<Upload onValueChange={onChange} maxSize={5} />);
    const input = screen
      .getByRole('button')
      .parentElement!.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(input, [
      new File(['hello'], 'small.txt', { type: 'text/plain' }),
      new File(['hello world!'], 'large.txt', { type: 'text/plain' }),
    ]);
    const files = firstFiles(onChange);
    expect(files).toHaveLength(1);
    expect(files[0]!.name).toBe('small.txt');
  });

  test('controlled mode: value prop drives the list', () => {
    const controlledFiles: UploadFile[] = [
      { id: 'x1', name: 'controlled.txt', size: 100, status: 'success', url: 'https://cdn.example.com/x' },
    ];
    render(<Upload value={controlledFiles} />);
    expect(screen.getByText('controlled.txt')).toBeInTheDocument();
  });
});
