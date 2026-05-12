/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { ToastProvider, useToast, Button, ToastAction } from '@talon-ui/react';

function Inner() {
  const { toast, dismiss } = useToast();
  return (
    <Button onClick={() => {
      const id = toast({
        title: 'Archived',
        description: 'Moved to archive.',
        tone: 'info',
        action: (
          <ToastAction asChild altText="Undo">
            <button
              type="button"
              onClick={() => { dismiss(id); }}
              className="text-caption text-primary-600 hover:text-primary-700"
            >Undo</button>
          </ToastAction>
        ),
      });
    }}>Archive item</Button>
  );
}

export default function Demo() {
  return (
    <ToastProvider>
      <Inner />
    </ToastProvider>
  );
}
