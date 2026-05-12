/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { createRef, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from './form.js';
import { useFormField } from './use-form-field.js';

// Harness that provides a real RHF form context
function Harness({ children, defaultValues = { email: '' } }: { children: ReactNode; defaultValues?: Record<string, string> }) {
  const methods = useForm({ defaultValues });
  return <Form {...methods}>{children}</Form>;
}

// Full field composition
function FullField({ name = 'email', error }: { name?: string; error?: string }) {
  const methods = useForm({
    defaultValues: { email: '' },
    ...(error ? { errors: { [name]: { type: 'manual', message: error } } } : {}),
  });

  // Set error manually when provided
  if (error) {
    methods.setError(name as 'email', { type: 'manual', message: error });
  }

  return (
    <Form {...methods}>
      <form>
        <FormField
          control={methods.control}
          name={name as 'email'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input data-testid="input" {...field} />
              </FormControl>
              <FormDescription>helper text</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

// Test 1: useFormField outside FormField throws
describe('useFormField', () => {
  test('throws outside <FormField>', () => {
    function BadComponent() {
      useFormField();
      return null;
    }
    // Wrap in Harness (which has FormProvider) but not in FormField
    expect(() =>
      render(
        <Harness>
          <FormItem>
            <BadComponent />
          </FormItem>
        </Harness>,
      ),
    ).toThrow('useFormField must be used within <FormField>');
  });

  // Test 2: useFormField outside FormItem throws
  test('throws outside <FormItem>', () => {
    function BadComponent() {
      useFormField();
      return null;
    }
    expect(() =>
      render(
        <Harness>
          <FormField
            name="email"
            render={() => <BadComponent />}
          />
        </Harness>,
      ),
    ).toThrow('useFormField must be used within <FormItem>');
  });
});

// Test 3: label htmlFor matches input id; aria-describedby includes description id
describe('Form wiring', () => {
  test('label htmlFor matches input id; aria-describedby includes description id', () => {
    render(<FullField />);
    const label = screen.getByText('Email') as HTMLLabelElement;
    const input = screen.getByTestId('input') as HTMLInputElement;
    const description = screen.getByText('helper text') as HTMLParagraphElement;

    // label.htmlFor === input.id
    expect(label.htmlFor).toBeTruthy();
    expect(label.htmlFor).toBe(input.id);

    // aria-describedby includes description id
    const describedBy = input.getAttribute('aria-describedby') ?? '';
    expect(describedBy).toContain(description.id);
  });

  // Test 4: on error - FormMessage renders error, aria-invalid=true, FormLabel turns red
  test('on error: FormMessage shows error, aria-invalid="true", FormLabel has error color', async () => {
    function ErrorField() {
      const methods = useForm({ defaultValues: { email: '' } });

      return (
        <Form {...methods}>
          <form>
            <FormField
              control={methods.control}
              name="email"
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input data-testid="input" {...field} />
                  </FormControl>
                  <FormDescription>helper</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      );
    }

    const { rerender } = render(<ErrorField />);

    // Manually trigger error by using a variant that has pre-set errors
    function ErrorFieldPreset() {
      const methods = useForm({ defaultValues: { email: '' } });
      // Immediately set error
      methods.setError('email', { type: 'manual', message: 'Email is required' });
      return (
        <Form {...methods}>
          <form>
            <FormField
              control={methods.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel data-testid="label">Email</FormLabel>
                  <FormControl>
                    <input data-testid="input2" {...field} />
                  </FormControl>
                  <FormDescription>helper</FormDescription>
                  <FormMessage data-testid="message" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      );
    }

    rerender(<ErrorFieldPreset />);

    const label = screen.getByTestId('label') as HTMLLabelElement;
    const input = screen.getByTestId('input2') as HTMLInputElement;
    const message = screen.getByTestId('message') as HTMLParagraphElement;

    expect(message.textContent).toBe('Email is required');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(label.className).toMatch(/text-\[#C8322B\]/);
  });

  // Test 5: FormMessage explicit children render when no error
  test('FormMessage renders children when there is no error', () => {
    function HintField() {
      const methods = useForm({ defaultValues: { name: '' } });
      return (
        <Form {...methods}>
          <form>
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <input data-testid="name-input" {...field} />
                  </FormControl>
                  <FormMessage data-testid="hint">Inline hint</FormMessage>
                </FormItem>
              )}
            />
          </form>
        </Form>
      );
    }
    render(<HintField />);
    expect(screen.getByTestId('hint').textContent).toBe('Inline hint');
  });

  // Test 6: forwardRef on FormItem points to the outer div
  test('forwardRef on FormItem points to the outer div', () => {
    const ref = createRef<HTMLDivElement>();
    function RefField() {
      const methods = useForm({ defaultValues: { x: '' } });
      return (
        <Form {...methods}>
          <form>
            <FormField
              control={methods.control}
              name="x"
              render={({ field }) => (
                <FormItem ref={ref}>
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
    render(<RefField />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // Test 7: FormField with defaultValue initialises RHF field state
  test('FormField with defaultValue correctly initialises RHF field state', () => {
    function DefaultValueField() {
      const methods = useForm({ defaultValues: { username: 'ada' } });
      return (
        <Form {...methods}>
          <form>
            <FormField
              control={methods.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input data-testid="username-input" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      );
    }
    render(<DefaultValueField />);
    const input = screen.getByTestId('username-input') as HTMLInputElement;
    expect(input.value).toBe('ada');
  });
});
