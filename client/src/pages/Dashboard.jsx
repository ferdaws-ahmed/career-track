import { useState, useEffect } from 'react';
import api from '../api/axios'; // Import our centralized Axios instance!
import { useAuth } from '../context/AuthContext';
import { Briefcase, Bookmark, Send, ClipboardList, MessageSquare, XCircle, Award } from 'lucide-react';
import { CardSkeleton, ListSkeleton } from '../components/Skeleton';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/applications/dashboard/stats'); // Use our api instance!
        setStats(res.data.stats);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statusConfig = {
    total: { icon: Briefcase, color: 'blue', label: 'Total' },
    saved: { icon: Bookmark, color: 'gray', label: 'Saved' },
    applied: { icon: Send, color: 'indigo', label: 'Applied' },
    assessment: { icon: ClipboardList, color: 'yellow', label: 'Assessment' },
    interview: { icon: MessageSquare, color: 'purple', label: 'Interview' },
    rejected: { icon: XCircle, color: 'red', label: 'Rejected' },
    offer: { icon: Award, color: 'green', label: 'Offer' }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Here's your job application overview</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {loading ? (
            Array(7).fill(0).map((_, i) => <CardSkeleton key={i} />)
          ) : (
            Object.entries(statusConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">{config.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stats?.[key] || 0}</p>
                    </div>
                    <div className={`p-4 rounded-2xl bg-gradient-to-br from-${config.color}-100 to-${config.color}-50 text-${config.color}-600`}>
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Applications</h2>
          {loading ? (
            <ListSkeleton />
          ) : stats?.recent?.length > 0 ? (
            <div className="space-y-3">
              {stats.recent.map((app) => (
                <div key={app._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div>
                    <h3 className="font-semibold text-gray-900">{app.jobTitle}</h3>
                    <p className="text-sm text-gray-500">{app.companyName}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                    app.status === 'Offer' ? 'bg-green-100 text-green-800' :
                    app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    app.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
                    app.status === 'Assessment' ? 'bg-yellow-100 text-yellow-800' :
                    app.status === 'Applied' ? 'bg-indigo-100 text-indigo-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No applications yet. Start tracking your job search!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
