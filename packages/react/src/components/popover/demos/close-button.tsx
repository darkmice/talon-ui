/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Popover, PopoverTrigger, PopoverContent, PopoverClose, Button, Title, Text } from '@talon-ui/react';

export default function Demo() {
  return (
    <Popover>
      <PopoverTrigger asChild><Button>Open with close</Button></PopoverTrigger>
      <PopoverContent width="lg">
        <PopoverClose />
        <Title level={3}>Heads-up</Title>
        <Text className="mt-tp-2">There is an explicit close button in the corner.</Text>
      </PopoverContent>
    </Popover>
  );
}
