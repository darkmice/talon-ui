/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useForm } from 'react-hook-form';
import {
  Button, Form, FormField, FormItem, FormLabel, FormDescription, FormMessage,
  NumberInput,
} from '@talon-ui/react';

export default function Demo() {
  const methods = useForm({ defaultValues: { quota: 100 } });
  return (
    <Form {...methods}>
      <form className="space-y-tp-3" onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d)))}>
        <FormField
          control={methods.control}
          name="quota"
          rules={{ min: { value: 0, message: 'Quota cannot be negative' } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly quota</FormLabel>
              <NumberInput
                value={field.value}
                onValueChange={field.onChange}
                ref={field.ref}
                unit="USD"
                min={0}
                step={10}
              />
              <FormDescription>Billed at the end of each month.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
