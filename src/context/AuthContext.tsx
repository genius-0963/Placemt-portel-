import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'company';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'admin' | 'company';
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // This would be a real API call in production
          // const response = await axios.get('/api/auth/me', {
          //   headers: { Authorization: `Bearer ${token}` }
          // });
          
          // Mocking the response for demo purposes
          const mockUser = {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'student' as const
          };
          
          setUser(mockUser);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Auth check failed:', err);
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // This would be a real API call in production
      // const response = await axios.post('/api/auth/login', { email, password });
      
      // Mocking the response for demo purposes
      const mockResponse = {
        data: {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            name: 'John Doe',
            email,
            role: 'student' as const
          }
        }
      };
      
      localStorage.setItem('token', mockResponse.data.token);
      setUser(mockResponse.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setError('Invalid credentials');
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    setError(null);
    
    try {
      // This would be a real API call in production
      // const response = await axios.post('/api/auth/register', userData);
      
      // Mocking the response for demo purposes
      const mockResponse = {
        data: {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            name: userData.name,
            email: userData.email,
            role: userData.role
          }
        }
      };
      
      localStorage.setItem('token', mockResponse.data.token);
      setUser(mockResponse.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setError('Registration failed');
      console.error('Registration failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      register, 
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;