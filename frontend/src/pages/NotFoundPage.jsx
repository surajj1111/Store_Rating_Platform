import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="rounded-3xl bg-white p-12 text-center shadow-card">
        <h1 className="text-5xl font-bold text-slate-900">404</h1>
        <p className="mt-4 text-lg text-slate-600">Page not found.</p>
        <Link to="/" className="mt-8 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-white hover:bg-slate-800">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
