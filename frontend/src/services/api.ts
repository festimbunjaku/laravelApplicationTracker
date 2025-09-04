import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ApiResponse, User, JobApplication, LoginFormData, RegisterFormData, JobApplicationFormData } from '@/types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Important for Laravel Sanctum CSRF protection
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to get CSRF cookie (required for Laravel Sanctum)
const getCsrfCookie = async () => {
  try {
    await api.get('/sanctum/csrf-cookie', {
      baseURL: import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:8000',
    });
  } catch (error) {
    console.warn('CSRF cookie request failed:', error);
  }
};

// Auth API
export const authApi = {
  login: async (credentials: LoginFormData): Promise<ApiResponse<{ user: User; token: string }>> => {
    await getCsrfCookie();
    const response: AxiosResponse<ApiResponse<{ user: User; token: string }>> = await api.post('/login', credentials);
    return response.data;
  },

  register: async (data: RegisterFormData): Promise<ApiResponse<{ user: User; token: string }>> => {
    await getCsrfCookie();
    const response: AxiosResponse<ApiResponse<{ user: User; token: string }>> = await api.post('/register', data);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response: AxiosResponse<ApiResponse<null>> = await api.post('/logout');
    return response.data;
  },

  getUser: async (): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.get('/user');
    return response.data;
  },

  updateUser: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.put('/user', data);
    return response.data;
  },
};

// Job Applications API
export const jobApplicationsApi = {
  getAll: async (): Promise<ApiResponse<JobApplication[]>> => {
    const response: AxiosResponse<ApiResponse<JobApplication[]>> = await api.get('/job-applications');
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<JobApplication>> => {
    const response: AxiosResponse<ApiResponse<JobApplication>> = await api.get(`/job-applications/${id}`);
    return response.data;
  },

  create: async (data: JobApplicationFormData): Promise<ApiResponse<JobApplication>> => {
    const response: AxiosResponse<ApiResponse<JobApplication>> = await api.post('/job-applications', data);
    return response.data;
  },

  update: async (id: number, data: Partial<JobApplicationFormData>): Promise<ApiResponse<JobApplication>> => {
    const response: AxiosResponse<ApiResponse<JobApplication>> = await api.put(`/job-applications/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/job-applications/${id}`);
    return response.data;
  },
};

export default api;
