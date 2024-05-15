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
      query: ({ type }) => ({
        url: type
          ? `${TRANSACTIONURL}/get-Transaction?type=${type}`
          : `${TRANSACTIONURL}/get-Transaction`,
        method: "GET",
      }),
      providesTags: (result, error, { type }) => {
        return [{ type: "Transaction", id: type, user: result.data[0].user }];
      },
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
