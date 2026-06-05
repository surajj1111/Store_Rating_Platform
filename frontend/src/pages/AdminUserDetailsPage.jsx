import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import { toast } from 'react-toastify';

function AdminUserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await api.get(`/users/${id}`);
        setUser(data.data);
      } catch (error) {
        toast.error(error.message || 'Unable to load user details');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id]);

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-900">User Details</h1>
          <p className="mt-2 text-slate-600">Review the profile and assigned role for this user.</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : user ? (
          <div className="rounded-3xl bg-white p-8 shadow-card">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-slate-500">Name</h2>
                <p className="mt-2 text-xl font-semibold text-slate-900">{user.name}</p>
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-slate-500">Email</h2>
                <p className="mt-2 text-xl font-semibold text-slate-900">{user.email}</p>
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-slate-500">Role</h2>
                <p className="mt-2 text-xl font-semibold text-slate-900">{user.role}</p>
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-slate-500">Address</h2>
                <p className="mt-2 text-lg text-slate-700">{user.address || 'Not provided'}</p>
              </div>
            </div>
            {user.role === 'owner' && (
              <div className="mt-8 rounded-3xl bg-slate-50 p-6">
                <h3 className="text-sm uppercase tracking-[0.2em] text-slate-500">Owner Info</h3>
                <p className="mt-4 text-slate-700">Store owners can manage store ratings and review rating history from their dashboard.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-8 shadow-card">No user found.</div>
        )}
      </main>
    </div>
  );
}

export default AdminUserDetailsPage;
