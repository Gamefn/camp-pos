import { useEffect, useState } from 'react';
import { Receipt } from 'lucide-react';

interface TransactionLog {
  id: string;
  camperName: string | null;
  camperId: string | null;
  paymentMethod: string;
  amount: number;
  items: Array<{ name: string; quantity: number; price: number }>;
  createdAt: string;
  previousBalance: number | null;
  newBalance: number | null;
  balanceDelta: number | null;
}

function LogsPage() {
  const [logs, setLogs] = useState<TransactionLog[]>([]);

  useEffect(() => {
    fetch('/api/transactions/logs').then((res) => res.json()).then(setLogs);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Transaction Logs</p>
            <h1 className="text-2xl font-semibold">Recent camp canteen activity</h1>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">Live activity feed</div>
        </div>
        <div className="mt-8 space-y-3">
          {logs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">No sales have been recorded yet.</div>
          ) : logs.map((log) => (
            <div key={log.id} className="rounded-3xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="text-emerald-600" size={18} />
                  <div>
                    <div className="font-semibold">{log.camperName ?? 'Walk-in sale'}</div>
                    <div className="text-sm text-slate-500">{log.camperId ? `Camper ${log.camperId}` : 'No camper account'} • {log.paymentMethod}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${log.amount.toFixed(2)}</div>
                  <div className="text-sm text-slate-500">{new Date(log.createdAt).toLocaleString()}</div>
                  {log.paymentMethod === 'Camp Credit' ? (
                    <div className="mt-1 text-xs text-slate-500">
                      Before: ${log.previousBalance?.toFixed(2) ?? '—'} • After: ${log.newBalance?.toFixed(2) ?? '—'}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {log.items.map((item) => (
                  <span key={`${log.id}-${item.name}`} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{item.name} × {item.quantity}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogsPage;
