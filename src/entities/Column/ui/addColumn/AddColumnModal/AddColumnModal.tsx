import { memo } from 'react';

import { AddColumnForm } from '../AddColumnForm/AddColumnForm';

import { Modal } from "@/shared/ui/Modal";

interface AddColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddColumnModal = memo((props: AddColumnModalProps) => {
  const {
    isOpen,
    onClose
  } = props;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <AddColumnForm
        onSuccess={onClose}
      />
    </Modal>
  );
});
