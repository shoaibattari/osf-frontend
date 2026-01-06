import React from "react";
import { Wrapper } from "../common";

const ComingSoon = ({ items = [], type = "course" }) => {
  // 🧠 Dynamic text based on type
  const isCourse = type === "course";
  const headingText = isCourse
    ? "🚀 Admissions Coming Soon!"
    : "🎉 Registrations Coming Soon!";
  const description = isCourse
    ? "Stay tuned! New batches will be announced soon. Below are the upcoming courses you can look forward to 👇"
    : "Stay tuned! Upcoming events will be announced soon. Below are the exciting events you can look forward to 👇";
  const emptyText = isCourse
    ? "Campus info coming soon"
    : "Event details coming soon";

  return (
    <Wrapper className="py-16 text-center">
      <h2 className="text-4xl font-bold text-primary mb-4">{headingText}</h2>
      <p className="text-gray-600 mb-8">{description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500">
              {isCourse
                ? item.courseCampus?.name || emptyText
                : item.location || emptyText}
            </p>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-400 mt-10">
        Keep checking this page for updates!
      </p>
    </Wrapper>
  );
};

export default ComingSoon;
