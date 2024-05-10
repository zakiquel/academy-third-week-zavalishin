import { memo, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { createTask } from "../../../model/services/createTask";
import { Task } from '../../../model/types/task'


import { TaskComplexity, TaskStatus, TaskType } from "@/entities/Column";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";

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
  const [taskComplexity, setTaskComplexity] = useState<string>('');
  const [taskType, setTaskType] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<string>('');

  const complexityOptions = [
    'Hard', 'Medium', 'Easy'
  ]

  const typeOptions = [
    'Practice', 'Communication', 'Education'
  ]

  const statusOptions = [
    'Not Started', 'In Progress'
  ]

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
    setTaskComplexity('')
    setTaskType('')
    setTaskStatus('')
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
        label='Выберите сложность'
        options={complexityOptions}
        value={taskComplexity}
        onChange={setTaskComplexity}
      />
      <Select
        label='Выберите тип задачи'
        options={typeOptions}
        value={taskType}
        onChange={setTaskType}
      />
      <Select
        label='Выберите статус задачи'
        options={statusOptions}
        value={taskStatus}
        onChange={setTaskStatus}
      />
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={onButtonClick}
      >
        Создать задачу
      </Button>
    </form>
  );
});
