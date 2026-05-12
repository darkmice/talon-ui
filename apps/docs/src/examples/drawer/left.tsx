/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  Button,
} from '@talon-ui/react';

export default function Demo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open left drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="left" size="sm">
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Browse sections and resources.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <nav className="flex flex-col gap-tp-2 text-body text-text-secondary">
            <a href="#" className="hover:text-text-primary">Dashboard</a>
            <a href="#" className="hover:text-text-primary">Projects</a>
            <a href="#" className="hover:text-text-primary">Settings</a>
          </nav>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
