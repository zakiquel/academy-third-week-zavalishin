import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Task } from '../../model/types/task';

import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Column } from "@/entities/Column";

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
      const column = await axios.get<Column>(`http://localhost:8000/columns/${columnId}`);

      const { tasks } = column.data;
      
      if (!tasks) {
        const updatedColumn = { ...column.data, tasks: [task] }
        const response = await axios.put<Column>(`http://localhost:8000/columns/${columnId}`, updatedColumn);
        return response.data;
      } 
        const updatedTasks = [...tasks, { ...task }]

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
