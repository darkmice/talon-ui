/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from './form.js';

// Harness that wraps children inside a full field context (FormField + FormItem)
function Harness({ children }: { children: ReactNode }) {
  const methods = useForm({ defaultValues: { email: '' } });
  return (
    <Form {...methods}>
      <form>
        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {children}
              <FormControl>
                <input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

describe('Form anatomy', () => {
  // Test 1: FormItem renders <div class="space-y-tp-1">
  test('FormItem renders <div> with class space-y-tp-1', () => {
    // Render a standalone FormItem by wrapping the whole field
    function FullField() {
      const methods = useForm({ defaultValues: { email: '' } });
      return (
        <Form {...methods}>
          <form>
            <FormField
              control={methods.control}
              name="email"
              render={({ field }) => (
                <FormItem data-testid="form-item">
                  <FormControl>
                    <input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      );
    }
    const { getByTestId } = render(<FullField />);
    const div = getByTestId('form-item') as HTMLElement;
    expect(div.tagName).toBe('DIV');
    expect(div.className).toMatch(/space-y-tp-1/);
  });

  // Test 2: FormLabel renders <label class="text-body-strong text-text-primary">
  test('FormLabel renders <label> with text-body-strong and text-text-primary classes', () => {
    const { container } = render(<Harness><FormLabel>Email label</FormLabel></Harness>);
    const label = container.querySelector('label[for]');
    expect(label).toBeTruthy();
    expect(label!.className).toMatch(/text-body-strong/);
    expect(label!.className).toMatch(/text-text-primary/);
  });

  // Test 3: FormDescription renders <p class="text-caption text-text-secondary">
  test('FormDescription renders <p> with text-caption and text-text-secondary classes', () => {
    const { container } = render(<Harness><FormDescription>Some help text</FormDescription></Harness>);
    const p = container.querySelector('p');
    expect(p).toBeTruthy();
    expect(p!.className).toMatch(/text-caption/);
    expect(p!.className).toMatch(/text-text-secondary/);
  });
});
