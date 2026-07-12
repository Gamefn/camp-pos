import { useMemo } from 'react';

const orders = [
  { id: 'A102', item: 'Hamburger Meal', status: 'New', timer: '1m' },
  { id: 'A103', item: 'Chicken Wrap', status: 'Preparing', timer: '4m' },
  { id: 'A104', item: 'Smoothie', status: 'Ready', timer: '0m' },
];

function KitchenPage() {
  const statusColor = useMemo(() => ({
    New: 'bg-amber-50 text-amber-700',
    Preparing: 'bg-blue-50 text-blue-700',
    Ready: 'bg-emerald-50 text-emerald-700',
  }), []);

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Kitchen Display</p>
              <h1 className="text-2xl font-semibold">Live order station</h1>
            </div>
            <div className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">Audio alerts enabled</div>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {orders.map((order) => (
              <div key={order.id} className="rounded-3xl border border-slate-800 bg-slate-800 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Order {order.id}</p>
                    <h2 className="mt-1 text-xl font-semibold">{order.item}</h2>
                  </div>
                  <div className={`rounded-full px-3 py-1 text-sm font-medium ${statusColor[order.status as keyof typeof statusColor]}`}>{order.status}</div>
                </div>
                <div className="mt-6 text-sm text-slate-400">Elapsed time: {order.timer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KitchenPage;
