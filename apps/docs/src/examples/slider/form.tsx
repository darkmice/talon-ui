/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useForm } from 'react-hook-form';
import {
  Button, Form, FormField, FormItem, FormLabel, FormDescription, FormMessage,
  Slider,
} from '@talon-ui/react';

export default function Demo() {
  const methods = useForm({ defaultValues: { volume: [60] } });
  return (
    <Form {...methods}>
      <form className="space-y-tp-3" onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d)))}>
        <FormField
          control={methods.control}
          name="volume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notification volume</FormLabel>
              <Slider value={field.value} onValueChange={field.onChange} min={0} max={100} step={1} />
              <FormDescription>Current value: {field.value[0]}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
