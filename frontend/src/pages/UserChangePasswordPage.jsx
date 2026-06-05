import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api';
import { toast } from 'react-toastify';

function UserChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/change-password', { oldPassword, newPassword });
      toast.success('Password updated successfully');
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      toast.error(error.message || 'Unable to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-900">Change Password</h1>
          <p className="mt-2 text-slate-600">Update your password securely at any time.</p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-card">
          <form onSubmit={handleSubmit} className="grid gap-6">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Current Password</span>
              <input
                type="password"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">New Password</span>
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
                required
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default UserChangePasswordPage;
