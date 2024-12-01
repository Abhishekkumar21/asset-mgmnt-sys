import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { message } from 'antd';
import { User } from '../types';
import { authService } from '../services/authService';
import { LoadingSpinner } from '../components/LoadingSpinner'; // Import the LoadingSpinner component

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'role'> & { password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      message.success('Login successful!');
    } catch (error) {
      message.error('Login failed. Please check your credentials.');
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    message.success('Logged out successfully');
  };

  const register = async (userData: Omit<User, 'id' | 'role'> & { password: string }) => {
    try {
      await authService.register(userData);
      message.success('Registration successful! Please log in.');
    } catch (error) {
      message.error('Registration failed. Please try again.');
      throw error;
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen tip="Initializing application..." />;
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
