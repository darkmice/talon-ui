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
  DrawerClose,
} from './drawer.js';

function renderDrawer(props: { side?: 'right' | 'left' | 'top' | 'bottom'; size?: 'sm' | 'md' | 'lg' } = {}) {
  return render(
    <Drawer>
      <DrawerTrigger asChild>
        <button type="button">Open drawer</button>
      </DrawerTrigger>
      <DrawerContent side={props.side} size={props.size}>
        <DrawerHeader>
          <DrawerTitle>Test drawer title</DrawerTitle>
          <DrawerDescription>Test drawer description</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>Drawer body content</p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <button type="button">Close footer</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>,
  );
}

describe('Drawer', () => {
  test('trigger renders; drawer not in DOM by default', () => {
    renderDrawer();
    expect(screen.getByRole('button', { name: 'Open drawer' })).toBeInTheDocument();
    expect(screen.queryByText('Drawer body content')).not.toBeInTheDocument();
    expect(screen.queryByText('Test drawer title')).not.toBeInTheDocument();
  });

  test('clicking trigger opens drawer; title, description, content visible', async () => {
    renderDrawer();
    await userEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
    await waitFor(() => expect(screen.getByText('Test drawer title')).toBeInTheDocument());
    expect(screen.getByText('Test drawer description')).toBeInTheDocument();
    expect(screen.getByText('Drawer body content')).toBeInTheDocument();
  });

  test('pressing Escape closes drawer', async () => {
    renderDrawer();
    await userEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
    await waitFor(() => expect(screen.getByText('Drawer body content')).toBeInTheDocument());
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByText('Drawer body content')).not.toBeInTheDocument());
  });

  test('side="left" + size="lg" applies top-0 left-0 h-full w-[720px] classes', async () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <button type="button">Open left-lg</button>
        </DrawerTrigger>
        <DrawerContent ref={ref} side="left" size="lg">
          <p>left lg content</p>
        </DrawerContent>
      </Drawer>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open left-lg' }));
    await waitFor(() => expect(ref.current).not.toBeNull());
    expect(ref.current!.className).toMatch(/top-0/);
    expect(ref.current!.className).toMatch(/left-0/);
    expect(ref.current!.className).toMatch(/h-full/);
    expect(ref.current!.className).toMatch(/w-\[720px\]/);
  });

  test('forwardRef on DrawerContent reaches the underlying div', async () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <button type="button">ref test</button>
        </DrawerTrigger>
        <DrawerContent ref={ref}>
          <p>ref content</p>
        </DrawerContent>
      </Drawer>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'ref test' }));
    await waitFor(() => expect(ref.current).not.toBeNull());
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  test('DrawerClose button closes drawer', async () => {
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <button type="button">Open</button>
        </DrawerTrigger>
        <DrawerContent showClose={false}>
          <DrawerBody>
            <p>Content to dismiss</p>
          </DrawerBody>
          <DrawerClose asChild>
            <button type="button">Dismiss</button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByText('Content to dismiss')).toBeInTheDocument());
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    await waitFor(() => expect(screen.queryByText('Content to dismiss')).not.toBeInTheDocument());
  });
});
