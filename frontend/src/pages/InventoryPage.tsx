import { Package, AlertTriangle } from 'lucide-react';

const items = [
  { name: 'Buns', stock: 48, supplier: 'Bakery Co', status: 'Healthy' },
  { name: 'Beef Patties', stock: 14, supplier: 'Protein Supply', status: 'Low' },
  { name: 'Cheese', stock: 7, supplier: 'Dairy Direct', status: 'Critical' },
  { name: 'Bottled Water', stock: 64, supplier: 'Fresh Flow', status: 'Healthy' },
];

function InventoryPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Inventory Management</p>
            <h1 className="text-2xl font-semibold">Track stock, purchases, and waste</h1>
          </div>
          <button className="rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white">Receive Inventory</button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.name} className="rounded-3xl border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-slate-100 p-3"><Package size={18} /></div>
                {item.status === 'Low' || item.status === 'Critical' ? <AlertTriangle className="text-amber-500" size={18} /> : null}
              </div>
              <h2 className="mt-4 font-semibold">{item.name}</h2>
              <p className="mt-1 text-sm text-slate-500">Supplier: {item.supplier}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">On hand</span>
                <span className="font-semibold">{item.stock} units</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-slate-500">Status</span>
                <span className={`text-sm font-semibold ${item.status === 'Critical' ? 'text-red-600' : item.status === 'Low' ? 'text-amber-600' : 'text-emerald-600'}`}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
