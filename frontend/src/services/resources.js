import api from "./api";

export const authApi = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  me: () => api.get("/auth/me"),
};

export const servicesApi = {
  list: () => api.get("/services"),
  create: (data) => api.post("/services", data),
  update: (id, data) => api.put(`/services/${id}`, data),
  remove: (id) => api.delete(`/services/${id}`),
};

export const categoriesApi = {
  list: () => api.get("/categories"),
  create: (data) => api.post("/categories", data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  remove: (id) => api.delete(`/categories/${id}`),
};

export const productsApi = {
  list: () => api.get("/products"),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  remove: (id) => api.delete(`/products/${id}`),
};

export const galleryApi = {
  list: () => api.get("/gallery"),
  create: (data) => api.post("/gallery", data),
  update: (id, data) => api.put(`/gallery/${id}`, data),
  remove: (id) => api.delete(`/gallery/${id}`),
};

export const reviewsApi = {
  list: () => api.get("/reviews"),
  create: (data) => api.post("/reviews", data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  remove: (id) => api.delete(`/reviews/${id}`),
};

export const settingsApi = {
  get: () => api.get("/settings"),
  update: (data) => api.put("/settings", data),
};
