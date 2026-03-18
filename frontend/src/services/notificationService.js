import api from "./api";

export const notificationService = {
  list: () => api.get("/api/notifications").then((res) => res.data)
};
