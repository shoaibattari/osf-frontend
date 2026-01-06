import { CommonButton } from "../../components";
import DynamicViewTitle from "../../components/common/DynamicViewTitle";
import Modal from "../../components/common/Modal";
import { useState } from "react";
import AddCourseForm from "../../components/admin/Course/AddCourseForm";
import CoursesTable from "../../components/admin/Course/CoursesTable";

const Course = () => {
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
        title={"Course Management"}
        description={"View All Details Courses "}
      >
        <div className="flex justify-end">
          <CommonButton onClick={() => openModal()} variant="primary" size="md">
            Add Course
          </CommonButton>
        </div>
      </DynamicViewTitle>

      <CoursesTable />

      {isOpen && (
        <Modal width="800px" onClose={closeModal} heading="Add Course">
          <AddCourseForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default Course;
