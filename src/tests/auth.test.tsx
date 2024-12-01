import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import { message } from 'antd';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock auth service
jest.mock('../services/authService', () => ({
  login: jest.fn(async (credentials) => {
    if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
      return {
        token: 'mock-admin-token',
        user: {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'ADMIN',
        },
      };
    }
    if (credentials.email === 'employee@example.com' && credentials.password === 'employee123') {
      return {
        token: 'mock-employee-token',
        user: {
          id: '2',
          name: 'Employee User',
          email: 'employee@example.com',
          role: 'EMPLOYEE',
        },
      };
    }
    throw new Error('Invalid credentials');
  }),
  register: jest.fn(async (data) => {
    if (data.email === 'exists@example.com') {
      throw new Error('User already exists');
    }
    return {
      id: '3',
      ...data,
      role: 'EMPLOYEE',
    };
  }),
  logout: jest.fn(),
  getCurrentUser: jest.fn(),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Authentication Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
  });

  describe('Login Component', () => {
    it('renders login form correctly', () => {
      renderWithProviders(<Login />);
      
      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('handles successful admin login', async () => {
      renderWithProviders(<Login />);
      
      await userEvent.type(screen.getByPlaceholderText(/email/i), 'admin@example.com');
      await userEvent.type(screen.getByPlaceholderText(/password/i), 'admin123');
      
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        expect(message.success).toHaveBeenCalled();
      });
    });

    it('handles successful employee login', async () => {
      renderWithProviders(<Login />);
      
      await userEvent.type(screen.getByPlaceholderText(/email/i), 'employee@example.com');
      await userEvent.type(screen.getByPlaceholderText(/password/i), 'employee123');
      
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        expect(message.success).toHaveBeenCalled();
      });
    });

    it('handles login failure', async () => {
      renderWithProviders(<Login />);
      
      await userEvent.type(screen.getByPlaceholderText(/email/i), 'wrong@example.com');
      await userEvent.type(screen.getByPlaceholderText(/password/i), 'wrongpass');
      
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
      
      await waitFor(() => {
        expect(message.error).toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });
  });

  describe('Register Component', () => {
    it('renders register form correctly', () => {
      renderWithProviders(<Register />);
      
      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/^password/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    it('handles successful registration', async () => {
      renderWithProviders(<Register />);
      
      await userEvent.type(screen.getByPlaceholderText(/name/i), 'New User');
      await userEvent.type(screen.getByPlaceholderText(/email/i), 'new@example.com');
      await userEvent.type(screen.getByPlaceholderText(/^password/i), 'password123');
      await userEvent.type(screen.getByPlaceholderText(/confirm password/i), 'password123');
      
      fireEvent.click(screen.getByRole('button', { name: /register/i }));
      
      await waitFor(() => {
        expect(message.success).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      });
    });

    it('handles registration with existing email', async () => {
      renderWithProviders(<Register />);
      
      await userEvent.type(screen.getByPlaceholderText(/name/i), 'Existing User');
      await userEvent.type(screen.getByPlaceholderText(/email/i), 'exists@example.com');
      await userEvent.type(screen.getByPlaceholderText(/^password/i), 'password123');
      await userEvent.type(screen.getByPlaceholderText(/confirm password/i), 'password123');
      
      fireEvent.click(screen.getByRole('button', { name: /register/i }));
      
      await waitFor(() => {
        expect(message.error).toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });

    it('validates password match', async () => {
      renderWithProviders(<Register />);
      
      await userEvent.type(screen.getByPlaceholderText(/name/i), 'New User');
      await userEvent.type(screen.getByPlaceholderText(/email/i), 'new@example.com');
      await userEvent.type(screen.getByPlaceholderText(/^password/i), 'password123');
      await userEvent.type(screen.getByPlaceholderText(/confirm password/i), 'different');
      
      fireEvent.click(screen.getByRole('button', { name: /register/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });
  });
});
