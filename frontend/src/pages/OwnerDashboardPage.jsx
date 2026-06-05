import { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import { toast } from 'react-toastify';

function OwnerDashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState([]);
  const [ratingsLoading, setRatingsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const { data } = await api.get('/dashboard/owner');
        setDashboard(data.data);
      } catch (error) {
        toast.error(error.message || 'Unable to load owner dashboard');
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  useEffect(() => {
    const loadRatings = async () => {
      setRatingsLoading(true);
      try {
        const { data } = await api.get('/store-owner/ratings');
        setRatings(data.data || []);
      } catch (error) {
        toast.error(error.message || 'Unable to load ratings');
      } finally {
        setRatingsLoading(false);
      }
    };
    loadRatings();
  }, []);

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-900">Store Owner Dashboard</h1>
          <p className="mt-2 text-slate-600">See your average store rating from customer feedback.</p>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="rounded-3xl bg-white p-8 shadow-card">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Average Store Rating</p>
            <p className="mt-6 text-5xl font-bold text-slate-900">{dashboard.average_rating || 0}</p>
            <p className="mt-3 text-slate-600">Based on customer reviews for all stores you own.</p>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-slate-900">Users Who Rated Your Store</h2>
          {ratingsLoading ? (
            <div className="mt-4"><LoadingSpinner /></div>
          ) : ratings.length === 0 ? (
            <p className="mt-4 text-slate-600">No ratings yet.</p>
          ) : (
            <div className="overflow-hidden rounded-3xl bg-white shadow-card mt-4">
              <table className="min-w-full divide-y divide-slate-200 text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">User Name</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Email</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Rating</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Rating Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {ratings.map((r) => (
                    <tr key={`${r.userId}-${r.storeId}-${r.createdAt}`}>
                      <td className="px-6 py-4 text-sm text-slate-800">{r.userName}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{r.userEmail}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.rating}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{new Date(r.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default OwnerDashboardPage;
