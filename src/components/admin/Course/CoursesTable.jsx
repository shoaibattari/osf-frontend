import { useAppContext } from "../../../context/AppContext";
import { DynamicTable } from "../../common";
import WhiteContainer from "../../common/WhiteContainer";

const CoursesTable = () => {
  const { courses, fetchingCourses } = useAppContext();
  const getStatusColor = (status) => {
 
    switch (status) {
      case "Admission Closed":
        return "bg-red-500 text-red-50";
      case "Admission Open":
        return "bg-green-500 text-green-50";
      case "Coming Soon":
        return "bg-orange-500 text-orange-50";

      default:
        return "bg-gray-200 text-gray-400";
    }
  };
  // ✅ Table columns
  const columns = [
    { label: "Course Name", accessor: "name" },
    { label: "Duration", accessor: "duration" },
    { label: "Gender", accessor: "gender" },
    { label: "Batch", accessor: "batch" },
    {
      label: "Section",
      accessor: "section",
      renderCell: (row) => {
        const sections = Array.isArray(row?.section)
          ? row.section
          : row?.section
          ? [row.section]
          : [];

        return (
          <div className="flex flex-col items-center gap-0.5">
            {sections.length === 0
              ? "-"
              : sections.map((sec, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded text-center text-nowrap"
                  >
                    {sec || "-"}
                  </span>
                ))}
          </div>
        );
      },
    },
    { label: "Campus", accessor: "campusName" },
    { label: "Fees", accessor: "fees" },
    {
      label: "Categories",
      accessor: "category",
      renderCell: (row) => {
        const categories = Array.isArray(row?.category)
          ? row.category
          : row?.category
          ? [row.category]
          : [];

        return (
          <div className="flex flex-col items-center gap-0.5">
            {categories.length === 0
              ? "-"
              : categories.map((cat, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded text-center text-nowrap bg-gray-100 text-gray-700"
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
      renderCell: (row) => (
        <div className="flex flex-col items-start gap-2">
          <span
            className={`px-2 py-1 rounded text-nowrap ${getStatusColor(
              row.status
            )}`}
          >
            {row.status}
          </span>
        </div>
      ),
    },
  ];

  return (
    <WhiteContainer>
      <DynamicTable
        hideSearchBar={false}
        columns={columns}
        data={courses?.map((course) => ({
          id: course?._id,
          name: course?.name || "--",
          duration: course?.duration || "--",
          gender: course?.gender || "--",
          section: course?.section || "--",
          fees: course?.fees || "--",
          batch: course?.batch || "--",
          campusName:
            course?.courseCampus?.name || course?.courseCampusName || "--",
          category: course?.category || "--",
          status: course?.status || "--",
        }))}
        loading={fetchingCourses}
      />
    </WhiteContainer>
  );
};

export default CoursesTable;
