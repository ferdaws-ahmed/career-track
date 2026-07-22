import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Briefcase, LogOut } from 'lucide-react';
import { sidebarLinks } from '../data/dashboardData';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CareerTrack Lite
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.id}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-red-600 rounded-xl font-medium transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col animate-in slide-in-from-left">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  CareerTrack Lite
                </span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.id}
                    to={link.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setSidebarOpen(false);
                }}
                className="flex items-center space-x-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-red-600 rounded-xl font-medium transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar for mobile */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <Link to="/" className="flex items-center space-x-2 ml-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-1.5 rounded-lg">
              <Briefcase className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CareerTrack Lite
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
