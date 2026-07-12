export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface DashboardSummary {
  revenue: number;
  orders: number;
  campers: number;
  inventoryAlerts: number;
}
