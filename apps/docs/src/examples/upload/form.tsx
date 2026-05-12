/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useForm } from 'react-hook-form';
import {
  Button, Form, FormField, FormItem, FormLabel, FormDescription, FormMessage,
  Upload, type UploadFile,
} from '@talon-ui/react';

export default function Demo() {
  const methods = useForm({ defaultValues: { attachments: [] as UploadFile[] } });
  return (
    <Form {...methods}>
      <form className="space-y-tp-3" onSubmit={methods.handleSubmit((d) => alert(`${d.attachments.length} file(s) attached`))}>
        <FormField
          control={methods.control}
          name="attachments"
          rules={{ validate: (v) => (Array.isArray(v) && v.length > 0) || 'Attach at least one file.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachments</FormLabel>
              <Upload value={field.value} onValueChange={field.onChange} maxSize={10 * 1024 * 1024} />
              <FormDescription>Up to 10 MB each.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit ticket</Button>
      </form>
    </Form>
  );
}
