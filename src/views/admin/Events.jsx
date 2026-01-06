import { CommonButton } from "../../components";
import DynamicViewTitle from "../../components/common/DynamicViewTitle";
import Modal from "../../components/common/Modal";
import { useState } from "react";
import AddEventForm from "../../components/admin/Event/AddEventForm";
import EventsTable from "../../components/admin/Event/EventsTable";

const Events = () => {
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
        title={"Events Management"}
        description={"View All Details Events "}
      >
        <div className="flex justify-end">
          <CommonButton onClick={() => openModal()} variant="primary" size="md">
            Add Event
          </CommonButton>
        </div>
      </DynamicViewTitle>

      <EventsTable />

      {isOpen && (
        <Modal width="700px" onClose={closeModal} heading="Add Event">
          <AddEventForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default Events;
