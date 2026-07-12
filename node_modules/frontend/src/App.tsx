import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PosPage from './pages/PosPage';
import CampersPage from './pages/CampersPage';
import InventoryPage from './pages/InventoryPage';
import MenuPage from './pages/MenuPage';
import KitchenPage from './pages/KitchenPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ParentPortalPage from './pages/ParentPortalPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<DashboardPage />} />
      <Route path="/pos" element={<PosPage />} />
      <Route path="/campers" element={<CampersPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/kitchen" element={<KitchenPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/parent-portal" element={<ParentPortalPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
