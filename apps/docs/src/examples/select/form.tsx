/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useForm } from 'react-hook-form';
import {
  Button, Form, FormField, FormItem, FormLabel, FormDescription, FormMessage,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from '@talon-ui/react';

export default function Demo() {
  const methods = useForm({ defaultValues: { plan: '' }, mode: 'onTouched' });
  return (
    <Form {...methods}>
      <form className="space-y-tp-3" onSubmit={methods.handleSubmit((d) => alert(JSON.stringify(d)))}>
        <FormField
          control={methods.control}
          name="plan"
          rules={{ required: 'Pick a plan.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subscription plan</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter ($9/mo)</SelectItem>
                  <SelectItem value="team">Team ($29/mo)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (custom)</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Change anytime.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
}
