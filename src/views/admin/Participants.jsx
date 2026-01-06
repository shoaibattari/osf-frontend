import { DynamicViewTitle } from "../../components";
import ParticipantsTable from "../../components/admin/Participants/ParticipantsTable";

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
