import api from './api';

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

export const employeeAPI = {
  getAll: (params) => api.get('/employees', { params }),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post('/employees', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.put(`/employees/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/employees/${id}`),
};

export const departmentAPI = {
  getAll: (params) => api.get('/departments', { params }),
  getAllList: () => api.get('/departments/all'),
  getById: (id) => api.get(`/departments/${id}`),
  create: (data) => api.post('/departments', data),
  update: (id, data) => api.put(`/departments/${id}`, data),
  delete: (id) => api.delete(`/departments/${id}`),
};

export const roleAPI = {
  getAll: (params) => api.get('/roles', { params }),
  getAllList: () => api.get('/roles/all'),
  getPermissions: () => api.get('/roles/permissions/all'),
  getById: (id) => api.get(`/roles/${id}`),
  create: (data) => api.post('/roles', data),
  update: (id, data) => api.put(`/roles/${id}`, data),
  delete: (id) => api.delete(`/roles/${id}`),
};

export const leaveAPI = {
  getAll: (params) => api.get('/leave-requests', { params }),
  getById: (id) => api.get(`/leave-requests/${id}`),
  create: (data) => api.post('/leave-requests', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  approve: (id, comment) => api.patch(`/leave-requests/${id}/approve`, { comment }),
  reject: (id, comment) => api.patch(`/leave-requests/${id}/reject`, { comment }),
  cancel: (id) => api.patch(`/leave-requests/${id}/cancel`),
};

export const notificationAPI = {
  getAll: (params) => api.get('/notifications', { params }),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/read-all'),
};

export const activityLogAPI = {
  getAll: (params) => api.get('/activity-logs', { params }),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getCharts: () => api.get('/dashboard/charts'),
};

export const profileAPI = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  uploadAvatar: (data) => api.post('/profile/avatar', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
};
