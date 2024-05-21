import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const budgetUrl = "/api/budget";
export const budgetApi = createApi({
  reducerPath: "budgetApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["Budget"],
  endpoints: (builder) => ({
    getBudget: builder.query({
      query: ({ page, per_page }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (per_page) params.append("per_page", per_page);

        return {
          url: params.toString()
            ? `${budgetUrl}/get_budget?${params.toString()}`
            : `${budgetUrl}/get_budget`,
          method: "GET",
        };
      },
      providesTags: ["Budget"],
    }),
    createBudget: builder.mutation({
      query: (data) => ({
        url: `${budgetUrl}/create_budget`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Budget"],
    }),
    updateBudget: builder.mutation({
      query: ({ data, budgetId }) => ({
        url: `${budgetUrl}/update_budget/${budgetId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Budget"],
    }),
    deleteBudget: builder.mutation({
      query: (budgetId) => ({
        url: `${budgetUrl}/delete_budget/${budgetId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Budget"],
    }),
  }),
});

export const {
  useGetBudgetQuery,
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
} = budgetApi;
