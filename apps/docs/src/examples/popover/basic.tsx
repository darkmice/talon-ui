/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Popover, PopoverTrigger, PopoverContent, Button, Title, Text } from '@talon-ui/react';

export default function Demo() {
  return (
    <Popover>
      <PopoverTrigger asChild><Button variant="secondary">Open popover</Button></PopoverTrigger>
      <PopoverContent>
        <Title level={3}>Quick info</Title>
        <Text variant="body" tone="secondary" className="mt-tp-2">
          Popovers are persistent surfaces shown on a user gesture. They close on outside click or Escape.
        </Text>
      </PopoverContent>
    </Popover>
  );
}
