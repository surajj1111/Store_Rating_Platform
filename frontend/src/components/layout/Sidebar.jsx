import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const adminLinks = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Users', to: '/admin/users' },
  { label: 'Stores', to: '/admin/stores' },
  { label: 'Add User', to: '/admin/add-user' },
  { label: 'Add Store', to: '/admin/add-store' },
];
const userLinks = [
  { label: 'Dashboard', to: '/user/dashboard' },
  { label: 'Stores', to: '/user/stores' },
  { label: 'Change Password', to: '/user/change-password' },
];
const ownerLinks = [
  { label: 'Dashboard', to: '/owner/dashboard' },
  { label: 'Ratings', to: '/owner/ratings' },
  { label: 'Change Password', to: '/owner/change-password' },
];

const Sidebar = ({ className = '' }) => {
  const { user, logout } = useAuth();
  const links = user?.role === 'admin' ? adminLinks : user?.role === 'owner' ? ownerLinks : userLinks;

  return (
    <aside className={`w-full md:w-72 bg-white border-r border-slate-200 ${className}`}>
      <div className="px-6 py-5 border-b border-slate-200">
        <h2 className="text-xl font-semibold">Store Rating</h2>
        <p className="text-sm text-slate-500">{user?.role ? user.role.toUpperCase() : ''}</p>
      </div>
      <nav className="px-4 py-5 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto px-6 py-5 border-t border-slate-200">
        <button
          onClick={logout}
          className="w-full rounded-lg bg-slate-800 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
