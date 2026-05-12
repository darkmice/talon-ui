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
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
} from '@talon-ui/react';

export default function Demo() {
  const methods = useForm({ defaultValues: { framework: '' }, mode: 'onTouched' });
  return (
    <Form {...methods}>
      <form className="space-y-tp-3" onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d)))}>
        <FormField
          control={methods.control}
          name="framework"
          rules={{ required: 'Pick a framework.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frontend framework</FormLabel>
              <Combobox value={field.value} onValueChange={field.onChange}>
                <ComboboxTrigger>
                  <ComboboxValue placeholder="Choose..." />
                </ComboboxTrigger>
                <ComboboxContent>
                  <ComboboxInput placeholder="Filter..." />
                  <ComboboxList>
                    <ComboboxEmpty>No match.</ComboboxEmpty>
                    <ComboboxGroup>
                      <ComboboxItem value="react">React</ComboboxItem>
                      <ComboboxItem value="vue">Vue</ComboboxItem>
                      <ComboboxItem value="svelte">Svelte</ComboboxItem>
                    </ComboboxGroup>
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <FormDescription>We will scaffold the integration accordingly.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
