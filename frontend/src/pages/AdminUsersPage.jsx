import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import { toast } from 'react-toastify';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/admin/users', { params: { search: query, page, limit: 10 } });
        setUsers(data.data || []);
        setTotal(data.total || 0);
      } catch (error) {
        toast.error(error.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [query, page]);

  const pages = Math.max(1, Math.ceil(total / 10));

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">User Management</h1>
            <p className="mt-2 text-slate-600">Browse all registered users and their roles.</p>
          </div>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search users..."
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
          />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="overflow-hidden rounded-3xl bg-white shadow-card">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Email</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Role</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 text-sm text-slate-800">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{user.role}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      <Link className="text-slate-700 hover:text-slate-900" to={`/admin/users/${user.id}`}>
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-slate-200 p-4">
              <p className="text-sm text-slate-500">Showing {users.length} of {total} users</p>
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

export default AdminUsersPage;
