import React from "react";
import { Wrapper } from "../common";

const NoAdmission = ({ type = "course" }) => {
  // 🧠 Dynamic text based on type
  const isCourse = type === "course";
  const headingText = isCourse
    ? "❌ No Admissions Available"
    : "❌ No Events Available";
  const description = isCourse
    ? "Currently, there are no active admissions. Please visit again later or follow our social media pages for the latest course updates and announcements."
    : "Currently, there are no active events. Please visit again later or follow our social media pages for upcoming events and activities.";

  return (
    <Wrapper className="py-20 text-center">
      <h2 className="text-4xl font-bold text-red-500 mb-4">{headingText}</h2>
      <p className="text-gray-600 max-w-xl mx-auto">{description}</p>
    </Wrapper>
  );
};

export default NoAdmission;
