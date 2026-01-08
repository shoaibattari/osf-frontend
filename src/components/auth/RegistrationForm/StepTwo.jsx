import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { useParticipant } from "../../../context/ParticipantContext";
import apis from "../../../config/api";

const MAX_TOKENS = 2;

const StepTwo = () => {
  const { setFieldValue } = useFormikContext();
  const { participantData, selectedGames, setSelectedGames } = useParticipant();

  const [availableGames, setAvailableGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (participantData.gender && participantData.ageGroup) {
      setLoading(true);
      apis
        .getGamesByCriteria(participantData.gender, participantData.ageGroup)
        .then((res) => setAvailableGames(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [participantData.gender, participantData.ageGroup]);

  // 🔢 Total tokens already selected
  const totalSelectedTokens = selectedGames.reduce(
    (sum, g) => sum + g.token,
    0
  );

  // 👤 Gender-based slots
  const getSlotsByGender = (game) => {
    if (participantData.gender === "male") return game.maleCount;
    if (participantData.gender === "female") return game.femaleCount;
    return 0;
  };

  // 🚫 Determine if a game should be disabled
  const isGameDisabled = (game) => {
    const isSelected = selectedGames.some((g) => g.gameId === game._id);

    // Slot full
    if (getSlotsByGender(game) <= 0) return true;

    // Already selected → allow unselect
    if (isSelected) return false;

    // If selecting this game exceeds MAX_TOKENS → disable
    if (totalSelectedTokens + game.token > MAX_TOKENS) return true;

    return false; // otherwise selectable
  };

  const handleSelectGame = (game) => {
    let updated = [...selectedGames];
    const alreadySelected = updated.some((g) => g.gameId === game._id);

    if (alreadySelected) {
      // Unselect game
      updated = updated.filter((g) => g.gameId !== game._id);
    } else {
      // Add game
      updated.push({
        gameId: game._id,
        gameName: game.gameName,
        token: game.token,
      });
    }

    setSelectedGames(updated);
    setFieldValue("selectedGames", updated);
  };

  return (
    <div>
      <h2 className="font-bold mb-4">
        Select Games (Tokens Used: {totalSelectedTokens}/{MAX_TOKENS})
      </h2>

      {loading && <p className="text-gray-500">Loading available games...</p>}

      {!loading && availableGames.length === 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-300 rounded text-yellow-800">
          🙏 <strong>Thank you for your interest!</strong>
          <br />
          Unfortunately, all game slots for this age criteria are currently
          <strong> full</strong>.
        </div>
      )}

      {availableGames.length > 0 && (
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
          {availableGames.map((game) => {
            const isSelected = selectedGames.some((g) => g.gameId === game._id);
            const disabled = isGameDisabled(game);

            return (
              <div
                key={game._id}
                onClick={() => !disabled && handleSelectGame(game)}
                className={`border rounded-lg p-4 transition ${
                  disabled
                    ? "bg-gray-100 opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:shadow"
                } ${
                  isSelected
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 bg-white"
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{game.gameName}</h3>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    disabled={disabled}
                    className="w-5 h-5 accent-green-600"
                  />
                </div>

                {/* Details */}
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Age Group:</strong> {game.ageGroup}
                  </p>

                  {participantData.gender === "male" && (
                    <p>
                      <strong>Male Slots:</strong> {game.maleCount}
                    </p>
                  )}

                  {participantData.gender === "female" && (
                    <p>
                      <strong>Female Slots:</strong> {game.femaleCount}
                    </p>
                  )}

                  <p>
                    <strong>Token Required:</strong> {game.token}
                  </p>

                  {disabled && !isSelected && (
                    <p className="text-xs text-red-500">Not selectable</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StepTwo;
