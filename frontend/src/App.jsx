import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminUserDetailsPage from './pages/AdminUserDetailsPage';
import AdminStoresPage from './pages/AdminStoresPage';
import AdminAddUserPage from './pages/AdminAddUserPage';
import AdminAddStorePage from './pages/AdminAddStorePage';
import UserDashboardPage from './pages/UserDashboardPage';
import UserStoresPage from './pages/UserStoresPage';
import UserChangePasswordPage from './pages/UserChangePasswordPage';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import OwnerRatingsPage from './pages/OwnerRatingsPage';
import OwnerChangePasswordPage from './pages/OwnerChangePasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Routes>
        <Route path="/" element={<Navigate to={user ? `/${user.role}/dashboard` : '/login'} replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin"]}><AdminUsersPage /></ProtectedRoute>} />
        <Route path="/admin/users/:id" element={<ProtectedRoute allowedRoles={["admin"]}><AdminUserDetailsPage /></ProtectedRoute>} />
        <Route path="/admin/stores" element={<ProtectedRoute allowedRoles={["admin"]}><AdminStoresPage /></ProtectedRoute>} />
        <Route path="/admin/add-user" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAddUserPage /></ProtectedRoute>} />
        <Route path="/admin/add-store" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAddStorePage /></ProtectedRoute>} />

        <Route path="/user/dashboard" element={<ProtectedRoute allowedRoles={["user"]}><UserDashboardPage /></ProtectedRoute>} />
        <Route path="/user/stores" element={<ProtectedRoute allowedRoles={["user"]}><UserStoresPage /></ProtectedRoute>} />
        <Route path="/user/change-password" element={<ProtectedRoute allowedRoles={["user"]}><UserChangePasswordPage /></ProtectedRoute>} />

        <Route path="/owner/dashboard" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerDashboardPage /></ProtectedRoute>} />
        <Route path="/owner/ratings" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerRatingsPage /></ProtectedRoute>} />
        <Route path="/owner/change-password" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerChangePasswordPage /></ProtectedRoute>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

export default App;
