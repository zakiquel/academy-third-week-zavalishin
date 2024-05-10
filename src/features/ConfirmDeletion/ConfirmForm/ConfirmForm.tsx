import { memo } from 'react';

import { Button, ButtonTheme } from "@/shared/ui/Button";

import cls from './ConfirmForm.module.scss';

interface ConfirmFormProps {
  onSuccess: () => void;
}

export const ConfirmForm = memo(({ onSuccess }: ConfirmFormProps) => {
  const onCancelHandler = () => {
    onSuccess()
  }

  const onConfirmHandler = () => {
    onSuccess()
  }

  return (
    <div className={cls.ConfirmForm}>
      <h1>Удалить список?</h1>
      <div className={cls.btns}>
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={onCancelHandler}
      >
        Нет
      </Button>
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={onConfirmHandler}
      >
        Да
      </Button>
    </div>
  </div>
  )
});
