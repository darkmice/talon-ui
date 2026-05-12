/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useForm } from 'react-hook-form';
import {
  Button, Form, FormField, FormItem, FormLabel, FormDescription, FormMessage,
  TimePicker,
} from '@talon-ui/react';

export default function Demo() {
  const methods = useForm({ defaultValues: { meetingTime: '09:00' } });
  return (
    <Form {...methods}>
      <form className="space-y-tp-3" onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d)))}>
        <FormField
          control={methods.control}
          name="meetingTime"
          rules={{ required: 'Pick a time.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting time (24h)</FormLabel>
              <TimePicker value={field.value} onValueChange={field.onChange} />
              <FormDescription>Local time. We will convert for participants automatically.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
