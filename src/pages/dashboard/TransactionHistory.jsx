import React from "react";
import { Edit, Trash } from "react-feather";

const TransactionHistory = () => {
  return (
    <>
      <div className="mb-10">
        <h1 className="font-semibold text-2xl text-[] mb-4">
          Transaction History
        </h1>
        <table className="table-auto w-[815px] mt-4 rounded-lg overflow-hidden">
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
            <tr className="border">
              <td className="px-2 py-2">March 21, 2023</td>
              <td className="px-2 py-2">Khaalid C/raxiin Cabdi</td>
              <td className="px-4 py-2">maanta </td>
              <td className="px-4 py-2">food</td>
              <td className="px-4 py-2 font-bold">$20</td>
              <td className="px-4 py-2 space-x-2 font-bold">
                {" "}
                <button>
                  <Edit className="w-5 h-5 text-green-500" />
                </button>
                <button>
                  <Trash className="w-5 h-5 text-red-500" />
                </button>
              </td>
            </tr>
            {/* <tr className="border">
              <td class="px-2 py-2">Khaalid C/raxiin Cabdi</td>
              <td class="px-4 py-2">cloth</td>
              <td class="px-4 py-2">june 07, 2023</td>
              <td class="px-4 py-2 font-bold">$120</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionHistory;
