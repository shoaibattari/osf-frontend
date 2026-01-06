import React from "react";

const TableSkeleton = ({ rows = 3, columns = 5 }) => {
  return (
    <div className="w-full overflow-x-auto mt-10">
      <table className="hidden laptop:table w-full border-collapse">
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-light-grey">
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex} className="p-3">
                  <div className="h-4 bg-gray-300 animate-pulse rounded w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="block laptop:hidden">
        {[...Array(rows)].map((_, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg border border-light-grey shadow-sm mb-2 animate-pulse grid grid-cols-2 gap-2"
          >
            {[...Array(columns)].map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-3 bg-light-grey rounded w-1/2 mb-2"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
