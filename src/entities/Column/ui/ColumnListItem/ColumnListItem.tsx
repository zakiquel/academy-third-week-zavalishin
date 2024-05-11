import React, { memo, useState } from 'react';

import { Column } from '../../model/types/column';

import { TaskItem, AddTaskModal , taskSliceActions } from "@/entities/Task";
import Cross from "@/shared/assets/icons/cross.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";

import cls from './ColumnListItem.module.scss';


interface ColumnProps {
  className?: string;
  column: Column;
  onDelete: (column: Column) => void;
  refetch: () => void;
}

export const ColumnListItem = memo((props: ColumnProps) => {
  const {
    className,
    column,
    onDelete,
    refetch,
  } = props;

  const dispatch = useAppDispatch()
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

  const onDeleteHandler = () => {
    onDelete(column)
  }

  const onCloseAddTaskModalHandler = () => {
    setShowTaskModal(false)
    refetch()
  }

  function onDragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    dispatch(taskSliceActions.setColumn(column.id))
  }

  return (
    <div
      className={classNames(cls.Column, {}, [className, `${column.id}`])}
      onDragOver={e => onDragOverHandler(e)}
    >
      <div className={cls.header}>
        <h1 className={cls.title}>{column.title}</h1>
        <Button
          theme={ButtonTheme.CLEAR}
          className={cls.cross}
          onClick={onDeleteHandler}
        >
          <Icon Svg={Cross} />
        </Button>
      </div>
      <Button
        theme={ButtonTheme.CLEAR}
        className={cls.create}
        onClick={() => setShowTaskModal(true)}
      >
        Создать задачу
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
    </div>
  );
});

