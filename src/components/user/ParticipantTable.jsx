import { useState, useEffect, useRef } from "react";
import WhiteContainer from "../common/WhiteContainer";
import { DynamicTable } from "../common";
import { useParticipant } from "../../context/ParticipantContext";

const ParticipantsTable = () => {
  const {
    participants,
    fetchAllParticipants,
    fetchingParticipants,
    pagination,
  } = useParticipant();
  console.log(participants);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  /* -----------------------------
     Debounced Search
  ----------------------------- */
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setCurrentPage(1);
      fetchAllParticipants({
        search: searchTerm,
        page: 1,
        limit: pageSize,
      });
    }, 500);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm, pageSize]);

  /* -----------------------------
     Pagination Change
  ----------------------------- */
  useEffect(() => {
    fetchAllParticipants({
      search: searchTerm,
      page: currentPage,
      limit: pageSize,
    });
  }, [currentPage, pageSize]);

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
        row.games?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {row.games.map((game, index) => (
              <span
                key={index}
                className={`px-3 py-1 text-xs font-medium rounded-full bg-primary/80 text-white `}
              >
                {game}
              </span>
            ))}
          </div>
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
              : "bg-red-700 text-red-100"
          }`}
        >
          {row.paymentStatus}
        </span>
      ),
    },
  ];

  /* -----------------------------
     API → Table Mapping
  ----------------------------- */
  const data = participants?.map((p) => ({
    participantId: p.participantId || "--",
    name: p.name || "--",
    fatherName: p.fatherName || "--",
    cnic: p.cnic || "--",
    whatsapp: p.whatsapp || "--",
    gender: p.gender || "--",
    ageGroup: p.ageGroup || "--",
    kitSize: p.kitSize || "--",
    khundi: p.khundi || "--",
    location: p.location || "--",

    games:
      p.gamesSelected?.length > 0
        ? p.gamesSelected.map((g) => g.gameName)
        : "--",

    paymentStatus: p.paymentStatus || "pending",
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
