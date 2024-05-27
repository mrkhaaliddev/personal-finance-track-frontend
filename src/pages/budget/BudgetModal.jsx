import { ModelShowContext } from "@/context/ModelShow";
import {
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
} from "@/redux/budget/budgetApi";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { X } from "react-feather";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const BudgetModal = ({ selectedBudget, setSelectedBudget }) => {
  const { showModal, handleModelShow } = useContext(ModelShowContext);
  const [annualIncome, setAnnualIncome] = useState(0);
  const [annualExpense, setAnnualExpense] = useState(0);
  const [balance, setBalance] = useState(null);

  const [CreateBudget, { isLoading }] = useCreateBudgetMutation();

  // update Budget

  const [UpdateBudgate] = useUpdateBudgetMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      annualIncome: "",
      annualExpense: "",
      startDate: moment().format("YYYY-MM-DD"),
      dueDate: "",
    },
  });

  useEffect(() => {
    if (selectedBudget !== null) {
      reset({
        annualIncome: selectedBudget?.annualIncome,
        annualExpense: selectedBudget?.annualExpense,
        startDate: moment(selectedBudget?.startDate).format("YYYY-MM-DD"),
        dueDate: moment(selectedBudget?.dueDate).format("YYYY-MM-DD"),
      });
    }
  }, [showModal, selectedBudget]);

  const handleClose = () => {
    handleModelShow(false);
    setSelectedBudget(null);
    console.log(selectedBudget);
    reset({
      annualIncome: 0,
      annualExpense: 0,
      startDate: moment().format("YYYY-MM-DD"),
      dueDate: "",
    });
  };

  const income = watch("annualIncome");
  const expense = watch("annualExpense");
  // console.log(income, expense);

  // console.log("before", annualIncome, annualExpense);

  useEffect(() => {
    setAnnualIncome(income);
    setAnnualExpense(expense);
    const Balance = Math.ceil(Number(income) - Number(expense));
    setBalance(Balance);
  }, [income, expense]);

  // console.log("after", annualIncome, annualExpense);
  // console.log("balance", balance);

  const submitHandler = async (data) => {
    const { annualIncome, annualExpense, startDate, dueDate } = data;
    try {
      if (!selectedBudget) {
        const result = await CreateBudget({
          annualIncome,
          annualExpense,
          startDate,
          dueDate,
        }).unwrap();
        console.log(result);
        toast.success("Budget created successfully");
        handleModelShow(false);
        reset();
      } else {
        const updatedBudget = {
          annualIncome,
          annualExpense,
          startDate,
          dueDate,
        };

        const result = await UpdateBudgate({
          data: updatedBudget,
          budgetId: selectedBudget._id,
        }).unwrap();
        console.log(result);
        toast.success("Budget updated successfully");
        handleModelShow(false);
        reset();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.data.message || err.error);
    }
  };

  return (
    <div>
      {showModal && (
        <form action="" onSubmit={handleSubmit(submitHandler)}>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          <div className="relative inset-0 z-50 flex items-center justify-center w-full h-full">
            <div className="absolute w-[60%] bg-white border rounded-lg mt-72 border-slate-400 px-5 py-5">
              <div className="flex justify-between mb-10">
                <h1 className="text-2xl font-semibold">Budgeting Form</h1>
                <X
                  onClick={handleClose}
                  className="w-6 h-6 cursor-pointer text-slate-500 hover:text-slate-800"
                />
              </div>
              <div className="flex flex-col mb-10">
                <label htmlFor="" className="font-semibold">
                  Anual Income
                </label>
                <input
                  {...register("annualIncome", {
                    required: "Annual Income Is Required",
                    min: {
                      value: 1,
                      message: "Anual Income Must Be Greater Than 0",
                    },
                  })}
                  type="number"
                  className="h-10 pl-2 border rounded outline-2 outline-blue-500"
                  placeholder="Enter Your Annual Income"
                />
                <small className="h-1 text-sm text-red-500 w-fit">
                  {errors.annualIncome?.message}
                </small>
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="" className="font-semibold">
                  Anual Expense
                </label>
                <input
                  {...register("annualExpense", {
                    required: "Anunal Expense Is Required",
                    min: {
                      value: 1,
                      message: "Anual Expense Must Be Greater Than 0",
                    },
                  })}
                  type="number"
                  className="h-10 pl-2 border rounded outline-2 outline-blue-500"
                  placeholder="Enter Your Annual Expense"
                />
                <small className="h-1 text-sm text-red-500 w-fit">
                  {errors.annualExpense?.message}
                </small>
              </div>
              <div className="w-full h-14">
                {balance && balance !== 0 && annualExpense && annualIncome ? (
                  <div
                    className={`p-3 mb-4 text-sm ${
                      balance >= 0 ? "text-green-700" : "text-red-700"
                    } rounded-lg ${
                      balance >= 0 ? "bg-green-100" : "bg-red-100"
                    }`}
                    role="alert"
                  >
                    <span className="font-medium">
                      Budget:{" "}
                      {balance.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>{" "}
                    {balance >= 0 ? "Savings" : "Losing"}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              <div className="flex w-full gap-2 mb-10">
                <div className="flex flex-col flex-wrap flex-1">
                  <label htmlFor="startDate" className="font-semibold">
                    Start Date
                  </label>
                  {/* <DatePicker
                    selected={startDate}
                     onChange={(date) => setStartDate(date)}
                    excludeDates={disabledDates} // Disable specific dates
                    placeholderText="Select a date"
                  /> */}
                  <input
                    {...register("startDate", {
                      required: "Start Date Is Required",
                    })}
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="h-10 px-2 py-1 border rounded cursor-pointer outline-2 outline-blue-500 border-slate-200"
                  />
                  <small className="text-sm text-red-500">
                    {errors.startDate?.message}
                  </small>
                </div>
                <div className="flex flex-col flex-1">
                  <label htmlFor="dueDate" className="font-semibold">
                    Due Date
                  </label>
                  <input
                    {...register("dueDate", {
                      required: "Due Date Is Required",
                    })}
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="h-10 px-2 py-1 border rounded cursor-pointer outline-2 outline-blue-500 border-slate-200"
                  />
                  <small className="text-sm text-red-500">
                    {errors.dueDate?.message}
                  </small>
                </div>
              </div>

              <div className="flex justify-end gap-x-3">
                <button
                  className="px-3 py-1 border-2 border-[#121B28] hover:text-white hover:bg-[#121B28] rounded-md"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  disabled={isLoading}
                  className={`px-4 py-1 text-white text-lg bg-[#398bff] rounded-md ${
                    isLoading ? "opacity-30	" : ""
                  }`}
                >
                  save
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default BudgetModal;
