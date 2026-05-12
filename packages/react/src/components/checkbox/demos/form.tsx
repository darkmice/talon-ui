/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useForm } from 'react-hook-form';
import {
  Button, Checkbox, Form, FormField, FormItem, FormLabel, FormDescription, FormMessage,
} from '@talon-ui/react';

export default function Demo() {
  const methods = useForm({ defaultValues: { tos: false }, mode: 'onTouched' });
  return (
    <Form {...methods}>
      <form className="space-y-tp-3" onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d)))}>
        <FormField
          control={methods.control}
          name="tos"
          rules={{ required: 'You must accept the terms.' }}
          render={({ field }) => (
            <FormItem>
              <div className="inline-flex items-center gap-tp-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(c) => field.onChange(c === true)}
                  ref={field.ref}
                />
                <FormLabel>Accept the Terms of Service</FormLabel>
              </div>
              <FormDescription>You can revoke this consent later.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
}
