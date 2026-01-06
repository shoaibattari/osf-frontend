import React from "react";
import { useAppContext } from "../../context/AppContext";
import { ComingSoon, EventForm, NoAdmission } from "../../components";

const Event = () => {
  const { events } = useAppContext();

  // 🧠 Group events by status
  const registrationOpen =
    events?.filter((e) => e.status === "Registration Open") || [];
  const comingSoon = events?.filter((e) => e.status === "Coming Soon") || [];
  const registrationClosed =
    events?.filter((e) => e.status === "Registration Closed") || [];

  return (
    <div className="space-y-10">
      {/* 🟢 Registration Open */}
      {registrationOpen.length > 0 ? (
        <EventForm />
      ) : comingSoon.length > 0 ? (
        <ComingSoon items={comingSoon} type="event" />
      ) : (
        <NoAdmission type="event" />
      )}
    </div>
  );
};

export default Event;
