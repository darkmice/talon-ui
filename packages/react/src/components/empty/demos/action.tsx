/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Plus } from 'lucide-react';
import { Empty, Button } from '@talon-ui/react';

export default function Demo() {
  return (
    <Empty
      title="No projects yet"
      description="Create your first project to get started."
      action={<Button leading={<Plus className="size-4" aria-hidden />}>Create project</Button>}
    />
  );
}
