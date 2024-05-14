import React from "react";

const TransectionSkeleton = () => {
  const numRows = 9;
  const numCols = 6;

  return (
    <div className="animate-pulse">
      <table className="w-full">
        <tbody>
          {Array.from({ length: numRows }, () => (
            <tr>
              {Array.from({ length: numCols }, () => (
                <td className="px-6 py-4">
                  <div className="w-full h-6 bg-gray-300 rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransectionSkeleton;
