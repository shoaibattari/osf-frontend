import { useState, useEffect, useRef } from "react";
import WhiteContainer from "../common/WhiteContainer";
import { DynamicTable } from "../common";
import { useParticipant } from "../../context/ParticipantContext";
import { FaCheck, FaEye, FaTimes } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apis from "../../config/api";
import { FaFileExcel } from "react-icons/fa";
import { baseUrl } from "../../constants";

const ParticipantsTable = () => {
  const {
    participants,
    fetchAllParticipants,
    fetchingParticipants,
    pagination,
  } = useParticipant();

  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all"); // NEW: filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const debounceTimeout = useRef(null);

  /* -----------------------------
     Debounced Search + Filter
  ----------------------------- */
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setCurrentPage(1);
      fetchAllParticipants({
        search: searchTerm,
        page: 1,
        limit: pageSize,
        paymentStatus: paymentFilter !== "all" ? paymentFilter : undefined, // send filter
      });
    }, 500);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm, pageSize, paymentFilter]);

  /* -----------------------------
     Pagination Change
  ----------------------------- */
  useEffect(() => {
    fetchAllParticipants({
      search: searchTerm,
      page: currentPage,
      limit: pageSize,
      paymentStatus: paymentFilter !== "all" ? paymentFilter : undefined, // send filter
    });
  }, [currentPage, pageSize, paymentFilter]);

  /* -----------------------------
     Direct Mutation for Payment
  ----------------------------- */
  const { mutate: updatePaymentStatus, isLoading: updating } = useMutation({
    mutationFn: ({ id, paymentStatus }) =>
      apis.updatePaymentStatus(id, paymentStatus),
    onSuccess: (_, variables) => {
      toast.success(`Payment marked as "${variables.paymentStatus}"`);
      fetchAllParticipants({
        search: searchTerm,
        page: currentPage,
        limit: pageSize,
        paymentStatus: paymentFilter !== "all" ? paymentFilter : undefined,
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Payment update failed");
    },
  });

  /* -----------------------------
     Table Columns
  ----------------------------- */
  const columns = [
    { label: "Participant ID", accessor: "participantId" },
    { label: "Name", accessor: "name" },
    { label: "Father Name", accessor: "fatherName" },
    { label: "CNIC", accessor: "cnic" },
    { label: "WhatsApp", accessor: "whatsapp" },
    { label: "Gender", accessor: "gender" },
    { label: "Age Group", accessor: "ageGroup" },
    { label: "Kit Size", accessor: "kitSize" },
    { label: "Khundi", accessor: "khundi" },
    { label: "Location", accessor: "location" },
    {
      label: "Games",
      accessor: "games",
      renderCell: (row) =>
        row.gamesSelected?.length > 0 ? (
          <div className="flex flex-col laptop-sm:flex-row justify-center laptop-sm:items-center flex-wrap gap-2">
            {row.gamesSelected.map((game, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/80 text-white"
              >
                {game?.gameName}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-400 text-sm">--</span>
        ),
    },
    {
      label: "Payment Screenshot",
      accessor: "paymentScreenshot",
      renderCell: (row) =>
        row.paymentScreenshot?.url ? (
          <button
            onClick={() => window.open(row.paymentScreenshot.url, "_blank")}
            className="flex items-center gap-1 px-2 py-1 bg-green-600 cursor-pointer text-white text-xs rounded hover:bg-green-700"
          >
            <FaEye size={12} /> View
          </button>
        ) : (
          <span className="text-gray-400 text-sm">--</span>
        ),
    },
    {
      label: "Payment Status",
      accessor: "paymentStatus",
      renderCell: (row) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            row.paymentStatus === "paid"
              ? "bg-green-700 text-green-100"
              : row.paymentStatus === "rejected"
              ? "bg-red-700 text-red-100"
              : "bg-yellow-600 text-yellow-100"
          }`}
        >
          {row.paymentStatus}
        </span>
      ),
    },
    {
      label: "Action",
      accessor: "action",
      renderCell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() =>
              updatePaymentStatus({ id: row.id, paymentStatus: "paid" })
            }
            className="p-2 rounded bg-green-600 hover:bg-green-700 text-white"
            title="Mark as Paid"
            disabled={updating || row.paymentStatus === "paid"}
          >
            <FaCheck size={12} />
          </button>

          <button
            onClick={() =>
              updatePaymentStatus({ id: row.id, paymentStatus: "rejected" })
            }
            className="p-2 rounded bg-red-600 hover:bg-red-700 text-white"
            title="Reject Payment"
            disabled={updating || row.paymentStatus === "rejected"}
          >
            <FaTimes size={12} />
          </button>
        </div>
      ),
    },
  ];

  const downloadExcel = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/register/export-excel?paymentStatus=${paymentFilter}&search=${searchTerm}`,
        { method: "GET" }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `participants.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WhiteContainer>
      <div className="flex justify-end  items-center gap-2">
        {/* -----------------------------
         Payment Status Filter Dropdown and excel export
      ----------------------------- */}

        <div className="flex justify-end items-center gap-2">
          <button
            onClick={downloadExcel}
            className="flex items-center gap-1 px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800"
          >
            <FaFileExcel size={14} /> Export Excel
          </button>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="border border-gray-500 rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      <DynamicTable
        hideSearchBar={false}
        hidePageSize={true}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        columns={columns}
        data={participants}
        loading={fetchingParticipants || updating}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={pagination?.totalPages || 1}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </WhiteContainer>
  );
};

export default ParticipantsTable;
