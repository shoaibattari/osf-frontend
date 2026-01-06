import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "../../../context/AppContext";
import { DynamicTable } from "../../common";
import WhiteContainer from "../../common/WhiteContainer";
import apis from "../../../config/api";
import { toast } from "react-toastify";

const ParticipantsTable = () => {
  const {
    participants,
    fetchAllParticipants,
    fetchingParticipants,
    pagination,
  } = useAppContext();
  console.log(pagination, "pagination");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // -----------------------------
  // Manual debounce for search
  // -----------------------------
  const debounceTimeout = useRef(null);
  // Whenever searchTerm changes → reset page to 1 and fetch
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setCurrentPage(1); // reset page to 1
      fetchAllParticipants({
        search: searchTerm,
        page: 1,
        limit: pageSize,
      });
    }, 500);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm, pageSize]);

  // Whenever page changes → fetch the selected page
  useEffect(() => {
    fetchAllParticipants({
      search: searchTerm,
      page: currentPage,
      limit: pageSize,
    });
  }, [currentPage, pageSize]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Un-paid":
        return "bg-red-500 text-red-50";
      case "Paid":
        return "bg-green-500 text-green-50";
      default:
        return "bg-gray-200 text-gray-400";
    }
  };

  const { mutate: markAttendance, isPending: updatingAttendance } = useMutation(
    {
      mutationFn: ({ participantId, isAttend }) =>
        apis.markParticipantAttendance(participantId, { isAttend }),
      onSuccess: () =>
        fetchAllParticipants({
          search: searchTerm,
          page: currentPage,
          limit: pageSize,
        }),
      onError: (error) =>
        toast.error(error?.message || "Failed to update attendance"),
    }
  );

  const { mutate: markPaid, isPending: markingPaid } = useMutation({
    mutationFn: ({ participantId, isPaid }) =>
      apis.markParticipantPaid(participantId, { isPaid }),
    onSuccess: () =>
      fetchAllParticipants({
        search: searchTerm,
        page: currentPage,
        limit: pageSize,
      }),
    onError: (error) =>
      toast.error(error?.message || "Failed to mark participant as Paid"),
  });

  const columns = [
    { label: "ID", accessor: "participantId" },
    { label: "Event Name", accessor: "eventName" },
    { label: "Category", accessor: "category" },
    { label: "Full Name", accessor: "fullName" },
    { label: "Father Name", accessor: "fatherName" },
    { label: "Gender", accessor: "gender" },
    { label: "Address", accessor: "address" },
    { label: "Contact", accessor: "contact" },
    { label: "Email", accessor: "email" },
    { label: "Community", accessor: "community" },
    { label: "Cast", accessor: "cast" },
    { label: "CNIC", accessor: "cnic" },
    { label: "Event Date", accessor: "eventDate" },
    { label: "Venue", accessor: "venue" },
    {
      label: "Status",
      accessor: "status",
      renderCell: (row) => (
        <button
          onClick={() =>
            markPaid({ participantId: row.id, isPaid: row.status !== "Paid" })
          }
          disabled={markingPaid}
          className={`px-2 py-1 text-sm rounded ${getStatusColor(row.status)}`}
        >
          {row.status === "Paid"
            ? "Paid"
            : markingPaid
            ? "Updating..."
            : "Mark as Paid"}
        </button>
      ),
    },
    {
      label: "Attendance",
      accessor: "isAttend",
      renderCell: (row) => (
        <button
          onClick={() =>
            markAttendance({ participantId: row.id, isAttend: !row.isAttend })
          }
          disabled={updatingAttendance}
          className={`px-2 py-1 text-sm rounded ${
            row.isAttend ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {row.isAttend ? "Present" : "Absent"}
        </button>
      ),
    },
  ];

  // Transform participant data
  const data = participants?.map((p) => ({
    id: p._id,
    participantId: p.participantId || "--",
    fullName: p.fullName || "--",
    fatherName: p.fatherName || "--",
    gender: p.gender || "--",
    address: p.address || "--",
    contact: p.contact || "--",
    email: p.email || "--",
    community: p.community || "--",
    cast: p.cast || "--",
    cnic: p.cnic || "--",
    category: p.category || "--",
    eventName: p.event?.name || "--",
    eventDate: p.event?.date
      ? new Date(p.event.date).toLocaleDateString()
      : "--",
    venue: p.event?.venue || "--",
    status: p.isPaid ? "Paid" : "Un-paid",
    isAttend: p.isAttend || false,
  }));

  return (
    <WhiteContainer>
      <DynamicTable
        hideSearchBar={false}
        hidePageSize={true}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        columns={columns}
        data={data}
        loading={fetchingParticipants}
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
