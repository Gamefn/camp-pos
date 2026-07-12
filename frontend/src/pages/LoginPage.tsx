import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('admin@campcanteen.com');
  const [password, setPassword] = useState('password123');
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
    navigate('/pos');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">
        <div className="bg-gradient-to-br from-emerald-600 to-cyan-700 p-10 flex flex-col justify-between">
          <div>
            <p className="text-emerald-100 uppercase tracking-[0.3em] text-sm">Camp Canteen POS</p>
            <h1 className="text-4xl font-semibold mt-6">Fast, reliable food service for camps and schools.</h1>
            <p className="mt-4 text-emerald-50/90">Run checkout, camper accounts, inventory, and kitchen workflows from one secure system.</p>
          </div>
          <div className="mt-10 text-sm text-emerald-50/90">
            <div>Demo credentials</div>
            <div className="mt-2">admin@campcanteen.com / password123</div>
          </div>
        </div>
        <div className="bg-white p-10 text-slate-900">
          <h2 className="text-2xl font-semibold">Sign in</h2>
          <p className="text-sm text-slate-500 mt-2">Access the staff dashboard and POS tools.</p>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input type="password" className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error ? <div className="text-sm text-red-600">{error}</div> : null}
            <button className="w-full rounded-xl bg-emerald-600 text-white py-3 font-semibold">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
