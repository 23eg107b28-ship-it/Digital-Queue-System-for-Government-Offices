import api from "./api";

export const staffService = {
  nextToken: () => api.post("/api/staff/next-token").then((res) => res.data),
  skipToken: (tokenId) => api.post(`/api/staff/skip-token?tokenId=${tokenId}`).then((res) => res.data),
  recallToken: (tokenId) => api.post(`/api/staff/recall-token?tokenId=${tokenId}`).then((res) => res.data),
  completeToken: (tokenId) => api.post(`/api/staff/complete-token?tokenId=${tokenId}`).then((res) => res.data),
  waitingUsers: () => api.get("/api/staff/waiting-users").then((res) => res.data)
};
