import { useEffect, useState } from 'react';

interface Camper {
  id: string;
  name: string;
  camperId: string;
  cabin: string;
  balance: number;
  spendingLimit: number;
}

function CampersPage() {
  const [campers, setCampers] = useState<Camper[]>([]);

  useEffect(() => {
    fetch('/api/campers').then((res) => res.json()).then(setCampers);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Camper Accounts</p>
            <h1 className="text-2xl font-semibold">Manage camper balances and spending controls</h1>
          </div>
          <button className="rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white">Add Camper</button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {campers.map((camper) => (
            <div key={camper.id} className="rounded-3xl border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{camper.name}</h2>
                  <p className="text-sm text-slate-500">{camper.camperId} • Cabin {camper.cabin}</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">Balance ${camper.balance.toFixed(2)}</div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-slate-500">Daily limit</p>
                  <p className="mt-1 font-semibold">${camper.spendingLimit.toFixed(2)}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-slate-500">Purchase history</p>
                  <p className="mt-1 font-semibold">12 entries</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CampersPage;
