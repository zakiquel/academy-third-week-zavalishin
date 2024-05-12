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
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Loader } from "@/shared/ui/Loader";

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

  const { id, status, type, title, description, complexity } = task;
  const taskFromState = useSelector((state: StateSchema) => state.task.task)
  const columnIdFromState = useSelector((state: StateSchema) => state.task.columnId)
  const [_, { isLoading }] = columnApi.useUpdateColumnMutation()

  const onDragStartHandler = () => {
    dispatch(taskSliceActions.setTask({ id, status, type, title, description, complexity }))
  }

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (columnId !== columnIdFromState) {
      dispatch(deleteTask({ columnId, taskId: taskFromState.id }))
      dispatch(createTask({ columnId: columnIdFromState, task: taskFromState }))
    }
  }

  const onDeleteHandler = () => {
    dispatch(deleteTask({ columnId, taskId: task.id }))
  }

  return (
    <div
      className={classNames(cls.Task, {}, [className])}
      draggable
      onDragStart={onDragStartHandler}
      onDragEnd={e => onDropHandler(e)}
    >
      {isLoading
        ? <Loader />
        : <>
          <h1 className={cls.title}>{title}</h1>
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
          <Button
            theme={ButtonTheme.CLEAR}
            onClick={onDeleteHandler}
            className={cls.delete}
          >
            <span>Удалить задачу</span>
          </Button>
          </>
      }

    </div>
  );
});
