/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useForm } from 'react-hook-form';
import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Input,
} from '@talon-ui/react';

export default function Demo() {
  const methods = useForm({ defaultValues: { email: '' }, mode: 'onTouched' });
  return (
    <Form {...methods}>
      <form
        className="space-y-tp-3"
        onSubmit={methods.handleSubmit(() => {})}
      >
        <FormField
          control={methods.control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Looks like an invalid email' },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>We will only use this for system notifications.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </Form>
  );
}
