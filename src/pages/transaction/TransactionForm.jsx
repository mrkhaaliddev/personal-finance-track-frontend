import React, { useContext, useEffect } from "react";
import { X } from "react-feather";
import { ModelShowContext } from "../../context/ModelShow";
import { useForm } from "react-hook-form";
import {
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
} from "../../redux/transaction/transactionApi";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "../../redux/transaction/categoryApi";
import moment from "moment";

const TransactionForm = ({ selectedTransaction, setSelectedTransaction }) => {
  const { showModal, handleModelShow } = useContext(ModelShowContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      transactionDate: "",
      name: "",
      amount: 0,
      category: "",
      description: "",
    },
  });

  // this resets the updats when you close the modal and open it again important
  useEffect(() => {
    !showModal && reset();
  }, [showModal, reset]);

  // this is taking categories to the transaction
  const { data: categories } = useGetCategoriesQuery();

  useEffect(() => {
    if (selectedTransaction !== null) {
      // console.log(selectedTransaction?.type),
      reset({
        type: selectedTransaction?.type,
        transactionDate: moment(selectedTransaction?.transactionDate).format(
          "YYYY-MM-DD"
        ),
        name: selectedTransaction?.name,
        amount: selectedTransaction?.amount,
        category: selectedTransaction?.category,
        description: selectedTransaction?.description,
      });
      // console.log(getValues().type.toLocaleLowerCase() === "income");
    }
  }, [showModal, selectedTransaction]);

  // this is for when you are creating a cetegory

  const handleClose = () => {
    handleModelShow(false);
    setSelectedTransaction(null);
    reset();
  };

  // this is for storing transaction in database
  const [CreateTransaction, { isLoading }] = useCreateTransactionMutation();
  const [UpdateTransaction, { isLoading: updateLoading }] =
    useUpdateTransactionMutation();

  useEffect(() => {
    if (!showModal) {
      reset({
        type: "",
        description: "",
        status: false,
      });
    }
  }, [showModal, reset]);

  const submitHandler = async (data) => {
    const { type, transactionDate, name, amount, category, description } = data;
    console.log(type, transactionDate, name, amount, category, description);
    try {
      if (!selectedTransaction) {
        const res = await CreateTransaction({
          type,
          transactionDate,
          name,
          amount,
          category,
          description,
        }).unwrap();
        console.log(res);
        toast.success("Transaction created successfully");
        handleModelShow(false);
        reset();
      } else {
        const updatedTransaction = {
          type: type.toUpperCase(),
          transactionDate,
          name,
          amount,
          category,
          description,
        };

        console.log(selectedTransaction?._id);

        const res = await UpdateTransaction({
          data: updatedTransaction,
          id: selectedTransaction?._id,
        }).unwrap();
        console.log(res);
        toast.success("Transaction updated successfully");
        handleModelShow(false);
        reset();
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.details || err.error);
    }
  };

  return (
    <>
      {showModal && (
        <>
          <form action="" onSubmit={handleSubmit(submitHandler)}>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
            <div className="relative inset-0 z-50 flex items-center justify-center w-full h-full">
              <div className="absolute mt-5 -ml-40 w-[700px] h-fit bg-white border border-slate-400 rounded-lg px-5 py-5">
                <div className="flex items-center justify-between mb-5">
                  <h1 className="text-2xl font-semibold">Transaction Form</h1>
                  <X
                    onClick={handleClose}
                    className="cursor-pointer text-slate-500 hover:text-slate-800"
                  />
                </div>
                <div className="flex mb-10 gap-x-5">
                  <div className="flex items-center gap-x-2">
                    <input
                      {...register("type", {
                        required: "Please select Income or Expense",
                      })}
                      type="radio"
                      id="income"
                      name="type"
                      className="w-4 h-4 cursor-pointer"
                      value={"INCOME"}
                      // checked={
                      //   getValues().type.toLocaleLowerCase() === "income"
                      // }
                    />
                    <label
                      htmlFor="income"
                      className={`text-xl font-semibold text-center cursor-pointer ${
                        errors.type
                          ? "text-red-500"
                          : "outline-2 outline-[#157AFF]"
                      }`}
                    >
                      Income
                    </label>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <input
                      {...register("type", {
                        required: "Please select Income or Expense",
                      })}
                      type="radio"
                      id="expense"
                      name="type"
                      className="w-4 h-4 cursor-pointer"
                      value={"EXPENSE"}
                      // checked={getValues("type") === "EXPENSE" ? true : false}
                    />
                    <label
                      htmlFor="expense"
                      className={`text-xl font-semibold text-center cursor-pointer ${
                        errors.type
                          ? "text-red-500"
                          : "outline-2 outline-[#157AFF]"
                      }`}
                    >
                      Expenses
                    </label>
                  </div>
                </div>
                <div className="flex flex-col mb-5 space-y-1">
                  <label
                    htmlFor=""
                    className={`font-semibold ${
                      errors.transactionDate?.message
                        ? "text-red-500"
                        : "text-slate-700"
                    }`}
                  >
                    Date
                  </label>
                  <input
                    {...register("transactionDate", {
                      required: "This field is required.",
                    })}
                    type="date"
                    className={`h-10 px-2 border rounded-lg cursor-pointer border-slate-300 outline-2 ${
                      errors.transactionDate?.message
                        ? "outline-red-500 border-red-500"
                        : "outline-2 outline-[#157AFF]"
                    }`}
                  />
                  <small className="h-1 text-red-500 w-fit">
                    {errors.transactionDate?.message}
                  </small>
                </div>
                <div className="flex flex-col mb-5 space-y-1">
                  {" "}
                  <label
                    htmlFor=""
                    className={`font-semibold ${
                      errors.name?.message ? "text-red-500" : "text-slate-700"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    {...register("name", {
                      required: "This field is required",
                    })}
                    type="text"
                    className={`h-10 pl-2 border rounded-lg border-slate-300 ${
                      errors.name?.message
                        ? "outline-red-500 border-red-500"
                        : "outline-2 outline-[#157AFF]"
                    }`}
                    placeholder="Enter Your Name"
                  />
                  <small className="h-1 text-red-500 w-fit">
                    {errors.name?.message}
                  </small>
                </div>
                <div className="flex justify-between mb-5 w-[100%] gap-x-20">
                  <div className="flex flex-col mb-5 space-y-1 w-[100%] ">
                    {" "}
                    <label
                      htmlFor=""
                      className={`font-semibold ${
                        errors.amount?.message
                          ? "text-red-500"
                          : "text-slate-700"
                      }`}
                    >
                      Amount
                    </label>
                    <input
                      {...register("amount", {
                        required: "This field is required",
                        min: {
                          value: 1,
                          message: "Minimum amount is 1.",
                        },
                      })}
                      type="number"
                      className={`w-full h-10 pl-2 border rounded-lg border-slate-300 ${
                        errors.amount?.message
                          ? "outline-red-500 border-red-500"
                          : "outline-2 outline-[#157AFF]"
                      }`}
                    />
                    <small className="h-1 text-red-500 w-fit">
                      {errors.amount?.message}
                    </small>
                  </div>
                  <div className="flex flex-col mr-5 space-y-1 w-[100%]">
                    {" "}
                    <label
                      htmlFor=""
                      className={`font-semibold ${
                        errors.category?.message
                          ? "text-red-500"
                          : "text-slate-700"
                      }`}
                    >
                      Category
                    </label>
                    <select
                      name=""
                      id=""
                      {...register("category", {
                        required: "This field is required",
                      })}
                      className={`w-full h-10 border rounded-lg ${
                        errors.category?.message
                          ? "outline-red-500"
                          : "outline-2 outline-[#157AFF]"
                      }`}
                    >
                      <option value="">None</option>
                      {categories?.data
                        ?.filter((category) => category.status)
                        .map((category) => (
                          <option key={category._id} className="px-4 py-2">
                            {category.status && category.type}
                          </option>
                        ))}
                    </select>
                    <small className="h-1 text-red-500 w-fit">
                      {errors.category?.message}
                    </small>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col mb-10 space-y-1">
                    <label htmlFor="" className="font-semibold">
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      cols="30"
                      rows="5"
                      className="py-1 pl-2 border rounded-lg border-slate-400 outline-slate-300"
                      placeholder="Desc..."
                    ></textarea>
                    <small className="h-1 pl-2 w-fit">
                      {errors.description?.message
                        ? ""
                        : "Add description for your money optional"}
                    </small>
                  </div>
                </div>
                <div className="flex justify-end gap-x-3">
                  <button
                    onClick={handleClose}
                    className="px-3 py-1 border-2 border-[#121B28] hover:text-white hover:bg-[#121B28] rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isLoading}
                    className={`px-4 py-1 text-white text-lg bg-[#398bff] rounded-md ${
                      isLoading ? "opacity-80	" : ""
                    }`}
                  >
                    {`${isLoading ? "Saving..." : "save"}`}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default TransactionForm;
