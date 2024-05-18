import React, { useCallback, useContext, useState } from "react";
import { Edit, Trash } from "react-feather";
import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from "../../redux/transaction/transactionApi";
import moment from "moment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { ModelShowContext } from "../../context/ModelShow";
import TransectionSkeleton from "./TransectionSkeleton";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const Table = ({ setSelectedTransaction, transactionType, searchResults }) => {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const { data, isLoading } = useGetTransactionsQuery({
    type: transactionType,
    search: searchResults,
    page: page,
    per_page: PAGE_SIZE,
  });

  const totalPages = Math.ceil(data?.total / PAGE_SIZE);
  console.log("totalPages", totalPages);
  console.log("page", page);

  // setTransactionData(data?.data || []);
  const [DeleteTransaction, { isLoading: isDeleting }] =
    useDeleteTransactionMutation();
  const { handleModelShow } = useContext(ModelShowContext);

  // this is delete transaction
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Transaction?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await DeleteTransaction(id).unwrap();
          Swal.fire(
            "Deleted!",
            "Your transaction has been deleted.",
            "success"
          );
        } catch (err) {
          Swal.fire(
            "Failed!",
            "Failed to delete transaction: " +
              (err?.data?.message || err.message || "Unknown error"),
            "error"
          );
        }
      }
    });
  };

  // this is edit transaction
  const handleEdit = (transaction) => {
    handleModelShow(true);
    setSelectedTransaction(transaction);
  };

  if (isLoading) return <TransectionSkeleton />;

  return (
    <>
      <div>
        <table className="w-full mt-4 overflow-hidden rounded-lg table-auto">
          <thead className="bg-white text-[#121B28] border">
            <tr>
              <th className="px-2 py-2 text-start">Date</th>
              <th className="px-2 py-2 text-start">Name</th>
              <th className="px-4 py-2 text-start">Description</th>
              <th className="px-4 py-2 text-start">Category</th>
              <th className="px-4 py-2 text-start">Amount</th>
              <th className="px-4 py-2 text-start">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 bg-white border">
            {data?.data.length > 0 ? (
              data.data.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="px-2 py-2">
                    {moment(transaction.transactionDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-2 py-2">{transaction.name}</td>
                  <td className="max-w-xs px-4 py-2 break-words truncate">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-2">{transaction.category}</td>
                  <td
                    className="px-4 py-2 font-bold"
                    style={{
                      color: transaction.type === "EXPENSE" ? "red" : "green",
                    }}
                  >
                    {transaction.type === "EXPENSE"
                      ? `${transaction.amount.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}`
                      : `${transaction.amount.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}`}
                  </td>
                  <td className="px-4 py-2 space-x-2 font-bold">
                    <button onClick={() => handleEdit(transaction)}>
                      <Edit className="w-5 h-5 text-green-500" />
                    </button>
                    <button onClick={() => handleDelete(transaction._id)}>
                      <Trash className="w-5 h-5 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Data Found</td>
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
    </>
  );
};

export default Table;
