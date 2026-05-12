/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Popconfirm, Button } from '@talon-ui/react';

export default function Demo() {
  return (
    <Popconfirm
      title="Pause this run?"
      description="The agent will stop after the current step."
      okText="Pause"
      onConfirm={() => alert('Paused')}
    >
      <Button variant="secondary">Pause run</Button>
    </Popconfirm>
  );
}
