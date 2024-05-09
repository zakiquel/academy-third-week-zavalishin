import { memo } from 'react';

import { TaskComplexity, TaskStatus, TaskType } from "@/entities/Column";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from './TaskItem.module.scss';

interface TaskProps {
  className?: string;
  title: string;
  description?: string;
  complexity: TaskComplexity;
  type: TaskType;
  status: TaskStatus;
}

export const TaskItem = memo((props: TaskProps) => {
  const {
    className,
    title,
    description,
    complexity,
    type,
    status,
  } = props;


  return (
    <div className={classNames(cls.Task, {}, [className])}>
      <h2 className={cls.title}>{title}</h2>
      <p className={cls.description}>{description}</p>
      <div className={cls.tags}>
        <p className={classNames(cls.complexity, {}, [cls[complexity]])}>
          {complexity}
        </p>
        <p className={cls.type}>
          {type}
        </p>
        <p className={classNames(cls.status, {})}>
          {status}
        </p>
      </div>
    </div>
  );
});
