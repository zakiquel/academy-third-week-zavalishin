import { memo, useState } from 'react';

import { columnApi } from '../../api/columnApi';
import { ColumnListItem } from "../ColumnListItem/ColumnListItem";
import { AddColumnModal } from "../addColumn/AddColumnModal/AddColumnModal";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Loader } from "@/shared/ui/Loader";

import cls from './ColumnsList.module.scss';

interface ColumnsListProps {
  className?: string;
}

export const ColumnsList = memo((props: ColumnsListProps) => {
  const {
    className
  } = props;

  const [showColumnModal, setShowColumnModal] = useState<boolean>(false);
  const { isLoading, data, error, refetch } = columnApi.useGetColumnsQuery('');

  const [deleteColumn, { isLoading: isLoadingColumnDelete, isError: isErrorColumnDelete
  }] = columnApi.useDeleteColumnMutation()

  const onShowAddColumnModal = () => {
    setShowColumnModal(true);
  }

  const onCloseAddColumnModal = () => {
    setShowColumnModal(false);
  }

  if (isLoading) {
    return <Loader />
  }

  if (!data) {
    return <div className={cls.Suggestion}>
      <h1>Создать заметку</h1>
    </div>
  }

  if (error) {
    return <div className={cls.Suggestion}>
      <h1>Произошла ошибка при загрузке данных</h1>
    </div>
  }

  return (
    <div className={classNames(cls.ColumnsList, {}, [className])}>
      {data.map((item) => (
        <ColumnListItem
          key={item.title}
          column={item}
          onDelete={deleteColumn}
          refetch={refetch}
        />
      ))}
      <div className={cls.addContainer}>
        <Button
          theme={ButtonTheme.OUTLINE}
          onClick={onShowAddColumnModal}
        >
          <span>+</span>
        </Button>
      </div>
      <AddColumnModal
        isOpen={showColumnModal}
        onClose={onCloseAddColumnModal}
      />
    </div>
  )
});
