import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Column } from "@/entities/Column";

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
  async ({ columnId, taskId }, { rejectWithValue }) => {
    try {
      const column = await axios.get<Column>(`http://localhost:8000/columns/${columnId}`);

      const { tasks } = column.data;

      if (!tasks) {
        return rejectWithValue('No tasks');
      }

      const updatedTasks = tasks.filter(
        (task) => task.id !== taskId
      );

      const updatedColumn = { ...column.data, tasks: updatedTasks }
      const response = await axios.put<Column>(`http://localhost:8000/columns/${columnId}`, updatedColumn);
      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('Fetching error');
    }
  },
);
