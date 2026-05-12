/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useForm } from 'react-hook-form';
import {
  Button, Form, FormField, FormItem, FormLabel, FormDescription, FormMessage,
  Rate,
} from '@talon-ui/react';

export default function Demo() {
  const methods = useForm({ defaultValues: { rating: 0 }, mode: 'onTouched' });
  return (
    <Form {...methods}>
      <form className="space-y-tp-3" onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d)))}>
        <FormField
          control={methods.control}
          name="rating"
          rules={{ min: { value: 1, message: 'Pick at least one star.' } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>How was your experience?</FormLabel>
              <Rate value={field.value} onValueChange={field.onChange} allowHalf />
              <FormDescription>Halves allowed.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit feedback</Button>
      </form>
    </Form>
  );
}
