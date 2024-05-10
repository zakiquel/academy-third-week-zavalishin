import { memo, useCallback, useState } from 'react';

import { columnApi } from "../../../api/columnApi";
import { Column } from '../../../model/types/column'

import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

import cls from './AddColumnForm.module.scss';

interface AddColumnFormProps {
  onSuccess: () => void;
}

export const AddColumnForm = memo((props: AddColumnFormProps) => {
  const { onSuccess } = props;
  const [columnName, setColumnName] = useState<string>('');
  const [createColumn, { isLoading, isError }] = columnApi.useAddColumnMutation();

  const onChangeColumnName = useCallback((value: string) => {
    setColumnName(value)
  }, [])

  const onButtonClick = useCallback(() => {
    createColumn({ title: columnName } as Column)
    onSuccess()
    setColumnName('');
  }, [columnName, createColumn, onSuccess])

  return (
    <form className={cls.AddColumnForm}>
      <h1 className={cls.title}>
        Создание списка задач
      </h1>
      <Input
        value={columnName}
        placeholder="Введите название колонки"
        onChange={onChangeColumnName}
      />
      <Button
        theme={ButtonTheme.OUTLINE}
        className={cls.button}
        onClick={onButtonClick}
        disabled={isLoading}
      >
        Создать список задач
      </Button>
    </form>
  )
});
