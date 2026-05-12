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
  ColorPicker,
} from '@talon-ui/react';

export default function Demo() {
  const methods = useForm({ defaultValues: { brand: '#4F60FF' } });
  return (
    <Form {...methods}>
      <form
        className="space-y-tp-3"
        onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d)))}
      >
        <FormField
          control={methods.control}
          name="brand"
          rules={{ pattern: { value: /^#[0-9A-Fa-f]{6}$/, message: 'Use #RRGGBB.' } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand color</FormLabel>
              <ColorPicker value={field.value} onValueChange={field.onChange} />
              <FormDescription>Applies to headings, buttons, and links.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
