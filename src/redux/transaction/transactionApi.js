import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseQuery: "" });

const TRANSACTIONURL = "/api/transactions";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery,
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    GetTransactions: builder.query({
      query: () => ({
        url: `${TRANSACTIONURL}/get-Transaction`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    CreateTransaction: builder.mutation({
      query: (data) => ({
        url: `${TRANSACTIONURL}/create-Transaction`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),
    DeleteTransaction: builder.mutation({
      query: (transactionID) => ({
        url: `${TRANSACTIONURL}/delete-Transaction/${transactionID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),
    UpdateTransaction: builder.mutation({
      query: ({ data, id }) => ({
        url: `${TRANSACTIONURL}/update-Transaction/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),
    TotalIncomeAggrigate: builder.query({
      query: () => ({
        url: `${TRANSACTIONURL}/Totalincome-aggrigation`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    TotalExpenseAggrigate: builder.query({
      query: () => ({
        url: `${TRANSACTIONURL}/Totalexpense-aggrigation`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    MonthIncome: builder.query({
      query: () => ({
        url: `${TRANSACTIONURL}/MonthIncome`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    MonthExpense: builder.query({
      query: () => ({
        url: `${TRANSACTIONURL}/MonthExpense`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
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
} = transactionApi;
