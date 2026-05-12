/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button, Space } from '@talon-ui/react';

export default function Demo() {
  return (
    <TooltipProvider delayDuration={150}>
      <Space size="md">
        <Tooltip>
          <TooltipTrigger asChild><Button variant="secondary">Top</Button></TooltipTrigger>
          <TooltipContent side="top">on top</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild><Button variant="secondary">Right</Button></TooltipTrigger>
          <TooltipContent side="right">on right</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild><Button variant="secondary">Bottom</Button></TooltipTrigger>
          <TooltipContent side="bottom">on bottom</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild><Button variant="secondary">Left</Button></TooltipTrigger>
          <TooltipContent side="left">on left</TooltipContent>
        </Tooltip>
      </Space>
    </TooltipProvider>
  );
}
