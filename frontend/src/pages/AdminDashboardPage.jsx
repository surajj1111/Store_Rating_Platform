import { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import { toast } from 'react-toastify';

function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const { data } = await api.get('/dashboard/admin');
        setData(data.totals);
      } catch (error) {
        toast.error(error.message || 'Unable to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
            <p className="mt-2 text-slate-600">Manage users, stores, and ratings from a single admin panel.</p>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-card">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Users</p>
              <p className="mt-4 text-4xl font-bold text-slate-900">{data.users}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-card">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Stores</p>
              <p className="mt-4 text-4xl font-bold text-slate-900">{data.stores}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-card">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Ratings</p>
              <p className="mt-4 text-4xl font-bold text-slate-900">{data.ratings}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboardPage;
