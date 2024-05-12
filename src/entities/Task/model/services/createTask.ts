import { createAsyncThunk } from '@reduxjs/toolkit';

import { Task } from '../../model/types/task';

import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Column, getColumn, updateColumns } from "@/entities/Column";

interface createTaskProps {
  columnId: string;
  task: Task;
}

export const createTask = createAsyncThunk<
  Column,
  createTaskProps,
  ThunkConfig<string>
>(
  'task/createTask',
  async ({ columnId, task }, { rejectWithValue, dispatch }) => {
    try {
      const data = await dispatch(getColumn(columnId)).unwrap();

      if (!data) {
        return rejectWithValue('No data');
      }

      const { tasks } = data;

      if (!tasks) {
        const updatedColumn = { ...data, tasks: [task] }
        return await dispatch(updateColumns(updatedColumn)).unwrap();
      } 
        const updatedTasks = [...tasks, { ...task }]

        const updatedColumn = { ...data, tasks: updatedTasks }

        const response = await dispatch(updateColumns(updatedColumn)).unwrap();

        if (!response) {
          throw new Error();
        }

        return response;
    } catch (e) {
      return rejectWithValue('Fetching error');
    }
  },
);
