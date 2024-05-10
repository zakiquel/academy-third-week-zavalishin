import { memo } from 'react';

import { AddColumnForm } from '../AddColumnForm/AddColumnForm';

import { Modal } from "@/shared/ui/Modal";

import cls from './AddColumnModal.module.scss';

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
      className={cls.AddColumnModal}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AddColumnForm
        onSuccess={onClose}
      />
    </Modal>
  );
});
