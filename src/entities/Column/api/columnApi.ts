import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Column, Task } from "../model/types/column";

export interface addTask {
  columnId: string;
  task: Task;
}

export const columnApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
  }),
  tagTypes: ['Column'],
  endpoints: (build) => ({
    getColumns: build.query<Column[], null>({
      query: () => ({
        url: '/columns',
      }),
      providesTags: ['Column'],
    }),
    addColumn: build.mutation<Column, Column>({
      query: (column) => ({
        url: `/columns`,
        method: 'POST',
        body: column,
      }),
      invalidatesTags: ['Column'],
    }),
    deleteColumn: build.mutation<Column, Column>({
      query: (column) => ({
        url: `/columns/${column.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Column'],
    }),
    addTask: build.mutation<Column, addTask>({
      query: ({ columnId, task }) => ({
        url: `/columns/${columnId}`,
        method: 'PATCH',
        body: task,
      }),
      invalidatesTags: ['Column'],
    }),
  }),
});

export const useColumns = columnApi.useGetColumnsQuery;
