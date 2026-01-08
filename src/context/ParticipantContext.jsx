import { createContext, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apis from "../config/api";

const ParticipantContext = createContext();

export const ParticipantProvider = ({ children }) => {
  /* --------------------------------
     Registration Form States
  -------------------------------- */
  const [participantData, setParticipantData] = useState({
    omjCard: "",
    khundi: "",
    location: "",
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

  /* --------------------------------
     Participants Listing States
  -------------------------------- */
  const [participants, setParticipants] = useState([]);
  const [pagination, setPagination] = useState(null);

  /* --------------------------------
     Clear Registration Data
  -------------------------------- */
  const clearParticipantData = () => {
    setParticipantData({
      omjCard: "",
      khundi: "",
      location: "",
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

  /* --------------------------------
     Fetch All Participants (Admin)
  -------------------------------- */
  const {
    mutate: fetchAllParticipants,
    isPending: fetchingParticipants,
  } = useMutation({
    mutationFn: ({ search = "", page = 1, limit = 10 }) =>
      apis.getParticipants({ search, page, limit }),

    onSuccess: ({ data }) => {
      if (data) {
        setParticipants(data.participants || []);
        setPagination(data.pagination || null);
      } else {
        toast.error("Failed to load participants");
      }
    },

    onError: (error) => {
      toast.error(error?.message || "Error fetching participants");
    },
  });

  return (
    <ParticipantContext.Provider
      value={{
        /* Registration */
        participantData,
        setParticipantData,
        selectedGames,
        setSelectedGames,
        paymentFile,
        setPaymentFile,
        clearParticipantData,

        /* Admin Listing */
        participants,
        pagination,
        fetchAllParticipants,
        fetchingParticipants,
      }}
    >
      {children}
    </ParticipantContext.Provider>
  );
};

export const useParticipant = () => useContext(ParticipantContext);
