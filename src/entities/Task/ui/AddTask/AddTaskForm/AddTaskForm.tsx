import { memo, useCallback, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { createTask } from "../../../model/services/createTask";
import { Task } from '../../../model/types/task'


import { TaskComplexity, TaskStatus, TaskType } from "@/entities/Column";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Select, SelectOption } from "@/shared/ui/Select";

import cls from './AddTaskForm.module.scss';

interface AddTaskFormProps {
  className?: string;
  onSuccess: () => void;
  columnId: string;
}

export const AddTaskForm = memo((props: AddTaskFormProps) => {
  const { className, onSuccess, columnId } = props;
  const dispatch = useAppDispatch();

  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskComplexity, setTaskComplexity] = useState<TaskComplexity>(TaskComplexity.HARD);
  const [taskType, setTaskType] = useState<TaskType>(TaskType.COMMUNICATION);
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(TaskStatus.NOT_STARTED);


  const complexityOptions = useMemo<SelectOption<TaskComplexity>[]>(
    () => [
      {
        value: TaskComplexity.HARD,
        content: 'Hard',
      },
      {
        value: TaskComplexity.MEDIUM,
        content: 'Medium',
      },
      {
        value: TaskComplexity.EASY,
        content: 'Easy',
      },
    ], []
  );

  const typeOptions = useMemo<SelectOption<TaskType>[]>(
    () => [
      {
        value: TaskType.COMMUNICATION,
        content: 'Communication',
      },
      {
        value: TaskType.PRACTICE,
        content: 'Practice',
      },
      {
        value: TaskType.EDUCATION,
        content: 'Education',
      },
    ], []
  );

  const statusOptions = useMemo<SelectOption<TaskStatus>[]>(
    () => [
      {
        value: TaskStatus.NOT_STARTED,
        content: 'Not Started',
      },
      {
        value: TaskStatus.DONE,
        content: 'Done',
      },
      {
        value: TaskStatus.IN_PROGRESS,
        content: 'In Progress',
      },
    ], []
  );

  const onButtonClick = useCallback(() => {
    const id = uuidv4();
    const task = {
      id,
      title: taskName,
      description: taskDescription,
      type: taskType as TaskType,
      complexity: taskComplexity as TaskComplexity,
      status: taskStatus as TaskStatus
    } as Task;

    dispatch(createTask({ columnId, task })).then(
      () => onSuccess())

    setTaskName('')
    setTaskDescription('')
    setTaskComplexity(TaskComplexity.HARD)
    setTaskType(TaskType.COMMUNICATION)
    setTaskStatus(TaskStatus.NOT_STARTED)
  }, [columnId, dispatch, onSuccess, taskComplexity, taskDescription, taskName, taskStatus, taskType])

  return (
    <form className={classNames(cls.AddTaskForm, {}, [className])}>
      <h1 className={cls.title}>
        Создание новой задачи
      </h1>
      <Input
        value={taskName}
        placeholder='Введите название'
        onChange={setTaskName}
      />
      <Input
        value={taskDescription}
        placeholder='Введите описание'
        onChange={setTaskDescription}
      />
      <Select
        label='Сложность'
        options={complexityOptions}
        value={taskComplexity}
        onChange={setTaskComplexity}
        max
      />
      <Select
        label='Тип задачи'
        options={typeOptions}
        value={taskType}
        onChange={setTaskType}
        max
      />
      <Select
        label='Статус'
        options={statusOptions}
        value={taskStatus}
        onChange={setTaskStatus}
        max
      />
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={onButtonClick}
        className={cls.button}
        disabled={taskName === '' || taskDescription === ''}
      >
        <span>Создать задачу</span>
      </Button>
    </form>
  );
});
