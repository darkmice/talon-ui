/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { ToastProvider, useToast, Button } from '@talon-ui/react';

function Inner() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ title: 'Saved', description: 'Your changes are persisted.', tone: 'success' })}>
      Show toast
    </Button>
  );
}

export default function Demo() {
  return (
    <ToastProvider>
      <Inner />
    </ToastProvider>
  );
}
