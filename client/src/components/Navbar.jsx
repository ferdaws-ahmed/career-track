import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">CareerTrack Lite</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
                <Link to="/applications" className="hover:text-blue-400 transition">Applications</Link>
                <div className="flex items-center space-x-2 border-l pl-4 border-gray-700">
                  <User className="h-5 w-5" />
                  <span className="text-sm">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg transition"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
