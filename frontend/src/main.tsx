import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';

const App = lazy(() => import('./App'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-700">Loading app…</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
