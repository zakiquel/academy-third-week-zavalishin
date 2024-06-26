import { Task } from "@/entities/Task";

export enum TaskType {
  PRACTICE = 'Practice',
  COMMUNICATION = 'Communication',
  EDUCATION = 'Education',
}

export enum TaskStatus {
  DONE = 'Done',
  IN_PROGRESS = 'In Progress',
  NOT_STARTED = 'Not Started',
}

export enum TaskComplexity {
  HARD = 'Hard',
  MEDIUM = 'Medium',
  EASY = 'Easy',
}

export interface Column {
  id: string;
  title: string;
  tasks?: Task[];
}