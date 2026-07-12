import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

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
        <Route path="/pos" element={<ProtectedRoute><Layout><PosPage /></Layout></ProtectedRoute>} />
        <Route path="/campers" element={<ProtectedRoute><Layout><CampersPage /></Layout></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute><Layout><InventoryPage /></Layout></ProtectedRoute>} />
        <Route path="/menu" element={<ProtectedRoute><Layout><MenuPage /></Layout></ProtectedRoute>} />
        <Route path="/kitchen" element={<ProtectedRoute><Layout><KitchenPage /></Layout></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Layout><ReportsPage /></Layout></ProtectedRoute>} />
        <Route path="/logs" element={<ProtectedRoute><Layout><LogsPage /></Layout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Layout><SettingsPage /></Layout></ProtectedRoute>} />
        <Route path="/parent-portal" element={<ProtectedRoute><Layout><ParentPortalPage /></Layout></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
