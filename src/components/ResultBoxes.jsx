import React from "react";
import { Server, Trello, TrendingDown, TrendingUp } from "react-feather";
import { TbTrendingDown2 } from "react-icons/tb";
import {
  useGetTransactionBalanceQuery,
  useMonthExpenseQuery,
  useMonthIncomeQuery,
  useTotalExpenseAggrigateQuery,
  useTotalIncomeAggrigateQuery,
} from "../redux/transaction/transactionApi";
import MoneySkeleton from "./MoneySkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetExpenseBudgetQuery,
  useGetIncomeBudgetQuery,
  useGetMonthExpenseBudgetQuery,
  useGetMonthIncomeBudgetQuery,
} from "@/redux/budget/budgetApi";
import BudgetMoneySkeleton from "./BudgetMoneySkeleton";

const ResultBoxes = () => {
  // Reading total Income from Database
  const { data: TotalIncome, isLoading: IncomeLoading } =
    useTotalIncomeAggrigateQuery();
  let totalIncome = 0;

  if (TotalIncome?.data?.length) {
    totalIncome = TotalIncome?.data[0].totalIncome;
  }

  const formattedIncome =
    totalIncome &&
    totalIncome?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  // Reading total Expense from Database
  const { data: TotalExpense, isLoading: ExpenseLoading } =
    useTotalExpenseAggrigateQuery();

  let totalExpense = 0;

  if (TotalExpense?.data?.length) {
    totalExpense = TotalExpense?.data[0].totalExpense;
  }

  const formattedExpense =
    totalExpense &&
    totalExpense?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  // Reading the balance from the database using aggregation

  const { data: Balance, isLoading: BalanceLoading } =
    useGetTransactionBalanceQuery();

  // console.log();
  let TotalBalance = 0;
  if (Balance?.data.length) {
    TotalBalance = Balance?.data[0].netAmount;
  }
  const formattedBalance =
    TotalBalance &&
    TotalBalance?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  // Reading month Income from Database
  const { data: MonthIncome, isLoading: MonthIncomeLoading } =
    useMonthIncomeQuery();
  let ThisMonthIncome = 0;

  if (MonthIncome?.data?.length) {
    ThisMonthIncome = MonthIncome?.data[0].MonthIncome;
  }

  const formattedMonthIncome =
    ThisMonthIncome &&
    ThisMonthIncome?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  // Reading month Expense from Database

  const { data: MonthExpense, isLoading: MonthExpenseLoading } =
    useMonthExpenseQuery();

  let ThisMonthExpense = 0;

  if (MonthExpense?.data?.length) {
    ThisMonthExpense = MonthExpense?.data[0].MonthExpense;
  }

  const formattedMonthExpense =
    ThisMonthExpense &&
    ThisMonthExpense?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  // Reading for Budget INCOME

  const { data: BudgetIncome, isLoading: BudgetIncomeLoading } =
    useGetIncomeBudgetQuery();

  let Budgetincome = 0;

  if (BudgetIncome?.results?.length) {
    Budgetincome = BudgetIncome?.results[0].totalBudget;
  }
  const formattedBudgetIncome =
    Budgetincome &&
    Budgetincome.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  // Reading for Budget EXPENSE

  const { data: BudgetExpense, isLoading: BudgetExpenseLoading } =
    useGetExpenseBudgetQuery();

  let Budgetexpense = 0;
  if (BudgetExpense?.results?.length) {
    Budgetexpense = BudgetExpense?.results[0].totalExpense;
  }

  const formattedBudgetExpense =
    Budgetexpense &&
    Budgetexpense.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  // Reading for month Budget Income

  const { data: MonthBudgetIncome, isLoading: MonthBudgetIncomeLoading } =
    useGetMonthIncomeBudgetQuery();

  let monthIncome = 0;

  if (MonthBudgetIncome?.results?.length) {
    monthIncome = MonthBudgetIncome?.results[0].monthIncome;
  }
  const formattedMonthBudgetIncome =
    monthIncome &&
    monthIncome.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  // Reading for month Budget Expense

  const { data: MonthBudgetExpense, isLoading: MonthBudgetExpenseLoading } =
    useGetMonthExpenseBudgetQuery();

  let monthExpense = 0;

  if (MonthBudgetExpense?.results?.length) {
    monthExpense = MonthBudgetExpense?.results[0].monthExpense;
  }
  const formattedMonthBudgetExpense =
    monthExpense &&
    monthExpense.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <>
      <div className="grid lg:grid-cols-3 box-content md:grid-cols-2 md:gap-x-4 overflow-x-hidden gap-y-3 lg:flex-row lg:gap-x-12  w-[100%]">
        <Card className="flex items-center border-none h-28 px-4 py-4 mb-10 shadow-none bg-white rounded-lg min-w-[22%]">
          <TrendingUp className="w-9 h-9 rounded-full text-[#5CB4AD] px-1 py-1 mb-1 mr-3" />
          <div>
            <p className="text-lg font-semibold text-gray-400">Total Income</p>
            <div className="flex text-center">
              <h1 className="text-2xl font-bold text-green-800">
                {IncomeLoading ? <MoneySkeleton /> : `${formattedIncome}`}
              </h1>
              <p className="mt-[8px] mr-1 text-[16px] font-semibold text-yellow-800 ml-1">
                {BudgetIncomeLoading ? (
                  <BudgetMoneySkeleton />
                ) : (
                  `(${formattedBudgetIncome})`
                )}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mt-[11px] cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>
          </div>
        </Card>
        <Card className="flex items-center border-none h-28 shadow-none px-4 py-4 mb-10 bg-white rounded-lg min-w-[22%]">
          <TbTrendingDown2 className="w-9 h-9 rounded-full text-[#FFB6AE] px-[5px] py-[5px] mb-1 mr-3" />
          <div>
            <p className="text-lg font-semibold text-gray-400">
              Total Expenses
            </p>
            <div className="flex text-center">
              <h1 className="text-2xl font-bold text-red-600">
                {ExpenseLoading ? <MoneySkeleton /> : `${formattedExpense}`}
              </h1>
              <p className="mt-[8px] mr-1 text-[16px] font-semibold text-yellow-800 ml-1">
                {BudgetExpenseLoading ? (
                  <BudgetMoneySkeleton />
                ) : (
                  `(${formattedBudgetExpense})`
                )}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mt-[11px] cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>
          </div>
        </Card>
        <Card className="flex items-center border-none shadow-none h-28 px-4 py-4 mb-10 bg-white rounded-lg min-w-[22%]">
          <Trello className="w-9 h-9 rounded-full  text-[#5CB4AD] px-1 py-1 mb-1 mr-3" />
          <div>
            <p className="text-lg font-semibold text-gray-400">Total Balance</p>

            <h1 className="text-2xl font-bold text-blue-700">
              {BalanceLoading ? <MoneySkeleton /> : `${formattedBalance}`}
            </h1>
          </div>
        </Card>
        <Card className="flex items-center border-none shadow-none h-28 px-4 py-4 mb-10 bg-white rounded-lg min-w-[22%]">
          <TrendingUp className="w-9 h-9 rounded-full text-[#5CB4AD] px-1 py-1 mb-1 mr-3" />
          <div>
            <p className="text-lg font-semibold text-gray-400">Month Income</p>

            <div className="flex text-center">
              <h1 className="text-2xl font-bold text-green-800">
                {MonthIncomeLoading ? (
                  <MoneySkeleton />
                ) : (
                  `${formattedMonthIncome}`
                )}
              </h1>
              <p className="mt-[8px] mr-1 text-[16px] font-semibold text-yellow-800 ml-1">
                {MonthBudgetIncomeLoading ? (
                  <BudgetMoneySkeleton />
                ) : (
                  `(${formattedMonthBudgetIncome})`
                )}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mt-[11px] cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>
          </div>
        </Card>
        <Card className="flex items-center border-none h-28 shadow-none px-4 py-4 mb-10 bg-white rounded-lg min-w-[22%]">
          <TrendingDown className="w-9 h-9 rounded-full text-[#FFB6AE]  px-1 py-1 mb-1 mr-3" />
          <div>
            <p className="text-lg font-semibold text-gray-400">
              Month Expenses
            </p>

            <div className="flex text-center">
              <h1 className="text-2xl font-bold text-red-600">
                {MonthExpenseLoading ? (
                  <MoneySkeleton />
                ) : (
                  `${formattedMonthExpense}`
                )}
              </h1>
              <p className="mt-[8px] mr-1 text-[16px] font-semibold text-yellow-800 ml-1">
                {MonthBudgetExpenseLoading ? (
                  <BudgetMoneySkeleton />
                ) : (
                  `(${formattedMonthBudgetExpense})`
                )}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mt-[11px] cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ResultBoxes;
