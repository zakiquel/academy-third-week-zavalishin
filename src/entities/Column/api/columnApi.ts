import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { type Column } from "../model/types/column";

export const columnApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
  }),
  tagTypes: ['Column'],
  endpoints: (build) => ({
    getColumns: build.query<Column[], string>({
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
    })
  }),
});

export const getColumns = columnApi.endpoints?.getColumns.initiate;
