import { memo, useCallback, useEffect, useState } from 'react';

import { columnApi } from "../../../api/columnApi";
import { Column } from '../../../model/types/column'

import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Loader } from "@/shared/ui/Loader";

import cls from './AddColumnForm.module.scss';

interface AddColumnFormProps {
  onSuccess: () => void;
}

export const AddColumnForm = memo((props: AddColumnFormProps) => {
  const { onSuccess } = props;
  const [columnName, setColumnName] = useState<string>('');
  const [createColumn, { isLoading,  isError }] = columnApi.useAddColumnMutation();

  const onChangeColumnName = useCallback((value: string) => {
    setColumnName(value)
  }, [])

  const onButtonClick = useCallback(() => {
    createColumn({ title: columnName } as Column).then(() =>
      onSuccess()
    )
    setColumnName('');
  }, [columnName, createColumn, onSuccess])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onButtonClick();
      }
    },
    [onButtonClick],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <form className={cls.AddColumnForm}>
      {isLoading
        ? <Loader className={cls.loader} />
        : <>
            <h1 className={cls.title}>
              Создание списка задач
            </h1>
            <Input
              value={columnName}
              placeholder="Введите название колонки"
              onChange={onChangeColumnName}
              max
            />
            <Button
              theme={ButtonTheme.OUTLINE}
              className={cls.button}
              onClick={onButtonClick}
              disabled={isLoading || columnName === ''}
              fullWidth
            >
              Создать список задач
            </Button>
          </>
      }
    </form>
  )
});
