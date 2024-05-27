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
    // total Income Budget
    getIncomeBudget: builder.query({
      query: () => ({
        url: `${budgetUrl}//totalIncome_aggrigation`,
        method: "GET",
      }),
      providesTags: ["Budget"],
    }),
    //total Expense Budget
    getExpenseBudget: builder.query({
      query: () => ({
        url: `${budgetUrl}/totalExpense_aggrigation`,
        method: "GET",
      }),
      providesTags: ["Budget"],
    }),
    // month income budget
    getMonthIncomeBudget: builder.query({
      query: () => ({
        url: `${budgetUrl}/monthIncome_aggrigation`,
        method: "GET",
      }),
      providesTags: ["Budget"],
    }),

    // month expense budget
    getMonthExpenseBudget: builder.query({
      query: () => ({
        url: `${budgetUrl}/monthExpense_aggrigation`,
        method: "GET",
      }),
      providesTags: ["Budget"],
    }),
    getGraphData: builder.query({
      query: () => ({
        url: `${budgetUrl}/graph_monthly_data`,
        method: "GET",
      }),
      providesTags: ["Budget"],
    }),
  }),
});

export const {
  useGetBudgetQuery,
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
  useGetIncomeBudgetQuery,
  useGetExpenseBudgetQuery,
  useGetMonthIncomeBudgetQuery,
  useGetMonthExpenseBudgetQuery,
  useGetGraphDataQuery,
} = budgetApi;
