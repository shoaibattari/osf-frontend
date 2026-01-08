import React from "react";
import { DynamicViewTitle } from "../common";
import ParticipantsTable from "./ParticipantTable";

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
