import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api';
import { toast } from 'react-toastify';

function AdminAddUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await api.post('/admin/users', { name, email, address, role, password });
      toast.success('User created successfully');
      setName('');
      setEmail('');
      setAddress('');
      setPassword('');
      setRole('user');
    } catch (error) {
      toast.error(error.message || 'Unable to add user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-900">Add New User</h1>
          <p className="mt-2 text-slate-600">Create a regular user, owner, or administrator account.</p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-card">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Full name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
                required
                placeholder="System Administrator User"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
                required
                placeholder="admin@example.com"
              />
            </label>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Role</span>
                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 focus:border-slate-900 focus:outline-none"
                >
                  <option value="user">Normal User</option>
                  <option value="owner">Store Owner</option>
                  <option value="admin">Administrator</option>
                </select>
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Address</span>
              <textarea
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                rows="4"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
                placeholder="Enter address"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Create User'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AdminAddUserPage;
