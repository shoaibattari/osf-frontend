import React, { useEffect } from "react";
import { DynamicViewTitle } from "../common";
import ParticipantsTable from "./ParticipantTable";
import { useParticipant } from "../../context/ParticipantContext";
import { FaUsers, FaMale, FaFemale } from "react-icons/fa";

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
          {/* Total Participants */}
          <div className="bg-blue-50 col-span-2 laptop-sm:col-span-1 rounded-xl p-3 laptop-sm:p-4 shadow-md flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-bold uppercase">
              <FaUsers />
              Total Participants
            </div>

            <span className="text-3xl font-extrabold text-blue-700 mt-2">
              {fetchingStats ? "..." : stats?.total?.all ?? 0}
            </span>

            <div className="flex gap-4 text-xs text-gray-600 mt-2">
              <div className="flex items-center gap-1">
                <FaMale className="text-blue-600 text-3xl" />
                {fetchingStats ? "..." : stats?.total?.male ?? 0}
              </div>

              <div className="flex items-center gap-1">
                <FaFemale className="text-pink-600 text-3xl" />
                {fetchingStats ? "..." : stats?.total?.female ?? 0}
              </div>
            </div>
          </div>

          {/* Age Group Cards */}
          {stats?.ageGroups &&
            Object.entries(stats.ageGroups).map(([ageGroup, count]) => (
              <div
                key={ageGroup}
                className="bg-green-50 rounded-xl p-3 laptop-sm:p-4 shadow-md flex flex-col items-center justify-center"
              >
                <h3 className="text-sm font-bold text-gray-500 uppercase">
                  Age {ageGroup}
                </h3>

                <span className="text-2xl font-extrabold text-green-700 mt-2">
                  {fetchingStats ? "..." : count.total}
                </span>

                <div className="flex gap-4 text-xs text-gray-600 mt-2">
                  <div className="flex items-center gap-1">
                    <FaMale className="text-blue-600 text-3xl" />
                    {fetchingStats ? "..." : count.male}
                  </div>

                  <div className="flex items-center gap-1">
                    <FaFemale className="text-pink-600 text-3xl" />
                    {fetchingStats ? "..." : count.female}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </DynamicViewTitle>

      <ParticipantsTable />
    </div>
  );
};

export default Participants;
