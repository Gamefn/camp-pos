import { useEffect, useState } from 'react';
import { Search, Plus, Minus, Receipt, CircleDollarSign, UserCircle2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface Camper {
  id: string;
  name: string;
  camperId: string;
  cabin: string;
  balance: number;
  spendingLimit: number;
}

interface CartItem extends Product {
  quantity: number;
}

const menuTabs = ['All', 'Hot Food', 'Snacks', 'Ice Cream'] as const;

type MenuTab = (typeof menuTabs)[number];

function PosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<MenuTab>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [campers, setCampers] = useState<Camper[]>([]);
  const [buyerQuery, setBuyerQuery] = useState('');
  const [selectedCamper, setSelectedCamper] = useState<Camper | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'Camp Credit' | 'Cash'>('Camp Credit');
  const [creditAmount, setCreditAmount] = useState('0');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products').then((res) => res.json()).then(setProducts);
    fetch('/api/campers').then((res) => res.json()).then(setCampers);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    setCreditAmount(subtotal.toFixed(2));
  }, [subtotal]);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((current) => current.flatMap((item) => item.id === id ? (item.quantity + delta > 0 ? [{ ...item, quantity: item.quantity + delta }] : []) : [item]));
  };

  const filteredCampers = campers.filter((camper) => {
    const haystack = `${camper.name} ${camper.camperId} ${camper.cabin}`.toLowerCase();
    return haystack.includes(buyerQuery.toLowerCase());
  });

  const visibleProducts = products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    const matchesTab = activeTab === 'All' || product.category === activeTab;
    return matchesQuery && matchesTab;
  });

  const resetSale = () => {
    setCart([]);
    setBuyerQuery('');
    setSelectedCamper(null);
    setCreditAmount('0');
    setFeedback(null);
    setActiveTab('All');
    setQuery('');
  };

  const handleCompleteOrder = async () => {
    if (cart.length === 0) {
      setFeedback('Add at least one item to the order.');
      return;
    }

    if (!selectedCamper && paymentMethod === 'Camp Credit') {
      setFeedback('Select a camper buyer first.');
      return;
    }

    const amount = Number(creditAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setFeedback('Enter a valid charge amount.');
      return;
    }

    if (paymentMethod === 'Camp Credit' && selectedCamper && amount > selectedCamper.balance) {
      setFeedback(`This camper only has $${selectedCamper.balance.toFixed(2)} available.`);
      return;
    }

    try {
      const body = {
        camperId: selectedCamper?.id ?? null,
        camperName: selectedCamper?.name ?? null,
        paymentMethod,
        amount: Number(subtotal.toFixed(2)),
        items: cart.map((item) => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
      };

      await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      setFeedback(`Order completed for ${selectedCamper?.name ?? 'walk-in customer'} using ${paymentMethod}.`);
      resetSale();
    } catch {
      setFeedback('The sale could not be recorded.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 lg:p-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white shadow-sm overflow-hidden">
        <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">POS Checkout</p>
                <h1 className="text-2xl font-semibold">Camp credit order flow</h1>
              </div>
              <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">Camp credit only</div>
            </div>
            <div className="mt-6 flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Search size={18} className="text-slate-400" />
              <input className="ml-3 w-full bg-transparent outline-none" placeholder="Search products or scan barcode" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {menuTabs.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full px-3 py-2 text-sm font-medium ${activeTab === tab ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {tab === 'All' ? 'All Items' : tab}
                </button>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product) => (
                <button key={product.id} onClick={() => addToCart(product)} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-emerald-400 hover:bg-emerald-50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{product.name}</h3>
                    <Plus size={18} className="text-emerald-600" />
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{product.category}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-slate-500">{product.stock} in stock</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="border-l border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Current Order</h2>
              <div className="rounded-2xl bg-white p-2 text-slate-600"><Receipt size={18} /></div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <UserCircle2 size={18} className="text-emerald-600" />
                <h3 className="font-semibold">Buyer</h3>
              </div>
              <input
                className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                placeholder="Search camper or account"
                value={buyerQuery}
                onChange={(e) => setBuyerQuery(e.target.value)}
              />
              {selectedCamper ? (
                <div className="mt-3 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-800">
                  <div className="font-semibold">{selectedCamper.name}</div>
                  <div>Camp ID: {selectedCamper.camperId}</div>
                  <div>Balance: ${selectedCamper.balance.toFixed(2)} • Limit: ${selectedCamper.spendingLimit.toFixed(2)}</div>
                </div>
              ) : null}
              {buyerQuery ? (
                <div className="mt-3 space-y-2">
                  {filteredCampers.length > 0 ? filteredCampers.map((camper) => (
                    <button key={camper.id} onClick={() => { setSelectedCamper(camper); setBuyerQuery(camper.name); setFeedback(null); }} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-3 py-2 text-left text-sm hover:border-emerald-400">
                      <span>{camper.name}</span>
                      <span className="text-slate-500">{camper.camperId}</span>
                    </button>
                  )) : <div className="text-sm text-slate-500">No campers found.</div>}
                </div>
              ) : null}
            </div>

            <div className="mt-4 space-y-3">
              {cart.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">No items yet. Tap a product to begin.</div> : cart.map((item) => (
                <div key={item.id} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-slate-500">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="rounded-full bg-slate-100 p-2"><Minus size={14} /></button>
                      <span className="w-6 text-center font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="rounded-full bg-slate-100 p-2"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-white p-4">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="mt-3 border-t border-slate-200 pt-3 text-lg font-semibold">Total ${subtotal.toFixed(2)}</div>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <CircleDollarSign size={18} className="text-emerald-600" />
                <h3 className="font-semibold">Payment</h3>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(['Camp Credit', 'Cash'] as const).map((method) => (
                  <button key={method} onClick={() => { setPaymentMethod(method); setFeedback(null); }} className={`rounded-2xl border px-3 py-2 text-sm font-medium ${paymentMethod === method ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-600'}`}>
                    {method}
                  </button>
                ))}
              </div>
              <label className="mt-3 block text-sm font-medium text-slate-600">Charge amount</label>
              <input type="number" min="0" step="0.01" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" value={creditAmount} onChange={(e) => setCreditAmount(e.target.value)} />
              <p className="mt-2 text-xs text-slate-500">For camp credit, this amount is charged to the camper balance. For cash, it records the sale without touching the balance.</p>
            </div>
            {feedback ? <div className="mt-4 rounded-2xl bg-amber-50 p-3 text-sm text-amber-800">{feedback}</div> : null}
            <button onClick={handleCompleteOrder} className="mt-6 w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white">Complete Sale</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PosPage;
