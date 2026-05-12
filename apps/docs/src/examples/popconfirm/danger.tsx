/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Trash2 } from 'lucide-react';
import { Popconfirm, Button } from '@talon-ui/react';

export default function Demo() {
  return (
    <Popconfirm
      title="Delete this project?"
      description="This will remove all branches, runs, and artefacts. There is no undo."
      okText="Delete project"
      tone="danger"
      onConfirm={() => alert('Deleted')}
    >
      <Button variant="danger" leading={<Trash2 className="size-4" aria-hidden />}>Delete</Button>
    </Popconfirm>
  );
}
