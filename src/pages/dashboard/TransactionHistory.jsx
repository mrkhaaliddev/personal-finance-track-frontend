import { useGetLastTransactionsQuery } from "@/redux/transaction/transactionApi";
import moment from "moment";
import React from "react";
import { Edit, Trash } from "react-feather";
import TransactionHistorySkeleton from "./TransactionHistorySkeleton";

const TransactionHistory = () => {
  const { data, isLoading } = useGetLastTransactionsQuery({});

  return (
    <>
      <div className="mt-9">
        <h1 className="text-2xl font-bold">Latest Transactions</h1>
        <div className=" w-[900px] mt-2 overflow-hidden py-5 rounded-md">
          {isLoading ? (
            <TransactionHistorySkeleton />
          ) : (
            <table className="table-auto w-[600px] rounded">
              <thead className="bg-white text-[#121B28] border">
                <tr>
                  <th className="px-2 py-2 text-start">No</th>
                  <th className="px-2 py-2 text-start">Date</th>
                  <th className="px-2 py-2 text-start">Name</th>
                  <th className="px-4 py-2 text-start">Describtion</th>
                  <th className="px-4 py-2 text-start">Category</th>
                  <th className="px-6 py-2 text-start">Amount</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 bg-white border">
                {data?.data.length ? (
                  data?.data.map((data, index) => (
                    <tr className="border w-fit">
                      <td className="px-2 py-2">{index + 1}</td>
                      <td className="px-2 py-2">
                        {moment(data.transactionDate).format("DD/MM/YYYY")}
                      </td>
                      <td className="px-2 py-2">{data.name}</td>
                      <td className="px-2 py-2">{data.description}</td>
                      <td className="px-4 py-2">{data.category}</td>
                      <td
                        className="px-2 py-2 font-bold"
                        style={{
                          color: data.type === "EXPENSE" ? "red" : "green",
                        }}
                      >
                        {data.type === "EXPENSE"
                          ? `${data.amount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}`
                          : `${data.amount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}`}
                      </td>{" "}
                    </tr>
                  ))
                ) : (
                  <td>No Data here</td>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
