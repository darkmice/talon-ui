/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, Button, Text } from '@talon-ui/react';

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor className="inline-block bg-bg-subtle rounded-sm p-tp-2 text-text-secondary">
        Anchored to this box
      </PopoverAnchor>
      <Button className="ml-tp-2" onClick={() => setOpen((o) => !o)}>Toggle popover</Button>
      <PopoverContent side="bottom" align="start">
        <Text>Position attaches to the anchor, not the trigger.</Text>
      </PopoverContent>
    </Popover>
  );
}
