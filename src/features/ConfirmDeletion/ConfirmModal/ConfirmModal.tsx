import { memo } from 'react';

import { ConfirmForm } from '../ConfirmForm/ConfirmForm';

import { Modal } from "@/shared/ui/Modal";

import cls from './ConfirmModal.module.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfirmModal = memo((props: ConfirmModalProps) => {
  const {
    isOpen,
    onClose,
  } = props;
  return (
    <Modal
      className={cls.ConfirmModal}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ConfirmForm
        onSuccess={onClose}
      />
    </Modal>
  );
});
