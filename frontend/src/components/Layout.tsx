import type { ReactNode } from 'react';
import { ArrowLeft, LogOut, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Staff';
  const userRole = localStorage.getItem('userRole') || 'Cashier';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2">
              <Store size={18} className="text-emerald-600" />
              <div>
                <div className="text-sm font-semibold text-slate-900">Camp Canteen</div>
                <div className="text-xs text-slate-500">POS Demo</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-right">
              <div className="text-sm font-semibold text-slate-900">{userName}</div>
              <div className="text-xs text-slate-500">{userRole}</div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}

export default Layout;
