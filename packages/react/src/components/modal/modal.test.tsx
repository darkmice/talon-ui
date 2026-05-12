/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalClose } from './modal.js';

function renderModal(props: { size?: 'sm' | 'md' | 'lg' } = {}) {
  return render(
    <Modal>
      <ModalTrigger asChild>
        <button type="button">Open modal</button>
      </ModalTrigger>
      <ModalContent size={props.size}>
        <ModalHeader>
          <ModalTitle>Test modal title</ModalTitle>
          <ModalDescription>Test modal description</ModalDescription>
        </ModalHeader>
        <p>Modal body content</p>
        <ModalFooter>
          <ModalClose asChild>
            <button type="button">Close footer</button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>,
  );
}

describe('Modal', () => {
  test('trigger renders; modal not in DOM by default', () => {
    renderModal();
    expect(screen.getByRole('button', { name: 'Open modal' })).toBeInTheDocument();
    expect(screen.queryByText('Modal body content')).not.toBeInTheDocument();
    expect(screen.queryByText('Test modal title')).not.toBeInTheDocument();
  });

  test('clicking trigger opens modal; title, description, content visible', async () => {
    renderModal();
    await userEvent.click(screen.getByRole('button', { name: 'Open modal' }));
    await waitFor(() => expect(screen.getByText('Test modal title')).toBeInTheDocument());
    expect(screen.getByText('Test modal description')).toBeInTheDocument();
    expect(screen.getByText('Modal body content')).toBeInTheDocument();
  });

  test('pressing Escape closes modal', async () => {
    renderModal();
    await userEvent.click(screen.getByRole('button', { name: 'Open modal' }));
    await waitFor(() => expect(screen.getByText('Modal body content')).toBeInTheDocument());
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByText('Modal body content')).not.toBeInTheDocument());
  });

  test('ModalClose button closes modal', async () => {
    render(
      <Modal>
        <ModalTrigger asChild>
          <button type="button">Open</button>
        </ModalTrigger>
        <ModalContent showClose={false}>
          <p>Content to dismiss</p>
          <ModalClose asChild>
            <button type="button">Dismiss</button>
          </ModalClose>
        </ModalContent>
      </Modal>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByText('Content to dismiss')).toBeInTheDocument());
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    await waitFor(() => expect(screen.queryByText('Content to dismiss')).not.toBeInTheDocument());
  });

  test('size="lg" applies max-w-[800px] to content', async () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Modal>
        <ModalTrigger asChild>
          <button type="button">Open lg</button>
        </ModalTrigger>
        <ModalContent ref={ref} size="lg">
          <p>lg content</p>
        </ModalContent>
      </Modal>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open lg' }));
    await waitFor(() => expect(ref.current).not.toBeNull());
    expect(ref.current!.className).toMatch(/max-w-\[800px\]/);
  });

  test('forwardRef on ModalContent reaches the underlying div', async () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Modal>
        <ModalTrigger asChild>
          <button type="button">ref test</button>
        </ModalTrigger>
        <ModalContent ref={ref}>
          <p>ref content</p>
        </ModalContent>
      </Modal>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'ref test' }));
    await waitFor(() => expect(ref.current).not.toBeNull());
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
