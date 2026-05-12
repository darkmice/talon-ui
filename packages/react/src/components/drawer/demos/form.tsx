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
  Input,
} from '@talon-ui/react';

export default function Demo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>New project</Button>
      </DrawerTrigger>
      <DrawerContent side="right" size="lg">
        <DrawerHeader>
          <DrawerTitle>Create project</DrawerTitle>
          <DrawerDescription>Fill in the details below to set up your new project.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="flex flex-col gap-tp-4">
            <div className="flex flex-col gap-tp-1">
              <label className="text-label text-text-primary" htmlFor="project-name">
                Project name
              </label>
              <Input id="project-name" placeholder="e.g. Talon Platform" />
            </div>
            <div className="flex flex-col gap-tp-1">
              <label className="text-label text-text-primary" htmlFor="project-desc">
                Description
              </label>
              <Input id="project-desc" placeholder="Short description of your project" />
            </div>
            <div className="flex flex-col gap-tp-1">
              <label className="text-label text-text-primary" htmlFor="project-slug">
                Slug
              </label>
              <Input id="project-slug" placeholder="talon-platform" />
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button>Create project</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
