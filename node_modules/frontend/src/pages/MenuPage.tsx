import { CalendarDays, Clock3, UtensilsCrossed } from 'lucide-react';

const menuItems = [
  { name: 'Hamburger Meal', category: 'Lunch', price: 8.5, available: true },
  { name: 'Veggie Wrap', category: 'Lunch', price: 7.25, available: true },
  { name: 'Fruit Cup', category: 'Snacks', price: 2.5, available: false },
  { name: 'Breakfast Burrito', category: 'Breakfast', price: 5.75, available: true },
];

function MenuPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Menu Management</p>
            <h1 className="text-2xl font-semibold">Create meals, combos, and seasonal menus</h1>
          </div>
          <button className="rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white">New Product</button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {menuItems.map((item) => (
            <div key={item.name} className="rounded-3xl border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-slate-500">{item.category}</p>
                </div>
                <div className={`rounded-full px-3 py-1 text-sm font-medium ${item.available ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{item.available ? 'Available' : 'Disabled'}</div>
              </div>
              <div className="mt-5 flex items-center gap-3 text-sm text-slate-500">
                <span className="flex items-center gap-1"><CalendarDays size={16} /> Seasonal</span>
                <span className="flex items-center gap-1"><Clock3 size={16} /> Lunch</span>
                <span className="flex items-center gap-1"><UtensilsCrossed size={16} /> Combo-ready</span>
              </div>
              <div className="mt-5 text-lg font-semibold">${item.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
