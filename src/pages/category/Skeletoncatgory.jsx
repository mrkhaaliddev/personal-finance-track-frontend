import React from "react";

export const Skeletoncatgory = () => {
  const numRows = 6;
  const numCols = 6;
  return (
    <div className="animate-pulse">
      <table className="w-full">
        <tbody>
          {Array.from({ length: numRows }, () => (
            <tr key={Math.random()}>
              {Array.from({ length: numCols }, () => (
                <td className="px-6 py-4" key={Math.random()}>
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
