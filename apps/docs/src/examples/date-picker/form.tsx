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
  FormDescription,
  FormMessage,
  DatePicker,
} from '@talon-ui/react';

export default function Demo() {
  const methods = useForm({ defaultValues: { releaseDate: undefined as Date | undefined } });
  return (
    <Form {...methods}>
      <form
        className="space-y-tp-3"
        onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d)))}
      >
        <FormField
          control={methods.control}
          name="releaseDate"
          rules={{ required: 'Pick a release date.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release date</FormLabel>
              <DatePicker
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Pick a date"
              />
              <FormDescription>
                The first day this feature is publicly available.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Schedule</Button>
      </form>
    </Form>
  );
}
