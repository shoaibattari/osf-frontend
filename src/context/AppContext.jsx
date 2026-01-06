import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import apis from "../config/api";

// ✅ Initial state
const initialAppState = {
  campuses: [],
  courses: [],
  events: [],
  participants: [],
  pagination: null,
  initialized: false,
};

const AppContext = createContext(initialAppState);

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState(initialAppState);

  // ✅ Fetch all campuses
  const { mutate: fetchAllCampuses, isPending: fetchingCampuses } = useMutation(
    {
      mutationFn: () => apis.getCampuses(),
      onSuccess: ({ data }) => {
        if (data?.status) {
          setAppState((prev) => ({
            ...prev,
            campuses: data?.data || [],
            initialized: true,
          }));
        } else {
          toast.error("Failed to load campuses");
          setAppState((prev) => ({ ...prev, initialized: true }));
        }
      },
      onError: (error) => {
        toast.error(error?.message || "Error fetching campuses");
        setAppState((prev) => ({ ...prev, initialized: true }));
      },
    }
  );

  const { mutate: fetchAllCourses, isPending: fetchingCourses } = useMutation({
    mutationFn: () => apis.getCourses(),
    onSuccess: ({ data }) => {
      if (data?.status) {
        setAppState((prev) => ({
          ...prev,
          courses: data?.data || [],
          initialized: true,
        }));
      } else {
        toast.error("Failed to load courses");
        setAppState((prev) => ({ ...prev, initialized: true }));
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Error fetching courses");
      setAppState((prev) => ({ ...prev, initialized: true }));
    },
  });

  const { mutate: fetchAllEvents, isPending: fetchingEvents } = useMutation({
    mutationFn: () => apis.getEvents(),
    onSuccess: ({ data }) => {
      if (data?.status) {
        setAppState((prev) => ({
          ...prev,
          events: data?.data || [],
          initialized: true,
        }));
      } else {
        toast.error("Failed to load courses");
        setAppState((prev) => ({ ...prev, initialized: true }));
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Error fetching courses");
      setAppState((prev) => ({ ...prev, initialized: true }));
    },
  });

  const {
    mutate: fetchAllParticipants,
    isPending: fetchingParticipants,
  } = useMutation({
    mutationFn: ({ search, page, limit }) =>
      apis.getParticipants({ search, page, limit }),
    onSuccess: ({ data }) => {
      if (data?.status) {
        setAppState((prev) => ({
          ...prev,
          participants: data?.data || [],
          pagination: data?.pagination,
          initialized: true,
        }));
      } else {
        toast.error("Failed to load participants");
        setAppState((prev) => ({ ...prev, initialized: true }));
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Error fetching participants");
      setAppState((prev) => ({ ...prev, initialized: true }));
    },
  });

  // ✅ Function to trigger initial data load
  const loadAppData = useCallback(() => {
    fetchAllCampuses();
    fetchAllCourses();
    fetchAllEvents();
    fetchAllEvents();
    fetchAllParticipants({ search: "", page: 1, limit: 5 });
  }, [fetchAllCampuses, fetchAllCourses, fetchAllEvents, fetchAllParticipants]);

  // ✅ Load app data on mount
  useEffect(() => {
    loadAppData();
  }, [loadAppData]);

  return (
    <AppContext.Provider
      value={{
        campuses: appState.campuses,
        initialized: appState.initialized,
        fetchingCampuses,
        fetchAllCampuses,
        loadAppData,
        courses: appState.courses,
        fetchingCourses,
        fetchAllCourses,
        events: appState.events,
        fetchingEvents,
        fetchAllEvents,
        participants: appState.participants,
        pagination: appState.pagination,
        fetchingParticipants,
        fetchAllParticipants,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ✅ Custom hook
export const useAppContext = () => useContext(AppContext);
