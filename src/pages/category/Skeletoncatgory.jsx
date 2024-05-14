import React from "react";

export const Skeletoncatgory = () => {
  return (
    <div>
      <div className="container px-4 mx-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full text-sm leading-normal bg-gray-200">
              <th className="px-6 py-5 text-left"></th>
              <th className="px-6 py-5 text-left"></th>
              <th className="px-6 py-5 text-center"></th>
              <th className="px-6 py-5 text-center"></th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-gray-600">
            {[...Array(3)].map(
              (
                _,
                index // Create an array with 3 elements and map over it
              ) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  {/* Key is important for list items in React */}
                  <td className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                  <td className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
