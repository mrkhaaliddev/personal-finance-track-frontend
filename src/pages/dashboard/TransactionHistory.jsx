import { useGetLastTransactionsQuery } from "@/redux/transaction/transactionApi";
import moment from "moment";
import React from "react";
import { Edit, Trash } from "react-feather";

const TransactionHistory = () => {
  const { data } = useGetLastTransactionsQuery({});

  // console.log(data?.data.map((data) => data.name));
  return (
    <>
      <div className="mb-10">
        <h1 className="mb-4 text-2xl font-bold">Latest Transactions</h1>
        <table className="table-auto w-[815px] mt-4 rounded-lg overflow-hidden">
          <thead className="bg-white text-[#121B28] border">
            <tr>
              <th className="px-2 py-2 text-start">Date</th>
              <th className="px-2 py-2 text-start">Name</th>
              <th className="px-4 py-2 text-start">Category</th>
              <th className="px-4 py-2 text-start">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 bg-white border">
            {data?.data.length ? (
              data?.data.map((data) => (
                <tr className="border">
                  <td className="px-2 py-2">
                    {moment(data.transactionDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-2 py-2">{data.name}</td>
                  <td className="px-4 py-2">{data.category}</td>
                  <td
                    className="px-4 py-2 font-bold"
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
      </div>
    </>
  );
};

export default TransactionHistory;
