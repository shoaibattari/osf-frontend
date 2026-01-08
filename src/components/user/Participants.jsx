import React, { useEffect } from "react";
import { DynamicViewTitle } from "../common";
import ParticipantsTable from "./ParticipantTable";
import { useParticipant } from "../../context/ParticipantContext";

const Participants = () => {
  const { stats, fetchStats, fetchingStats } = useParticipant();
  console.log(stats);

  // Fetch stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="w-full space-y-6">
      <DynamicViewTitle
        title={"Participants Management"}
        description={"View all details according to event participants."}
        className={"flex flex-col justify-center items-center"}
      >
        {/* Highlight Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4">
          {/* Total Registrations */}
          <div className="bg-blue-50 col-span-2 laptop-sm:col-span-1 rounded-xl  p-2 laptop-sm:p-4 shadow-md flex flex-col items-center justify-center">
            <h3 className="text-sm font-bold text-gray-500 uppercase">
              Total Participants
            </h3>
            <span className="text-3xl font-extrabold text-blue-700 mt-2">
              {fetchingStats ? "..." : stats.total}
            </span>
          </div>

          {/* Age Group Counts */}
          {stats.ageGroups &&
            Object.entries(stats.ageGroups).map(([ageGroup, count]) => (
              <div
                key={ageGroup}
                className="bg-green-50 rounded-xl p-2 laptop-sm:p-4 shadow-md flex flex-col items-center justify-center"
              >
                <h3 className="text-sm font-bold text-gray-500 uppercase">
                  Age {ageGroup}
                </h3>
                <span className="text-2xl font-extrabold text-green-700 mt-2">
                  {fetchingStats ? "..." : count}
                </span>
              </div>
            ))}
        </div>
      </DynamicViewTitle>

      <ParticipantsTable />
    </div>
  );
};

export default Participants;
