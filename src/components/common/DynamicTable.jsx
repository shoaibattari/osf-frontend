import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import TableSkeleton from "./TableSkeleton";

const DynamicTable = ({
  columns,
  data,
  hideSearchBar = false,
  hidePageSize = false,
  loading = false,
  currentPage,
  setCurrentPage,
  totalPages,
  pageSize,
  setPageSize,
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
  rows = 5,
}) => {
  // const [searchTerm, setSearchTerm] = useState("");
  console.log(data);
  return (
    <div className="py-4 text-xs text-center laptop:text-sm desktop:text-sm _4k:text-base">
      {/* Search Bar & Row Selector */}
      <div className="flex justify-between items-start gap-1">
        <div className="w-full">
          {!hideSearchBar && (
            <div className="flex gap-2 justify-start items-center mb-4 border border-border-grey px-4 py-2 drop-shadow-sm p-2 rounded laptop-sm:w-1/3 outline-none">
              <CiSearch size={20} className="text-[#262626]" />
              <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>
          )}
        </div>
        {hidePageSize && (
          <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
        )}
      </div>
      {/* Table */}
      <div className="w-full">
        {loading ? (
          <TableSkeleton rows={rows} columns={columns.length} />
        ) : (
          <>
            <table className="hidden laptop:table w-full border border-light-grey">
              <thead className="border border-light-grey">
                <tr className="bg-secondary text-white">
                  {columns?.map((col, index) => (
                    <th
                      key={index}
                      className={`p-2 text-xs desktop:text-sm _4k:text-base font-normal ${
                        index == 0 && "text-left"
                      } `}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 ? (
                  data.map((row, index) => (
                    <tr key={index}>
                      {columns.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          className={`border-b border-light-grey text-[10px] tablet:text-xs desktop:text-sm _4k:text-base border-border-grey p-2 py-4  ${
                            colIndex === 0 && " text-left"
                          }`}
                        >
                          {col.renderCell
                            ? col.renderCell(row)
                            : col.accessor === "userCount"
                            ? row[col.accessor]?.length ?? "--"
                            : row[col.accessor] ?? "--"}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns?.length} className="text-center p-4">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="block laptop:hidden">
              {data?.length > 0 ? (
                data.map((appointment, index) => (
                  <div
                    key={index}
                    className="p-2 rounded-lg border border-light-grey shadow-sm mb-2"
                  >
                    <div className="text-xs text-[#0D0D0D] grid grid-cols-2 gap-1 items-stretch">
                      {columns.map((col, colIndex) => (
                        <div
                          className="flex flex-col items-start space-y-1"
                          key={colIndex}
                        >
                          <p className="font-bold">{col.label}</p>
                          <div className="text-start">
                            {col.renderCell
                              ? col.renderCell(appointment)
                              : col.accessor === "userCount"
                              ? appointment[col.accessor]?.length ?? "--"
                              : appointment[col.accessor] ?? "--"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-sm w-full border !text-light-grey border-light-grey rounded-md">
                  No data found
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="py-2 border border-gray-100 text-black cursor-pointer rounded-l-4xl flex items-center gap-1 disabled:hidden"
            aria-label="Previous Page"
          >
            <MdKeyboardDoubleArrowLeft size={14} />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="py-2 border border-gray-100 text-black cursor-pointer rounded-l-4xl flex items-center gap-1 disabled:hidden"
            aria-label="Previous Page"
          >
            <MdKeyboardArrowLeft size={14} />
          </button>

          <div className="flex items-center">
            {(() => {
              const maxVisiblePages = 3;
              const pages = [];
              let startPage = Math.max(
                1,
                currentPage - Math.floor(maxVisiblePages / 2)
              );
              let endPage = startPage + maxVisiblePages - 1;

              if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
              }

              if (startPage > 1) {
                pages.push(
                  <button
                    key={1}
                    onClick={() => setCurrentPage(1)}
                    className={`mx-1 px-3 py-1 border border-gray-100 cursor-pointer rounded-lg ${
                      currentPage === 1
                        ? "bg-primary text-white font-bold shadow"
                        : "text-black"
                    }`}
                    aria-label="Page 1"
                  >
                    1
                  </button>
                );
                if (startPage > 2) {
                  pages.push(
                    <span key="start-ellipsis" className="mx-1 text-gray-400">
                      ...
                    </span>
                  );
                }
              }

              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`mx-1 px-3 py-1 border border-gray-100 cursor-pointer rounded-lg ${
                      currentPage === i
                        ? "bg-primary text-white font-bold shadow"
                        : "text-black"
                    }`}
                    aria-label={`Page ${i}`}
                  >
                    {i}
                  </button>
                );
              }

              if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                  pages.push(
                    <span key="end-ellipsis" className="mx-1 text-gray-400">
                      ...
                    </span>
                  );
                }
                pages.push(
                  <button
                    key={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className={`mx-1 px-3 py-1 border border-gray-100 cursor-pointer rounded-lg ${
                      currentPage === totalPages
                        ? "bg-primary text-white font-bold shadow"
                        : "text-black"
                    }`}
                    aria-label={`Page ${totalPages}`}
                  >
                    {totalPages}
                  </button>
                );
              }

              return pages;
            })()}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="py-2 border border-gray-100 text-black cursor-pointer rounded-r-4xl disabled:hidden flex items-center gap-1"
            aria-label="Next Page"
          >
            <MdKeyboardArrowRight size={14} />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="py-2 border border-gray-100 text-black cursor-pointer rounded-l-4xl disabled:hidden flex items-center gap-1"
            aria-label="Previous Page"
          >
            <MdKeyboardDoubleArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;

const PageSizeSelector = ({ pageSize, setPageSize }) => (
  <select
    value={pageSize}
    onChange={(e) => setPageSize(Number(e.target.value))}
    className="border border-border-grey px-4 py-2 drop-shadow-sm p-2 rounded outline-none"
  >
    {[5, 10, 20, 50].map((num) => (
      <option key={num} value={num}>
        {num} Rows
      </option>
    ))}
  </select>
);
