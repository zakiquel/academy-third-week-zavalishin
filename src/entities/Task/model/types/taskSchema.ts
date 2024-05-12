import { Task } from "./task";

export interface TaskSchema {
  task: Task;
  columnId: string;
  isLoading: boolean;
}