import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryUrl = "/api/categories";
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: `${categoryUrl}/get_category`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    createCategories: builder.mutation({
      query: (data) => ({
        url: `${categoryUrl}/create_category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategories: builder.mutation({
      query: ({ data, categoryId }) => ({
        url: `${categoryUrl}/update_category/${categoryId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategories: builder.mutation({
      query: (categoryId) => ({
        url: `${categoryUrl}/delete_category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
  // keepUnusedDataFor: 5,
});

export const {
  useGetCategoriesQuery,
  useCreateCategoriesMutation,
  useDeleteCategoriesMutation,
  useUpdateCategoriesMutation,
} = categoryApi;
