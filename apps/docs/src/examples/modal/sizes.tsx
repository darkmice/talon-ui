/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalClose, ModalFooter, Button, Space } from '@talon-ui/react';

const sizes = ['sm', 'md', 'lg'] as const;

export default function Demo() {
  return (
    <Space>
      {sizes.map((s) => (
        <Modal key={s}>
          <ModalTrigger asChild><Button variant="secondary">{s.toUpperCase()}</Button></ModalTrigger>
          <ModalContent size={s}>
            <ModalHeader>
              <ModalTitle>Size {s.toUpperCase()}</ModalTitle>
              <ModalDescription>max width 480 / 640 / 800.</ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <ModalClose asChild><Button>OK</Button></ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ))}
    </Space>
  );
}
