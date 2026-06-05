import { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

function UserStoresPage() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('created_at');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState({});

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [storesResponse, ratingsResponse] = await Promise.all([
          api.get('/stores', { params: { search: query, sort, page, limit: 10 } }),
          api.get('/ratings/me'),
        ]);
        setStores(storesResponse.data.data);
        setTotal(storesResponse.data.total);
        setRatings(ratingsResponse.data.data);
        const map = {};
        ratingsResponse.data.data.forEach((item) => {
          map[item.store_id] = item.rating;
        });
        setSelectedRating(map);
      } catch (error) {
        toast.error(error.message || 'Unable to load stores');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [query, sort, page]);

  const pages = useMemo(() => Math.max(1, Math.ceil(total / 10)), [total]);

  const handleRating = async (storeId, value) => {
    try {
      const existing = ratings.find((rating) => rating.store_id === storeId);
      if (existing) {
        await api.put(`/ratings/${existing.id}`, { store_id: storeId, rating: value });
        toast.success('Rating updated');
      } else {
        await api.post('/ratings', { store_id: storeId, rating: value });
        toast.success('Rating submitted');
      }
      setSelectedRating((prev) => ({ ...prev, [storeId]: value }));
    } catch (error) {
      toast.error(error.message || 'Unable to submit rating');
    }
  };

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Stores</h1>
            <p className="mt-2 text-slate-600">Search by name, sort by date, and submit a rating.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by store name"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
            />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
            >
              <option value="created_at">Newest</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-6">
            {stores.map((store) => (
              <div key={store.id} className="rounded-3xl bg-white p-6 shadow-card">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{store.name}</h2>
                    <p className="mt-2 text-slate-600">{store.address}</p>
                    <p className="mt-2 text-sm text-slate-500">Average Rating: {store.average_rating || 'No ratings yet'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-500">Your rating</p>
                    <div className="mt-2 flex items-center justify-end gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => handleRating(store.id, star)}
                          className={
                            `text-xl ${selectedRating[store.id] >= star ? 'text-amber-400' : 'text-slate-300'} transition hover:text-amber-500`
                          }
                        >
                          <FaStar />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-card">
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

export default UserStoresPage;
