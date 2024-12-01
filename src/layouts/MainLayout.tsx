import React, { useState, useMemo } from 'react';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import { 
  FiBox, 
  FiMonitor, 
  FiUser, 
  FiClipboard, 
  FiTool, 
  FiLogOut, 
  FiMenu, 
  FiX 
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

interface MenuItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const menuItems = useMemo<MenuItem[]>(() => {
    if (user?.role === 'ADMIN') {
      return [
        {
          path: '/admin/dashboard',
          icon: <FiBox className="h-5 w-5" />,
          label: 'Dashboard',
        },
        {
          path: '/admin/assets',
          icon: <FiMonitor className="h-5 w-5" />,
          label: 'Asset Management',
        },
        {
          path: '/admin/employees',
          icon: <FiUser className="h-5 w-5" />,
          label: 'Employee Management',
        },
        {
          path: '/admin/audit',
          icon: <FiClipboard className="h-5 w-5" />,
          label: 'Asset Audit',
        },
      ];
    }

    return [
      {
        path: '/dashboard',
        icon: <FiBox className="h-5 w-5" />,
        label: 'Dashboard',
      },
      {
        path: '/my-assets',
        icon: <FiMonitor className="h-5 w-5" />,
        label: 'My Assets',
      },
      {
        path: '/requests',
        icon: <FiTool className="h-5 w-5" />,
        label: 'Service Requests',
      },
    ];
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderMenuItem = (item: MenuItem) => (
    <Link
      key={item.path}
      to={item.path}
      className={`flex items-center space-x-2 p-3 rounded-lg transition-colors duration-200 
        ${location.pathname === item.path
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      onClick={() => setIsMobileSidebarOpen(false)}
      aria-current={location.pathname === item.path ? 'page' : undefined}
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  );

  return (
    <div className="flex h-screen w-screen m-0 p-0 absolute inset-0">
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          absolute top-0 bottom-0 left-0 w-64 bg-white shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Asset Management</h2>
          <button 
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={toggleMobileSidebar}
            aria-label="Close sidebar"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          {menuItems.map(renderMenuItem)}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full ml-0 md:ml-64 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <button 
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={toggleMobileSidebar}
            aria-label="Open sidebar"
          >
            <FiMenu className="h-6 w-6" />
          </button>
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700" aria-label="Logged in user">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
              aria-label="Logout"
            >
              <FiLogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;