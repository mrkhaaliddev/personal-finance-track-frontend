import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseQuery: "" });

const TRANSACTIONURL = "/api/transactions";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery,
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: ({ type, search, page, per_page }) => {
        const params = new URLSearchParams();
        if (type) params.append("type", type);
        if (search) params.append("search", search);
        if (page) params.append("page", page);
        if (per_page) params.append("per_page", per_page);
        return {
          url: params.toString()
            ? `${TRANSACTIONURL}/get-Transaction?${params.toString()}`
            : `${TRANSACTIONURL}/get-Transaction`,
          method: "GET",
        };
      },
      providesTags: (result, error, { type }) => {
        return result
          ? result.data.map(({ _id }) => ({ type: "Transaction", id: _id }))
          : [{ type: "Transaction", id: "LIST" }];
      },
    }),

    getLastTransactions: builder.query({
      query: () => ({
        url: `${TRANSACTIONURL}/last-transactions`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),

    createTransaction: builder.mutation({
      query: (data) => ({
        url: `${TRANSACTIONURL}/create-Transaction`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),

    deleteTransaction: builder.mutation({
      query: (transactionID) => ({
        url: `${TRANSACTIONURL}/delete-Transaction/${transactionID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),

    updateTransaction: builder.mutation({
      query: ({ data, id }) => ({
        url: `${TRANSACTIONURL}/update-Transaction/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),

    totalIncomeAggrigate: builder.query({
      query: () => ({
        url: `${TRANSACTIONURL}/Totalincome-aggrigation`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),

    totalExpenseAggrigate: builder.query({
      query: () => ({
        url: `${TRANSACTIONURL}/Totalexpense-aggrigation`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),

    monthIncome: builder.query({
      query: () => ({
        url: `${TRANSACTIONURL}/MonthIncome`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),

    monthExpense: builder.query({
      query: () => ({
        url: `${TRANSACTIONURL}/MonthExpense`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),

    getTransactionBalance: builder.query({
      query: () => ({
        url: `${TRANSACTIONURL}/balance`,
      }),
      providesTags: ["Transaction"],
    }),

    getTransactionGraphData: builder.query({
      query: () => ({
        url: `${TRANSACTIONURL}/month-payments`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
      // providesTags: (result, error, { type }) => result ? result.data.map(({ _id }) => ({ type: "Transaction", id: _id })) : ["Transaction"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
  useTotalIncomeAggrigateQuery,
  useTotalExpenseAggrigateQuery,
  useMonthIncomeQuery,
  useMonthExpenseQuery,
  useGetTransactionBalanceQuery,
  useGetTransactionGraphDataQuery,
  useGetLastTransactionsQuery,
} = transactionApi;
