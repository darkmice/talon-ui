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
  const methods = useForm({ defaultValues: { displayName: '' } });
  return (
    <Form {...methods}>
      <form
        className="space-y-tp-3"
        onSubmit={methods.handleSubmit((data) => alert(JSON.stringify(data)))}
      >
        <FormField
          control={methods.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder="Ada Lovelace" {...field} />
              </FormControl>
              <FormDescription>Shown next to your messages.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
