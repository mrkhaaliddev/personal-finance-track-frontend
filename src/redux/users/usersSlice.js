import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const usersSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
