import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AdminDashboardData } from '../../types/dashboard';

const initialDashboardData: AdminDashboardData = {
  totalAssets: 0,
  assignedAssets: 0,
  availableAssets: 0,
  underMaintenanceAssets: 0,
  pendingRequests: 0,
  totalEmployees: 0,
  activeEmployees: 0,
  recentActivities: [],
  assetsByCategory: [],
  assetUtilization: 0,
  maintenanceAlerts: 0
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<AdminDashboardData>(initialDashboardData);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${process.env.VITE_API_URL}/admin/dashboard`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const quickActions = [
    {
      title: 'Add Asset',
      icon: '➕',
      onClick: () => navigate('/assets/add'),
    },
    {
      title: 'Manage Requests',
      icon: '📋',
      onClick: () => navigate('/requests'),
    },
    {
      title: 'View Reports',
      icon: '📊',
      onClick: () => navigate('/reports'),
    },
    {
      title: 'Manage Users',
      icon: '👥',
      onClick: () => navigate('/users'),
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Asset Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm mb-2">Total Assets</div>
          <div className="text-2xl font-bold">{dashboardData.totalAssets}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm mb-2">Assigned Assets</div>
          <div className="text-2xl font-bold text-green-600">{dashboardData.assignedAssets}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm mb-2">Available Assets</div>
          <div className="text-2xl font-bold text-blue-600">{dashboardData.availableAssets}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm mb-2">Under Maintenance</div>
          <div className="text-2xl font-bold text-yellow-600">{dashboardData.underMaintenanceAssets}</div>
        </div>
      </div>

      {/* Employee & Request Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm mb-2">Total Employees</div>
          <div className="text-2xl font-bold">{dashboardData.totalEmployees}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm mb-2">Active Employees</div>
          <div className="text-2xl font-bold text-green-600">{dashboardData.activeEmployees}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm mb-2">Pending Requests</div>
          <div className="text-2xl font-bold text-yellow-600">{dashboardData.pendingRequests}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm mb-2">Maintenance Alerts</div>
          <div className="text-2xl font-bold text-red-600">{dashboardData.maintenanceAlerts}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="bg-white rounded-lg shadow p-6 text-center hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="text-3xl mb-2">{action.icon}</div>
            <div className="font-medium">{action.title}</div>
          </button>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Recent Activities</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.recentActivities.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50 cursor-pointer" 
                    onClick={() => navigate(`/activity/${activity.id}`)}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.assetName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.user}</td>
                </tr>
              ))}
              {dashboardData.recentActivities.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No recent activities
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asset Distribution */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Assets by Category</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.assetsByCategory.map((category, index) => (
                <tr key={index} className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/assets/category/${category.category}`)}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.count}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.available || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.round(((category.count - (category.available || 0)) / category.count) * 100)}%
                  </td>
                </tr>
              ))}
              {dashboardData.assetsByCategory.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No categories available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
