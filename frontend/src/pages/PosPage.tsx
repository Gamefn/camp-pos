import { useEffect, useState } from 'react';
import { Search, Plus, Minus, Receipt, CreditCard, Banknote, CircleDollarSign } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

function PosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  useEffect(() => {
    fetch('/api/products').then((res) => res.json()).then(setProducts);
  }, []);

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

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-100 p-4 lg:p-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white shadow-sm overflow-hidden">
        <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">POS Checkout</p>
                <h1 className="text-2xl font-semibold">Touch-friendly order entry</h1>
              </div>
              <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">Busy lunch rush</div>
            </div>
            <div className="mt-6 flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Search size={18} className="text-slate-400" />
              <input className="ml-3 w-full bg-transparent outline-none" placeholder="Search products or scan barcode" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())).map((product) => (
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
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {['Cash', 'Card', 'Camp Credit'].map((method) => (
                <button key={method} onClick={() => setPaymentMethod(method)} className={`rounded-2xl border px-3 py-3 text-sm font-medium ${paymentMethod === method ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-600'}`}>
                  {method === 'Cash' ? <Banknote className="mx-auto mb-1" size={16} /> : method === 'Card' ? <CreditCard className="mx-auto mb-1" size={16} /> : <CircleDollarSign className="mx-auto mb-1" size={16} />}
                  {method}
                </button>
              ))}
            </div>
            <button className="mt-6 w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white">Complete Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PosPage;
