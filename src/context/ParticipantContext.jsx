import { createContext, useContext, useState } from "react";

const ParticipantContext = createContext();

export const ParticipantProvider = ({ children }) => {
  const [participantData, setParticipantData] = useState({
    name: "",
    fatherName: "",
    cnic: "",
    whatsapp: "",
    gender: "",
    ageGroup: "",
    kitSize: "",
    dob: "",
  });

  const [selectedGames, setSelectedGames] = useState([]);
  const [paymentFile, setPaymentFile] = useState(null);

  // ✅ Function to clear all participant data
  const clearParticipantData = () => {
    setParticipantData({
      name: "",
      fatherName: "",
      cnic: "",
      whatsapp: "",
      gender: "",
      ageGroup: "",
      kitSize: "",
      dob: "",
    });
    setSelectedGames([]);
    setPaymentFile(null);
  };

  return (
    <ParticipantContext.Provider
      value={{
        participantData,
        setParticipantData,
        selectedGames,
        setSelectedGames,
        paymentFile,
        setPaymentFile,
        clearParticipantData,
      }}
    >
      {children}
    </ParticipantContext.Provider>
  );
};

export const useParticipant = () => useContext(ParticipantContext);
