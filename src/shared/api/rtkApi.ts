import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
  }),
  endpoints: () => ({}),
});