import { useAppContext } from "../../../context/AppContext";
import { DynamicTable } from "../../common";
import WhiteContainer from "../../common/WhiteContainer";

const CampusTable = () => {
  const { campuses, fetchingCampuses } = useAppContext();

  // Table columns
  const columns = [
    {
      label: "Campus Name",
      accessor: "name",
    },
    {
      label: "Address",
      accessor: "address",
    },
    {
      label: "Contact",
      accessor: "contact",
    },
  ];

  return (
    <WhiteContainer>
      <DynamicTable
        hideSearchBar={true}
        columns={columns}
        data={campuses?.map((campus) => ({
          id: campus?._id,
          name: campus?.name || "--",
          address: campus?.address || "--",
          contact: campus?.contact || "--",
        }))}
        loading={fetchingCampuses}
      />
    </WhiteContainer>
  );
};

export default CampusTable;
