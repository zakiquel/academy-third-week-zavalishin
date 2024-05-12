import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Column } from "../model/types/column";

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
    getColumnById: build.query<Column, string>({
      query: (columnId) => ({
        url: `/columns/${columnId}`,
      }),
      providesTags: ['Column'],
    }),
    updateColumn: build.mutation<Column, Column>({
      query: (column) => ({
        url: `/columns/${column.id}`,
        method: 'PATCH',
        body: column,
      }),
      invalidatesTags: ['Column'],
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
export const getColumn = columnApi.endpoints?.getColumnById.initiate;
export const updateColumns = columnApi.endpoints?.updateColumn.initiate;
