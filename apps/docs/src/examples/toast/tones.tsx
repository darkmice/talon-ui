/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { ToastProvider, useToast, Space, Button } from '@talon-ui/react';

function Inner() {
  const { toast } = useToast();
  return (
    <Space>
      <Button variant="secondary" onClick={() => toast({ title: 'Info', description: 'FYI', tone: 'info' })}>Info</Button>
      <Button variant="secondary" onClick={() => toast({ title: 'Success', description: 'All good', tone: 'success' })}>Success</Button>
      <Button variant="secondary" onClick={() => toast({ title: 'Warning', description: 'Heads up', tone: 'warning' })}>Warning</Button>
      <Button variant="secondary" onClick={() => toast({ title: 'Error', description: 'Something failed', tone: 'error' })}>Error</Button>
    </Space>
  );
}

export default function Demo() {
  return (
    <ToastProvider>
      <Inner />
    </ToastProvider>
  );
}
