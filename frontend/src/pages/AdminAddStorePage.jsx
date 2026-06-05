import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api';
import { toast } from 'react-toastify';

function AdminAddStorePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await api.post('/admin/stores', { name, email, address, owner_id: Number(ownerId) });
      toast.success('Store created successfully');
      setName('');
      setEmail('');
      setAddress('');
      setOwnerId('');
    } catch (error) {
      toast.error(error.message || 'Unable to add store');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-900">Add Store</h1>
          <p className="mt-2 text-slate-600">Register a new store and assign it to a store owner.</p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-card">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Store Name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
                required
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
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Address</span>
              <textarea
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                rows="4"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Owner ID</span>
              <input
                type="number"
                value={ownerId}
                onChange={(event) => setOwnerId(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
                required
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Create Store'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AdminAddStorePage;
