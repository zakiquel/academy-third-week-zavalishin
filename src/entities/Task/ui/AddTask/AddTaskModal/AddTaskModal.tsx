import { memo } from 'react';

import { AddTaskForm } from '../AddTaskForm/AddTaskForm';

import { Modal } from "@/shared/ui/Modal";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: string;
}

export const AddTaskModal = memo((props: AddTaskModalProps) => {
  const {
    isOpen,
    onClose,
    columnId
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <AddTaskForm
        onSuccess={onClose}
        columnId={columnId}
      />
    </Modal>
  );
});
