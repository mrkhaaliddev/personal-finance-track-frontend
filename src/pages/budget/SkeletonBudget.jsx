import React from "react";

const SkeletonBudget = () => {
  const numRows = 6;
  const numCols = 6;
  return (
    <div>
      <div className="mt-7 animate-pulse">
        <table className="w-full">
          <tbody>
            {Array.from({ length: numRows }, () => (
              <tr key={Math.random()}>
                {Array.from({ length: numCols }, () => (
                  <td className="px-4 py-3" key={Math.random()}>
                    <div className="w-[80%] h-6 bg-gray-300 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkeletonBudget;
