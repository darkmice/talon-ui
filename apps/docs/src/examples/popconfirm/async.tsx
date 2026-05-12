/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Popconfirm, Button } from '@talon-ui/react';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Demo() {
  const [busy, setBusy] = useState(false);
  return (
    <Popconfirm
      title="Push to production?"
      description="This will deploy the current build immediately."
      okText="Deploy"
      confirming={busy}
      onConfirm={async () => {
        setBusy(true);
        await wait(800);
        setBusy(false);
        alert('Deployed');
      }}
    >
      <Button>Deploy</Button>
    </Popconfirm>
  );
}
