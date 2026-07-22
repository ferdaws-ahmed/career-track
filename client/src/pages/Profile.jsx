import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { User, Image as ImageIcon, Lock, CheckCircle2 } from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    profilePicture: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        profilePicture: user.profilePicture || '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      toast.error('New passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      const res = await api.put('/auth/profile', {
        name: formData.name,
        profilePicture: formData.profilePicture,
        currentPassword: formData.currentPassword || undefined,
        newPassword: formData.newPassword || undefined,
      });
      toast.success('Profile updated successfully!');
      updateUser(res.data.user);
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account details and preferences</p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture & Name */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {formData.profilePicture ? (
                      <img
                        src={formData.profilePicture}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user?.name?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <ImageIcon className="h-4 w-4 inline mr-1" />
                    Profile Picture URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="profilePicture"
                      value={formData.profilePicture}
                      onChange={handleChange}
                      placeholder="https://example.com/profile.jpg"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-6 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Lock className="h-4 w-4 inline mr-1" />
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Lock className="h-4 w-4 inline mr-1" />
                  New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <CheckCircle2 className="h-4 w-4 inline mr-1" />
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-200 rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              {loading ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
