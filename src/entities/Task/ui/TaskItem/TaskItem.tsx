import React, { memo } from 'react';
import { useSelector } from "react-redux";

import { createTask } from '../..';
import { deleteTask } from '../../model/services/deleteTask';
import { taskSliceActions } from '../../model/slice/taskSlice';
import { Task } from '../../model/types/task'

import { StateSchema } from "@/app/providers/StoreProvider";
import { columnApi } from "@/entities/Column";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

import cls from './TaskItem.module.scss';

interface TaskProps {
  className?: string;
  task: Task;
  columnId: string;
}

export const TaskItem = memo((props: TaskProps) => {
  const {
    className,
    columnId,
    task,
  } = props;

  const dispatch = useAppDispatch()
  const { refetch } = columnApi.useGetColumnsQuery('');

  const { id, status, type, title, description, complexity } = task;
  const taskFromState = useSelector((state: StateSchema) => state.task.task)
  const columnIdFromState = useSelector((state: StateSchema) => state.task.columnId)

  const onDragStartHandler = () => {
    dispatch(taskSliceActions.setTask({ id, status, type, title, description, complexity }))
  }

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dispatch(deleteTask({ columnId, taskId: taskFromState.id }))
    dispatch(createTask({ columnId: columnIdFromState, task: taskFromState })).then(
      () => refetch())
  }

  return (
    <div
      className={classNames(cls.Task, {}, [className])}
      draggable
      onDragStart={onDragStartHandler}
      onDragEnd={e => onDropHandler(e)}
    >
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
