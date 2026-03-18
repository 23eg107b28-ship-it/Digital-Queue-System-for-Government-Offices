import api from "./api";

export const adminService = {
  analytics: () => api.get("/api/admin/analytics").then((res) => res.data),
  createOffice: (payload) => api.post("/api/admin/offices", payload).then((res) => res.data),
  createDepartment: (payload) => api.post("/api/admin/departments", payload).then((res) => res.data),
  createService: (payload) => api.post("/api/admin/services", payload).then((res) => res.data),
  createCounter: (payload) => api.post("/api/admin/counters", payload).then((res) => res.data)
};
