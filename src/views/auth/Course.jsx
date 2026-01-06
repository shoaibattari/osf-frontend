import React from "react";
import { useAppContext } from "../../context/AppContext";
import { ComingSoon, CourseForm, NoAdmission } from "../../components";

const Course = () => {
  const { courses } = useAppContext();

  // 🧠 Group courses by status
  const admissionOpen =
    courses?.filter((c) => c.status === "Admission Open") || [];
  const comingSoon = courses?.filter((c) => c.status === "Coming Soon") || [];
  // const admissionClosed =
  //   courses?.filter((c) => c.status === "Admission Closed") || [];

  return (
    <div className="space-y-10">
      {/* 🟢 Admission Open */}
      {admissionOpen.length > 0 ? (
        <CourseForm />
      ) : comingSoon.length > 0 ? (
        <ComingSoon items={comingSoon} type="course" />
      ) : (
        <NoAdmission type="course" />
      )}
    </div>
  );
};

export default Course;
