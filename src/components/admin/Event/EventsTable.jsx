import { useAppContext } from "../../../context/AppContext";
import { DynamicTable } from "../../common";
import WhiteContainer from "../../common/WhiteContainer";

const EventsTable = () => {
  const { events, fetchingEvents } = useAppContext();

  const getStatusColor = (status) => {
    switch (status) {
      case "Registration Closed":
        return "bg-red-500 text-red-50";
      case "Registration Open":
        return "bg-green-500 text-green-50";
      case "Coming Soon":
        return "bg-orange-500 text-orange-50";

      default:
        return "bg-gray-200 text-gray-400";
    }
  };
  // ✅ Table columns
  const columns = [
    { label: "Event Name", accessor: "name" },
    {
      label: "Event Description",
      accessor: "description",
      renderCell: (row) => {
        return (
          <p className={`px-2 py-1 max-w-48 rounded laptop-sm:text-center `}>
            {row?.description || "-"}
          </p>
        );
      },
    },
    { label: "Date", accessor: "date" },
    { label: "Duration", accessor: "duration" },
    { label: "Venue", accessor: "venue" },
    { label: "Gender", accessor: "gender" },
    {
      label: "Category",
      accessor: "category",
      renderCell: (row) => {
        return (
          <div className="flex flex-col items-start laptop-sm:items-center gap-0.5">
            {row?.category?.map((cat, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded text-center text-nowrap `}
              >
                {cat || "-"}
              </span>
            ))}
          </div>
        );
      },
    },

    {
      label: "Status",
      accessor: "status",
      renderCell: (row) => {
        return (
          <div className="flex flex-col items-start gap-2">
            <span
              className={`px-2 py-1 rounded text-nowrap ${getStatusColor(
                row.status
              )}`}
            >
              {row.status}
            </span>
          </div>
        );
      },
    },
    { label: "Fees", accessor: "fees" },
  ];

  return (
    <WhiteContainer>
      <DynamicTable
        hideSearchBar={false}
        columns={columns}
        data={events}
        loading={fetchingEvents}
      />
    </WhiteContainer>
  );
};

export default EventsTable;
