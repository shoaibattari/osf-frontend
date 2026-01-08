import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { useParticipant } from "../../../context/ParticipantContext";
import apis from "../../../config/api";
import { Logo } from "../../common";

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

  const totalSelectedTokens = selectedGames.reduce(
    (sum, g) => sum + g.token,
    0
  );

  const getSlotsByGender = (game) => {
    if (participantData.gender === "male") return game.maleCount;
    if (participantData.gender === "female") return game.femaleCount;
    return 0;
  };

  const isGameDisabled = (game) => {
    const isSelected = selectedGames.some((g) => g.gameId === game._id);
    if (getSlotsByGender(game) <= 0) return true;
    if (isSelected) return false;
    if (totalSelectedTokens + game.token > MAX_TOKENS) return true;
    return false;
  };

  const handleSelectGame = (game) => {
    let updated = [...selectedGames];
    const alreadySelected = updated.some((g) => g.gameId === game._id);

    if (alreadySelected) {
      updated = updated.filter((g) => g.gameId !== game._id);
    } else {
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
    <div className="space-y-6">
      {/* Token Tracker Header */}
      <div className="bg-[#002D62] text-white p-5 rounded-2xl shadow-xl flex justify-between items-center border-b-4 border-[#F57C00]">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tighter italic">
            Select Your Games
          </h2>
          <p className="text-xs opacity-70">
            Maximum {MAX_TOKENS} tokens allowed
          </p>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-xl text-center border border-white/20">
          <span className="text-2xl font-black text-[#F57C00]">
            {totalSelectedTokens}
          </span>
          <span className="text-sm opacity-60"> / {MAX_TOKENS}</span>
          <p className="text-[10px] uppercase font-bold tracking-widest">
            Tokens
          </p>
        </div>
      </div>

      {loading && (
        <div className="relative flex items-center justify-center">
          {/* Rotating Border / Ring */}
          <div className="absolute w-24 h-24 border-4 border-[#F57C00] border-t-transparent rounded-full animate-spin"></div>

          {/* Logo in Center */}
          <div className="relative w-16 h-16 animate-pulse">
            <Logo />
          </div>
        </div>
      )}

      {!loading && availableGames.length === 0 && (
        <div className="p-6 bg-orange-50 border-2 border-dashed border-orange-200 rounded-2xl text-center">
          <span className="text-4xl mb-2 block">🏟️</span>
          <p className="text-[#E65100] font-bold">
            All slots are currently full for your criteria.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableGames.map((game) => {
          const isSelected = selectedGames.some((g) => g.gameId === game._id);
          const disabled = isGameDisabled(game);
          const slotsLeft = getSlotsByGender(game);

          return (
            <div
              key={game._id}
              onClick={() => !disabled && handleSelectGame(game)}
              className={`relative overflow-hidden group border-2 rounded-2xl p-5 transition-all duration-300 ${
                disabled
                  ? "bg-gray-50 opacity-40 cursor-not-allowed grayscale"
                  : isSelected
                  ? "border-[#4CAF50] bg-green-50 shadow-lg scale-[1.02]"
                  : "border-gray-100 bg-white hover:border-[#F57C00] hover:shadow-md cursor-pointer"
              }`}
            >
              {/* Token Badge */}
              <div
                className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-[10px] font-black uppercase ${
                  isSelected
                    ? "bg-[#4CAF50] text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {game.token} Token
              </div>

              <div className="flex items-start gap-4">
                {/* Game Icon Placeholder (Dynamic icons based on name can be added) */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner ${
                    isSelected
                      ? "bg-[#4CAF50] text-white"
                      : "bg-[#002D62]/5 text-[#002D62]"
                  }`}
                >
                  {game.gameName.toLowerCase().includes("cricket")
                    ? "🏏"
                    : game.gameName.toLowerCase().includes("football")
                    ? "⚽"
                    : "🏆"}
                </div>

                <div className="flex-1">
                  <h3
                    className={`font-black uppercase italic text-lg leading-tight ${
                      isSelected ? "text-[#1B5E20]" : "text-[#002D62]"
                    }`}
                  >
                    {game.gameName}
                  </h3>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="bg-white/50 p-1.5 rounded-lg border border-black/5">
                      <p className="text-[10px] uppercase opacity-50 font-bold">
                        Age
                      </p>
                      <p className="text-xs font-bold text-gray-700">
                        {game.ageGroup}
                      </p>
                    </div>
                    <div className="bg-white/50 p-1.5 rounded-lg border border-black/5">
                      <p className="text-[10px] uppercase opacity-50 font-bold">
                        Slots Left
                      </p>
                      <p
                        className={`text-xs font-bold ${
                          slotsLeft < 5 ? "text-red-500" : "text-gray-700"
                        }`}
                      >
                        {slotsLeft}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Select Status Indicator */}
              {isSelected && (
                <div className="absolute bottom-2 right-3 flex items-center gap-1 text-[#4CAF50] font-black text-[10px] uppercase tracking-widest">
                  Selected <span className="text-sm">✓</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepTwo;
