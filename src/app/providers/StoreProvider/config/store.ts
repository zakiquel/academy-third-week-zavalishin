import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";

import { StateSchema, ThunkExtraArg } from "./StateSchema";

import { columnApi } from "@/entities/Column";
import { $api } from "@/shared/api/api";

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    [columnApi.reducerPath]: columnApi.reducer,
  }

  const extraArg: ThunkExtraArg = {
    api: $api,
  };

  return configureStore({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }).concat(columnApi.middleware),
  });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
