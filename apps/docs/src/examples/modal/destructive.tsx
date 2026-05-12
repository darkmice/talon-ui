/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalClose, ModalFooter, Button } from '@talon-ui/react';

export default function Demo() {
  return (
    <Modal>
      <ModalTrigger asChild><Button variant="danger">Delete workspace</Button></ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Delete workspace?</ModalTitle>
          <ModalDescription>This removes all projects, runs, and members. The action cannot be undone.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Cancel</Button></ModalClose>
          <ModalClose asChild><Button variant="danger">Delete</Button></ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
