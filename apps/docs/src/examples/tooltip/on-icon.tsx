/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Info } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Text, Space } from '@talon-ui/react';

export default function Demo() {
  return (
    <TooltipProvider delayDuration={150}>
      <Space size="sm" align="center">
        <Text>Settings</Text>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" className="inline-flex items-center justify-center size-6 rounded-pill text-text-tertiary hover:text-text-primary hover:bg-bg-subtle">
              <Info className="size-4" aria-hidden />
              <span className="sr-only">More info</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>This setting affects all team members.</TooltipContent>
        </Tooltip>
      </Space>
    </TooltipProvider>
  );
}
