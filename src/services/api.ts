const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth token
const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Helper function to remove auth token
const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      removeAuthToken();
      throw new Error('Authentication failed');
    }
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};

// Authentication API
export const authAPI = {
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    setAuthToken(data.token);
    return data;
  },

  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    setAuthToken(data.token);
    return data;
  },

  logout: (): void => {
    removeAuthToken();
  },

  getCurrentUser: async (): Promise<any> => {
    return makeAuthenticatedRequest('/user/me');
  },
};

// Cycles API
export const cyclesAPI = {
  getAll: async (): Promise<any[]> => {
    return makeAuthenticatedRequest('/cycles');
  },

  create: async (cycleData: any): Promise<any> => {
    return makeAuthenticatedRequest('/cycles', {
      method: 'POST',
      body: JSON.stringify(cycleData),
    });
  },

  update: async (id: string, cycleData: any): Promise<any> => {
    return makeAuthenticatedRequest(`/cycles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cycleData),
    });
  },

  delete: async (id: string): Promise<void> => {
    return makeAuthenticatedRequest(`/cycles/${id}`, {
      method: 'DELETE',
    });
  },
};

// Events API
export const eventsAPI = {
  getAll: async (): Promise<any[]> => {
    return makeAuthenticatedRequest('/events');
  },

  create: async (eventData: any): Promise<any> => {
    return makeAuthenticatedRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },

  update: async (id: string, eventData: any): Promise<any> => {
    return makeAuthenticatedRequest(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  },

  delete: async (id: string): Promise<void> => {
    return makeAuthenticatedRequest(`/events/${id}`, {
      method: 'DELETE',
    });
  },
};

// Settings API
export const settingsAPI = {
  get: async (): Promise<any> => {
    return makeAuthenticatedRequest('/settings');
  },

  update: async (settingsData: any): Promise<any> => {
    return makeAuthenticatedRequest('/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    });
  },
};

// User Profile API
export const userAPI = {
  updateProfile: async (profileData: { username?: string; email?: string }): Promise<any> => {
    return makeAuthenticatedRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  changePassword: async (passwordData: { currentPassword: string; newPassword: string }): Promise<any> => {
    return makeAuthenticatedRequest('/user/password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  },
};

export { getAuthToken, setAuthToken, removeAuthToken }; 