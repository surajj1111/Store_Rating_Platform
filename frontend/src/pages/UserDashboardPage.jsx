import { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import { toast } from 'react-toastify';

function UserDashboardPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const { data } = await api.get('/stores', { params: { page: 1, limit: 5 } });
        setStores(data.data);
      } catch (error) {
        toast.error(error.message || 'Unable to load stores');
      } finally {
        setLoading(false);
      }
    };
    loadStores();
  }, []);

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-900">Your Stores</h1>
          <p className="mt-2 text-slate-600">Browse stores and submit your own rating.</p>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {stores.map((store) => (
              <div key={store.id} className="rounded-3xl bg-white p-6 shadow-card">
                <h2 className="text-xl font-semibold text-slate-900">{store.name}</h2>
                <p className="mt-2 text-slate-600">{store.address}</p>
                <p className="mt-4 text-slate-500">Average Rating: {store.average_rating || 'No ratings yet'}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default UserDashboardPage;
