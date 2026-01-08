const authApi = (api) => ({
  loginUser: (payload) => api.post("/auth/login", payload),
  registerUser: (payload) => api.post("/auth/register", payload),
  getProfile: () => api.get("/auth/profile"), //
  getGamesByCriteria: (gender, ageGroup) =>
    api.get(`/games?gender=${gender}&ageGroup=${ageGroup}`),
  registerParticipant: (formData) =>
    api.post("/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getParticipants: ({ search = "", page = 1, limit = 10 } = {}) =>
    api.get("/register", {
      params: { search, page, limit },
    }),
  getParticipantStats: () => api.get("/register/stats"), //
});

export default authApi;
