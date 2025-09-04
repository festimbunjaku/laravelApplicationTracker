// User types
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

// Job Application types
export interface JobApplication {
  id: number;
  link: string;
  title: string;
  position: string;
  company: string;
  status: 'pending' | 'interview' | 'approved' | 'rejected';
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface JobApplicationFormData {
  link: string;
  title: string;
  position: string;
  company: string;
  status?: JobApplication['status'];
  notes?: string;
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';
