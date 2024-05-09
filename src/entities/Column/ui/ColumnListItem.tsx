import { memo } from 'react';

import { Column } from '../model/types/column';

import { TaskItem } from "@/entities/Task";
import Cross from "@/shared/assets/icons/cross.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";

import cls from './Column.module.scss';


interface ColumnProps {
  className?: string;
  column: Column;
  onDelete: (column: Column) => void;
  showModal: () => void;
}

export const ColumnListItem = memo((props: ColumnProps) => {
  const {
    className,
    column,
    onDelete,
    showModal
  } = props;

  const onDeleteHandler = () => {
    showModal()
    onDelete(column)
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
      >
        Создать задачу
      </Button>
      {column.tasks && column.tasks.map((item) => (
        <TaskItem
          title={item.title}
          description={item.description}
          complexity={item.complexity}
          type={item.type}
          status={item.status}
        />
      ))}
    </div>
  );
});

