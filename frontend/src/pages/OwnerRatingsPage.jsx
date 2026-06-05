import { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import { toast } from 'react-toastify';

function OwnerRatingsPage() {
  const [ratings, setRatings] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRatings = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/ratings/owner/history', { params: { page, limit: 10 } });
        setRatings(data.rows);
        setTotal(data.total);
      } catch (error) {
        toast.error(error.message || 'Unable to load rating history');
      } finally {
        setLoading(false);
      }
    };
    loadRatings();
  }, [page]);

  const pages = Math.max(1, Math.ceil(total / 10));

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-900">Rating History</h1>
          <p className="mt-2 text-slate-600">Monitor feedback from users who rated your stores.</p>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="overflow-hidden rounded-3xl bg-white shadow-card">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">User Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">User Email</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Store</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Rating</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {ratings.map((rating) => (
                  <tr key={rating.id}>
                    <td className="px-6 py-4 text-sm text-slate-800">{rating.user_name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{rating.user_email}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{rating.store_name}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{rating.rating}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(rating.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-slate-200 p-4">
              <p className="text-sm text-slate-500">Showing {ratings.length} of {total} records</p>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={page >= pages}
                  onClick={() => setPage((prev) => Math.min(pages, prev + 1))}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default OwnerRatingsPage;
