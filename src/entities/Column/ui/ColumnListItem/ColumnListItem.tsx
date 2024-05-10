import { memo, useState } from 'react';

import { Column } from '../../model/types/column';

import { TaskItem , AddTaskModal } from "@/entities/Task";
import Cross from "@/shared/assets/icons/cross.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
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

  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

  const onDeleteHandler = () => {
    onDelete(column)
  }

  const onCloseAddTaskModalHandler = () => {
    setShowTaskModal(false)
    refetch()
  }

  return (
    <div className={classNames(cls.Column, {}, [className])}>
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
          title={item.title}
          description={item.description}
          complexity={item.complexity}
          type={item.type}
          status={item.status}
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

