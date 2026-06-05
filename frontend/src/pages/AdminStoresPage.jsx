import { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import { toast } from 'react-toastify';

function AdminStoresPage() {
  const [stores, setStores] = useState([]);
  const [query, setQuery] = useState('');
  const [address, setAddress] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStores = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/admin/stores', { params: { search: query, address, page, limit: 10 } });
        setStores(data.data);
        setTotal(data.total);
      } catch (error) {
        toast.error(error.message || 'Unable to load stores');
      } finally {
        setLoading(false);
      }
    };
    loadStores();
  }, [query, address, page]);

  const pages = Math.max(1, Math.ceil(total / 10));

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Store Management</h1>
            <p className="mt-2 text-slate-600">Search and monitor store performance and average rating.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
            />
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Search by address"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
            />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="overflow-hidden rounded-3xl bg-white shadow-card">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Store</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Email</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Address</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Avg Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {stores.map((store) => (
                  <tr key={store.id}>
                    <td className="px-6 py-4 text-sm text-slate-800">{store.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{store.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{store.address}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{store.average_rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-slate-200 p-4">
              <p className="text-sm text-slate-500">Showing {stores.length} of {total} stores</p>
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

export default AdminStoresPage;
