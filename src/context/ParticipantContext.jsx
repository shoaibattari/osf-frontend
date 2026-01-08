import { createContext, useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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

  const [stats, setStats] = useState({
    totalParticipants: 0,
    ageGroups: {}, // { "5-10": 10, "11-15": 20, ... }
  });
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

  const { mutate: fetchStats, isLoading: fetchingStats } = useMutation({
    mutationFn: async () => {
      const res = await apis.getParticipantStats(); // backend route for stats
      return res.data;
    },
    onSuccess: (data) => {
      if (data) setStats(data);
      else toast.error("Failed to fetch stats");
    },
    onError: (err) => toast.error(err?.message || "Error fetching stats"),
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

        stats,
        fetchStats,
        fetchingStats,
      }}
    >
      {children}
    </ParticipantContext.Provider>
  );
};

export const useParticipant = () => useContext(ParticipantContext);
