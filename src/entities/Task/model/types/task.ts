import { TaskComplexity, TaskStatus, TaskType } from "@/entities/Column";

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  status: TaskStatus;
  complexity: TaskComplexity;
}