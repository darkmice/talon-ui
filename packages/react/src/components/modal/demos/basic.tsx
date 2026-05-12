/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalClose, Button } from '@talon-ui/react';

export default function Demo() {
  return (
    <Modal>
      <ModalTrigger asChild><Button>Open modal</Button></ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>New project</ModalTitle>
          <ModalDescription>Set up a fresh workspace. You can change the details anytime.</ModalDescription>
        </ModalHeader>
        <p className="mt-tp-4 text-body text-text-secondary">Modal body content goes here.</p>
        <ModalFooter>
          <ModalClose asChild><Button variant="ghost">Cancel</Button></ModalClose>
          <ModalClose asChild><Button>Create</Button></ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
