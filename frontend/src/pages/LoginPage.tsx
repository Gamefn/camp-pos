import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError('Login failed. Please check your credentials.');
      return;
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('userName', data.user.name);
    localStorage.setItem('userRole', data.user.role);
    navigate('/pos');
  };

  const handleDemoLogin = async () => {
    setEmail('admin@campcanteen.com');
    setPassword('password123');
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@campcanteen.com', password: 'password123' }),
    });

    if (!response.ok) {
      setError('Demo login failed.');
      return;
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('userName', data.user.name);
    localStorage.setItem('userRole', data.user.role);
    navigate('/pos');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] shadow-2xl md:grid md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-between bg-gradient-to-br from-emerald-600 to-cyan-700 p-8 sm:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-100">Camp Canteen POS</p>
            <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">Fast, reliable food service for camps and schools.</h1>
            <p className="mt-4 text-sm text-emerald-50/90 sm:text-base">Run checkout, camper accounts, inventory, and kitchen workflows from one secure system.</p>
          </div>
          <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-emerald-50/90">
            <div className="font-semibold">Quick demo access</div>
            <div className="mt-2">Tap the demo button to sign in instantly.</div>
          </div>
        </div>
        <div className="bg-white p-8 text-slate-900 sm:p-10">
          <h2 className="text-2xl font-semibold">Sign in</h2>
          <p className="mt-2 text-sm text-slate-500">Access the staff checkout and camper tools.</p>
          <button onClick={handleDemoLogin} className="mt-6 w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white">Demo Login</button>
          <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            <span>or use your credentials</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500" placeholder="staff@camp.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input type="password" className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error ? <div className="text-sm text-red-600">{error}</div> : null}
            <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white">Log in</button>
            <div className="text-center text-sm text-slate-500">
              <button type="button" className="font-medium text-emerald-600">Forgot password?</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
