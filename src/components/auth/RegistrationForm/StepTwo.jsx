import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { useParticipant } from "../../../context/ParticipantContext";
import apis from "../../../config/api";

const StepTwo = () => {
  const { setFieldValue } = useFormikContext();
  const { participantData, selectedGames, setSelectedGames } = useParticipant();
  const [availableGames, setAvailableGames] = useState([]);

  useEffect(() => {
    if (participantData.gender && participantData.ageGroup) {
      apis
        .getGamesByCriteria(participantData.gender, participantData.ageGroup)
        .then((res) => setAvailableGames(res.data))
        .catch((err) => console.error(err));
    }
  }, [participantData.gender, participantData.ageGroup]);

  const handleSelectGame = (game) => {
    let updated = [...selectedGames];
    if (updated.some((g) => g.gameId === game._id)) {
      updated = updated.filter((g) => g.gameId !== game._id);
    } else {
      updated.push({ gameId: game._id, gameName: game.gameName, token: game.token });
    }
    setSelectedGames(updated);
    setFieldValue("selectedGames", updated);
  };

  return (
    <div>
      <h2 className="font-bold mb-4">Select Games</h2>
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
        {availableGames.map((game) => (
          <div
            key={game._id}
            className={`p-4 border rounded cursor-pointer ${
              selectedGames.some((g) => g.gameId === game._id)
                ? "bg-green-100 border-green-500"
                : "bg-white"
            }`}
            onClick={() => handleSelectGame(game)}
          >
            {game.gameName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepTwo;
