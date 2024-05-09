import { memo, useState } from 'react';

import { AddColumnModal } from '../AddColumnModal/AddColumnModal';

import { ColumnListItem, columnApi } from '@/entities/Column';
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { PageLoader } from "@/widgets/PageLoader";

import cls from './ColumnsList.module.scss';

interface ColumnsListProps {
  className?: string;
}

export const ColumnsList = memo((props: ColumnsListProps) => {
  const {
    className
  } = props;

  const [showColumnModal, setShowColumnModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const { isLoading, data, error } = columnApi.useGetColumnsQuery(null);

  const [deleteColumn, { isLoading: isLoadingColumnDelete, isError: isErrorColumnDelete
  }] = columnApi.useDeleteColumnMutation()

  const [createTask, { isLoading: createTaskLoading, error: createTaskError
  }] = columnApi.useAddTaskMutation();

  const onShowConfirmModal = () => {
    setShowConfirmModal(true);
  }

  const onShowAddColumnModal = () => {
    setShowColumnModal(true);
  }

  const onCloseAddColumnModal = () => {
    setShowColumnModal(false);
  }

  if (isLoading) {
    return <PageLoader />
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
          column={item}
          onDelete={deleteColumn}
          showModal={onShowConfirmModal}
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
