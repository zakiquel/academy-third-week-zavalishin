import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { Task } from '../types/task';
import { TaskSchema } from "../types/taskSchema";

import { TaskComplexity, TaskStatus, TaskType } from "@/entities/Column";

const initialState: TaskSchema = {
  task: {
    id: '',
    title: '',
    type: 'Practice' as TaskType,
    status: 'Done' as TaskStatus,
    complexity: 'Easy' as TaskComplexity
  },
  columnId: '',
}

export const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload
    },
    setColumn: (state, action: PayloadAction<string>) => {
      state.columnId = action.payload
    },
  }
})

export const { actions: taskSliceActions } = taskSlice
export const { reducer: taskSliceReducer } = taskSlice
