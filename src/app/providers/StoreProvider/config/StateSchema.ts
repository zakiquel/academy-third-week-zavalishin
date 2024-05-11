import { AxiosInstance } from "axios";

import { columnApi } from "@/entities/Column";
import { TaskSchema } from "@/entities/Task";

export interface StateSchema {
  task: TaskSchema
  [columnApi.reducerPath]: ReturnType<typeof columnApi.reducer>;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}