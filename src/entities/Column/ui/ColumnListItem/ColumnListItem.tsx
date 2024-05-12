import React, { memo, useState } from 'react';

import { columnApi } from '../..';
import { Column } from '../../model/types/column';

import { TaskItem, AddTaskModal , taskSliceActions } from "@/entities/Task";
import Cross from "@/shared/assets/icons/cross.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";
import { Loader } from "@/shared/ui/Loader";

import cls from './ColumnListItem.module.scss';


interface ColumnProps {
  className?: string;
  column: Column;
}

export const ColumnListItem = memo((props: ColumnProps) => {
  const {
    className,
    column,
  } = props;

  const [deleteColumn, { isLoading, isError
  }] = columnApi.useDeleteColumnMutation()

  const dispatch = useAppDispatch()
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

  const onDeleteHandler = () => {
    deleteColumn(column)
  }

  const onCloseAddTaskModalHandler = () => {
    setShowTaskModal(false)
  }

  function onDragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    dispatch(taskSliceActions.setColumn(column.id))
  }

  return (
    <div
      className={classNames(cls.ColumnListItem, {}, [className])}
      onDragOver={e => onDragOverHandler(e)}
    >
      <div className={cls.header}>
        <h1 className={cls.title}>{column.title}</h1>
        <Button
          theme={ButtonTheme.CLEAR}
          className={cls.cross}
          onClick={onDeleteHandler}
          disabled={isLoading}
        >
          <Icon Svg={Cross} />
        </Button>
      </div>
      {isError && <span>Ошибка удаления</span> }
      {isLoading ?
        <Loader className={cls.loader} /> :
        <>
          <Button
            theme={ButtonTheme.CLEAR}
            className={cls.create}
            onClick={() => setShowTaskModal(true)}
          >
            <span>Создать задачу</span>
          </Button>
          {column.tasks && column.tasks.map((item) => (
            <TaskItem
              key={item.id}
              task={item}
              columnId={column.id}
            />
          ))}
          <AddTaskModal
            columnId={column.id}
            isOpen={showTaskModal}
            onClose={onCloseAddTaskModalHandler}
          />
        </>
      }
    </div>
  );
});


