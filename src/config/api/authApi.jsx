const authApi = (api) => ({
  loginUser: (payload) => api.post("/auth/login", payload),
  registerUser: (payload) => api.post("/auth/register", payload),
  registerParticipant: (payload) => api.post("/participant/add", payload),
  getProfile: () => api.get("/auth/profile"), //
});

export default authApi;
