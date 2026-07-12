import { BarChart3, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

function ReportsPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Reports & Analytics</p>
            <h1 className="text-2xl font-semibold">Daily, weekly, and monthly performance insights</h1>
          </div>
          <div className="flex gap-3">
            <Link to="/logs" className="rounded-2xl border border-slate-200 px-4 py-3 font-semibold text-slate-700">View Logs</Link>
            <button className="rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white">PDF Report</button>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { title: 'Daily Sales', value: '$1,430', detail: '+12% vs yesterday' },
            { title: 'Best Seller', value: 'Hamburger Meal', detail: '82 units sold' },
            { title: 'Inventory Usage', value: '87%', detail: 'Low stock on 4 SKUs' },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{item.title}</h2>
                <BarChart3 className="text-emerald-600" size={18} />
              </div>
              <div className="mt-4 text-2xl font-semibold">{item.value}</div>
              <div className="mt-2 text-sm text-slate-500">{item.detail}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center gap-3 text-sm text-slate-600"><FileText size={18} /> Export-ready reporting module for sales, inventory, waste, cashier performance, and payment methods.</div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
