import { ModelShowContext } from "@/context/ModelShow";
import React, { useContext, useState } from "react";
import { Edit, Trash } from "react-feather";
import BudgetModal from "./BudgetModal";
import {
  useDeleteBudgetMutation,
  useGetBudgetQuery,
} from "@/redux/budget/budgetApi";
import moment from "moment";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import SkeletonBudget from "./SkeletonBudget";

const BudgetTable = () => {
  const { showModal, handleModelShow } = useContext(ModelShowContext);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [DeleteBudget] = useDeleteBudgetMutation();
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const { data: BudgetData, isLoading } = useGetBudgetQuery({
    page: page,
    per_page: PER_PAGE,
  });

  const totalPages = Math.ceil(BudgetData?.total / PER_PAGE);

  const handleEdit = (budget) => {
    handleModelShow(true);
    setSelectedBudget(budget);
  };

  // const handleDelete1 = async (id) => {
  //   console.log(id);

  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     const deletedBudget = ;
  //     console.log(deletedBudget);
  //     toast.success("Budget deleted successfully");
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "Deleted!",
  //         text: "Your file has been deleted.",
  //         icon: "success",
  //       });
  //     }
  //   });
  // };

  const handleDelete = (id) => {
    const clickedId = id;
    console.log(clickedId);
    Swal.fire({
      title: "Delete Budget?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await DeleteBudget(id).unwrap();
          toast.success("Budget deleted successfully");
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch (err) {
          console.log(err);
          Swal.fire(
            "Failed!",
            "Failed to delete category: " +
              (err?.data?.message || err.message || "Unknown error"),
            "error"
          );
          toast.error(err?.data?.message || err.error);
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-md w-[85%] px-5 py-5 mt-20 ml-10">
      <BudgetModal
        selectedBudget={selectedBudget}
        setSelectedBudget={setSelectedBudget}
      />
      <div className="flex justify-between">
        <h1 className="mb-2 text-2xl font-semibold">Budget!</h1>
        <div>
          <button
            onClick={() => {
              handleModelShow(true);
            }}
            className="hover:bg-[#121B28] border-2 font-semibold border-[#121B28] text-[#121B28] hover:text-white rounded-lg py-2 px-4"
          >
            Add New Budget
          </button>
        </div>
      </div>
      {isLoading ? (
        <SkeletonBudget />
      ) : (
        <div>
          <table className="w-full mt-4 overflow-hidden rounded-lg table-auto">
            <thead className="bg-white text-[#121B28] border">
              <tr>
                <th className="px-2 py-2 text-start">No</th>
                <th className="px-2 py-2 text-start">Start Date</th>
                <th className="px-2 py-2 text-start">Due Date</th>
                <th className="px-2 py-2 text-start">Annual Income</th>
                <th className="px-2 py-2 text-start">Annual Expense</th>
                <th className="px-2 py-2 text-start">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 bg-white border">
              {BudgetData?.data.length && isLoading === false ? (
                BudgetData?.data.map((budget, index) => (
                  <tr key={budget._id}>
                    <td className="px-2 py-2">
                      {(page - 1) * PER_PAGE + index + 1}
                    </td>
                    <td className="px-2 py-2">
                      {moment(budget.startDate).format("DD/MM/YYYY")}
                    </td>
                    <td className="px-2 py-2">
                      {moment(budget.dueDate).format("DD/MM/YYYY")}
                    </td>
                    <td className="px-2 py-2 font-bold text-green-600">
                      {budget.annualIncome.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td className="px-2 py-2 font-bold text-red-600">
                      {budget.annualExpense.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>

                    <td className="px-4 py-2 space-x-2 font-bold">
                      <button>
                        <Edit
                          onClick={() => handleEdit(budget)}
                          className="w-5 h-5 text-green-500"
                        />
                      </button>
                      <button>
                        <Trash
                          onClick={() => handleDelete(budget._id)}
                          className="w-5 h-5 text-red-500"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-2 py-2">No Budget</td>
                  <td className="px-2 py-2">No Budget</td>
                  <td className="px-2 py-2">No Budget</td>
                  <td className="px-2 py-2">No Budget</td>
                  <td className="px-2 py-2">No Budget</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex items-center justify-end pt-5 pr-20 gap-x-5">
            <GoArrowLeft
              disabled={page === 1}
              onClick={() => page > 1 && setPage(page - 1)}
              className={`p-1 bg-gray-200 rounded-full cursor-pointer select-none w-7 h-7 ${
                page === 1 ? "opacity-50" : ""
              }`}
            />
            <span>
              {page} of {totalPages}
            </span>
            <GoArrowRight
              disabled={page >= totalPages}
              onClick={() => page < totalPages && setPage(page + 1)}
              className={`p-1 bg-gray-200 rounded-full cursor-pointer select-none w-7 h-7 ${
                page >= totalPages ? "opacity-50" : ""
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetTable;
