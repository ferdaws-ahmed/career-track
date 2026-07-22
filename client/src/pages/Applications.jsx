import { useState, useEffect } from 'react';
import api from '../api/axios'; // Import our centralized Axios instance!
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Search, Filter, Loader2, ExternalLink } from 'lucide-react';
import ApplicationModal from '../components/ApplicationModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (statusFilter) params.status = statusFilter;
      if (sourceFilter) params.source = sourceFilter;
      
      const res = await api.get('/applications', { params }); // Use our api instance!
      setApplications(res.data.applications);
      setFilteredApplications(res.data.applications);
    } catch (err) {
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [searchQuery, statusFilter, sourceFilter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await api.delete(`/applications/${id}`); // Use our api instance!
        toast.success('Application deleted successfully');
        fetchApplications();
      } catch (err) {
        toast.error('Failed to delete application');
      }
    }
  };

  const handleEdit = (app) => {
    setEditingApplication(app);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingApplication(null);
    setIsModalOpen(true);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Offer': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Interview': return 'bg-purple-100 text-purple-800';
      case 'Assessment': return 'bg-yellow-100 text-yellow-800';
      case 'Applied': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
            <p className="text-gray-600 mt-1">Track and manage all your job applications</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="h-5 w-5" />
            <span>Add New</span>
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by company or job title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option>Saved</option>
                <option>Applied</option>
                <option>Assessment</option>
                <option>Interview</option>
                <option>Rejected</option>
                <option>Offer</option>
              </select>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Sources</option>
                <option>LinkedIn</option>
                <option>Bdjobs</option>
                <option>RemoteOk</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>
        {filteredApplications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApplications.map((app) => (
              <div key={app._id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{app.jobTitle}</h3>
                    <p className="text-gray-600">{app.companyName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <p>📅 {new Date(app.applicationDate).toLocaleDateString()}</p>
                  <p>📍 {app.source}</p>
                  {app.jobUrl && (
                    <a
                      href={app.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View Job</span>
                    </a>
                  )}
                </div>
                {app.notes && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{app.notes}</p>
                )}
                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={() => handleEdit(app)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 flex-1 justify-center py-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 flex-1 justify-center py-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border">
            <p className="text-gray-500 text-lg">No applications found</p>
            <button
              onClick={handleAdd}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Add your first application
            </button>
          </div>
        )}
      </div>
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        application={editingApplication}
        onSuccess={fetchApplications}
      />
    </div>
  );
};

export default Applications;
