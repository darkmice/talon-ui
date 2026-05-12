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
  RadioGroup,
  RadioGroupItem,
  Text,
} from '@talon-ui/react';

export default function Demo() {
  const methods = useForm({ defaultValues: { plan: '' }, mode: 'onTouched' });
  return (
    <Form {...methods}>
      <form className="space-y-tp-3" onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d)))}>
        <FormField
          control={methods.control}
          name="plan"
          rules={{ required: 'Choose a plan to continue.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan</FormLabel>
              <RadioGroup value={field.value} onValueChange={field.onChange}>
                {(['starter', 'team', 'enterprise'] as const).map((opt) => (
                  <label key={opt} className="inline-flex items-center gap-tp-2 cursor-pointer">
                    <RadioGroupItem value={opt} />
                    <Text>{opt[0].toUpperCase() + opt.slice(1)}</Text>
                  </label>
                ))}
              </RadioGroup>
              <FormDescription>You can change this later.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
}
