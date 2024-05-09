import { AxiosInstance } from "axios";

import { columnApi } from "@/entities/Column";

export interface StateSchema {
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