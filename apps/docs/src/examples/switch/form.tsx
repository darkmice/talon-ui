/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useForm } from 'react-hook-form';
import {
  Button, Form, FormField, FormItem, FormLabel, FormDescription, FormMessage,
  Switch,
} from '@talon-ui/react';

export default function Demo() {
  const methods = useForm({ defaultValues: { betaFeatures: false } });
  return (
    <Form {...methods}>
      <form className="space-y-tp-3" onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d)))}>
        <FormField
          control={methods.control}
          name="betaFeatures"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Beta features</FormLabel>
                <Switch checked={field.value} onCheckedChange={field.onChange} ref={field.ref} />
              </div>
              <FormDescription>Opt into unreleased features. May break.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
