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

const ResultBoxes = () => {
  // Reading total Income from Database
  const { data: TotalIncome, isLoading: IncomeLoading } =
    useTotalIncomeAggrigateQuery();
  // console.log(TotalIncome?.data[0].totalIncome)
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

  // console.log(TotalExpense?.data[0].totalExpense);
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

  // Reading the balance from the database using aggrigation

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
  // console.log(formattedBalance);

  // Reading month Income from Database
  const { data: MonthIncome, isLoading: MonthIncomeLoading } =
    useMonthIncomeQuery();
  // console.log(MonthIncome?.data[0].MonthIncome);
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
  return (
    <>
      <div className="grid lg:grid-cols-4 box-content md:grid-cols-2 md:gap-x-4 overflow-x-hidden gap-y-3 lg:flex-row lg:gap-x-12  w-[100%]">
        <Card className="flex items-center border-none h-24 px-4 py-4 mb-10 shadow-none bg-white rounded-lg min-w-[22%]">
          <TrendingUp className="w-9 h-9 rounded-full text-[#5CB4AD] px-1 py-1 mb-1 mr-3" />
          <div>
            <p className="font-semibold text-gray-400">Total Income</p>
            <h1 className="text-2xl font-bold text-green-800">
              {IncomeLoading ? <MoneySkeleton /> : `${formattedIncome}`}
            </h1>
          </div>
        </Card>
        <Card className="flex items-center border-none h-24 shadow-none px-4 py-4 mb-10 bg-white rounded-lg min-w-[22%]">
          <TbTrendingDown2 className="w-9 h-9 rounded-full text-[#FFB6AE] px-[5px] py-[5px] mb-1 mr-3" />
          <div>
            <p className="font-semibold text-gray-400">Total Expenses</p>
            <h1 className="text-2xl font-bold text-red-600">
              {ExpenseLoading ? <MoneySkeleton /> : `${formattedExpense}`}
            </h1>
          </div>
        </Card>
        <Card className="flex items-center border-none shadow-none h-24 px-4 py-4 mb-10 bg-white rounded-lg min-w-[22%]">
          <Trello className="w-9 h-9 rounded-full  text-[#5CB4AD] px-1 py-1 mb-1 mr-3" />
          <div>
            <p className="font-semibold text-gray-400">Total Balance</p>
            <h1 className="text-2xl font-bold text-blue-700">
              {BalanceLoading ? <MoneySkeleton /> : `${formattedBalance}`}
            </h1>
          </div>
        </Card>
        <Card className="flex items-center border-none shadow-none h-24 px-4 py-4 mb-10 bg-white rounded-lg min-w-[22%]">
          <TrendingUp className="w-9 h-9 rounded-full text-[#5CB4AD] px-1 py-1 mb-1 mr-3" />
          <div>
            <p className="font-semibold text-gray-400">Month Income</p>
            <h1 className="text-2xl font-bold text-green-800">
              {MonthIncomeLoading ? (
                <MoneySkeleton />
              ) : (
                `${formattedMonthIncome}`
              )}
            </h1>
          </div>
        </Card>
        <Card className="flex items-center border-none h-24 shadow-none px-4 py-4 mb-10 bg-white rounded-lg min-w-[22%]">
          <TrendingDown className="w-9 h-9 rounded-full text-[#FFB6AE]  px-1 py-1 mb-1 mr-3" />
          <div>
            <p className="font-semibold text-gray-400">Month Expenses</p>
            <h1 className="text-2xl font-bold text-red-600">
              {MonthExpenseLoading ? (
                <MoneySkeleton />
              ) : (
                `${formattedMonthExpense}`
              )}
            </h1>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ResultBoxes;
