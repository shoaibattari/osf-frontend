import React from "react";
import ParticipantsTable from "../admin/Participants/ParticipantsTable";
import { DynamicViewTitle } from "../common";

const Participants = () => {
  return (
    <div className="w-full">
      <DynamicViewTitle
        title={"Participants Management"}
        description={"View All Details According Events Participants "}
      />
      <ParticipantsTable />
    </div>
  );
};

export default Participants;
