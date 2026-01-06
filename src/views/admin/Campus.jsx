import { CommonButton } from "../../components";
import DynamicViewTitle from "../../components/common/DynamicViewTitle";
import Modal from "../../components/common/Modal";
import AddCampusForm from "../../components/admin/Campus/AddCampusForm";
import { useState } from "react";
import CampusTable from "../../components/admin/Campus/CampusTable";

const Campus = () => {
  const [isOpen, open] = useState(false);

  const openModal = () => {
    open(true);
  };

  const closeModal = () => {
    open(false);
  };

  return (
    <div className="w-full">
      <DynamicViewTitle
        title={"Campus Management"}
        description={"View All Details Campus "}
      >
        <div className="flex justify-end">
          <CommonButton onClick={() => openModal()} variant="primary" size="md">
            Add Campus
          </CommonButton>
        </div>
      </DynamicViewTitle>

      <CampusTable />

      {isOpen && (
        <Modal onClose={closeModal} heading="Add Campus">
          <AddCampusForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default Campus;
