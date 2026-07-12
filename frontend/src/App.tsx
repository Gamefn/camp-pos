import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const PosPage = lazy(() => import('./pages/PosPage'));
const CampersPage = lazy(() => import('./pages/CampersPage'));
const InventoryPage = lazy(() => import('./pages/InventoryPage'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const KitchenPage = lazy(() => import('./pages/KitchenPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const ParentPortalPage = lazy(() => import('./pages/ParentPortalPage'));
const LogsPage = lazy(() => import('./pages/LogsPage'));

function App() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-700">Loading page…</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/pos" replace />} />
        <Route path="/pos" element={<ProtectedRoute><PosPage /></ProtectedRoute>} />
        <Route path="/campers" element={<ProtectedRoute><CampersPage /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute><InventoryPage /></ProtectedRoute>} />
        <Route path="/menu" element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
        <Route path="/kitchen" element={<ProtectedRoute><KitchenPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
        <Route path="/logs" element={<ProtectedRoute><LogsPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/parent-portal" element={<ProtectedRoute><ParentPortalPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
