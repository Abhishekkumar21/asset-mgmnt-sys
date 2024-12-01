import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import EmployeeDashboard from './pages/dashboard/EmployeeDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import { RequestAsset } from './pages/asset/RequestAsset';
import { ServiceRequest } from './pages/asset/ServiceRequest';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { useAuth } from './contexts/AuthContext';
import { themeConfig } from './styles/theme';
import './App.css';

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        {/* Employee Routes */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="request-asset" element={<RequestAsset />} />
        <Route path="service-request" element={<ServiceRequest />} />
        <Route path="my-assets" element={<div>My Assets</div>} />
        <Route path="requests" element={<div>Service Requests</div>} />

        {/* Admin Routes */}
        <Route path="admin">
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="assets" element={<div>Asset Management</div>} />
          <Route path="employees" element={<div>Employee Management</div>} />
          <Route path="audit" element={<div>Asset Audit</div>} />
        </Route>
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <ConfigProvider theme={themeConfig}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;
