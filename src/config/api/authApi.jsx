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
  getParticipants: ({
    search = "",
    page = 1,
    limit = 10,
    paymentStatus,
  } = {}) =>
    api.get("/register", {
      params: { search, page, limit, paymentStatus },
    }),
  getParticipantStats: () => api.get("/register/stats"), //
  updatePaymentStatus: (id, paymentStatus) =>
    api.patch(`/register/${id}/payment-status`, {
      paymentStatus,
    }),
});

export default authApi;
