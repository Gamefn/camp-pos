import { useEffect, useState } from 'react';
import { ArrowRight, Boxes, CreditCard, DollarSign, UtensilsCrossed } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [summary, setSummary] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('/api/dashboard/summary', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setSummary);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between rounded-3xl bg-slate-900 p-8 text-white">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Operations Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold">Camp Canteen Control Center</h1>
            <p className="mt-3 max-w-2xl text-slate-300">Monitor sales, camper balances, inventory, and kitchen operations in real time.</p>
          </div>
          <Link to="/pos" className="rounded-2xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950">Launch POS</Link>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { title: 'Revenue', value: summary ? `$${summary.revenue.toLocaleString()}` : '--', icon: DollarSign },
            { title: 'Orders', value: summary ? summary.orders.toLocaleString() : '--', icon: CreditCard },
            { title: 'Campers', value: summary ? summary.campers.toLocaleString() : '--', icon: UtensilsCrossed },
            { title: 'Inventory Alerts', value: summary ? summary.inventoryAlerts.toString() : '--', icon: Boxes },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{card.title}</p>
                    <p className="mt-2 text-2xl font-semibold">{card.value}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                    <Icon size={18} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              <span className="text-sm text-slate-500">Touch-friendly controls</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ['POS Checkout', '/pos'],
                ['Camper Accounts', '/campers'],
                ['Inventory', '/inventory'],
                ['Menu Management', '/menu'],
                ['Kitchen Display', '/kitchen'],
                ['Reports', '/reports'],
                ['Transaction Logs', '/logs'],
              ].map(([label, href]) => (
                <Link key={label} to={href} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-medium text-slate-700">
                  <span>{label}</span>
                  <ArrowRight size={16} />
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Today at a glance</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• 14 low-stock items need attention</li>
              <li>• 3 camper balances are below daily limits</li>
              <li>• 2 meal periods are scheduled for today</li>
              <li>• Kitchen queue: 8 orders in progress</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
