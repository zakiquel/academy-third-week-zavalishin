import { createAsyncThunk } from '@reduxjs/toolkit';

import { taskSliceActions } from '../..';

import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Column, getColumn, updateColumns } from "@/entities/Column";

interface deleteTaskProps {
  columnId: string;
  taskId: string;
}

export const deleteTask = createAsyncThunk<
  Column,
  deleteTaskProps,
  ThunkConfig<string>
>(
  'task/createTask',
  async ({ columnId, taskId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(taskSliceActions.setIsLoading(true));
      const data = await dispatch(getColumn(columnId)).unwrap();

      const { tasks } = data;

      if (!tasks) {
        return rejectWithValue('No tasks');
      }

      const updatedTasks = tasks.filter(
        (task) => task.id !== taskId
      );

      const updatedColumn = { ...data, tasks: updatedTasks }
      const response = await dispatch(updateColumns(updatedColumn)).unwrap();
      if (!response) {
        throw new Error();
      }
      dispatch(taskSliceActions.setIsLoading(false));
      return response;
    } catch (e) {
      return rejectWithValue('Fetching error');
    }
  },
);
