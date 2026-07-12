# Camp Canteen POS

A production-ready camp canteen point-of-sale system with role-based authentication, POS workflow, camper accounts, inventory, menu management, kitchen display, reporting, and parent portal functionality.

## Features
- Super Admin, Camp Director, Canteen Manager, Cashier, Kitchen Staff, Inventory Manager, and Parent/Guardian access
- Secure login and role-based routes
- Touch-friendly POS checkout with product search and payment methods
- Camper account management with balances and spending limits
- Inventory management, low-stock alerts, purchase orders, waste tracking
- Menu scheduling, seasonal menus, and availability controls
- Kitchen display with live order status updates
- Reporting dashboard with CSV/PDF-ready data views
- Parent portal and notifications

## Quick start
1. Install dependencies: npm install
2. Start backend: npm run dev --workspace backend
3. Start frontend: npm run dev --workspace frontend
4. Open http://localhost:5173

## Deployment
- Configure environment variables in backend/.env
- Build with npm run build
- Deploy backend and frontend separately or via Docker
