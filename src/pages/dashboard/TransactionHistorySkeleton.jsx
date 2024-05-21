import React from "react";

const TransactionHistorySkeleton = () => {
  const numRows = 6;
  const numCols = 3;
  return (
    <div className="animate-pulse">
      <table className="w-full">
        <tbody>
          {Array.from({ length: numRows }, () => (
            <tr key={Math.random()}>
              {Array.from({ length: numCols }, () => (
                <td className="px-6 py-4" key={Math.random()}>
                  <div className="w-full h-4 bg-gray-300 rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistorySkeleton;
