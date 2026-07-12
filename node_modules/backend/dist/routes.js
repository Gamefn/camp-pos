import { Router } from 'express';
import { signToken, verifyToken } from './auth.js';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
const router = Router();
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
const users = [
    {
        id: '1',
        name: 'Super Admin',
        email: 'admin@campcanteen.com',
        password: bcrypt.hashSync('password123', 8),
        role: 'Super Admin',
    },
    {
        id: '2',
        name: 'Cashier',
        email: 'cashier@campcanteen.com',
        password: bcrypt.hashSync('password123', 8),
        role: 'Cashier',
    },
];
router.get('/health', (_req, res) => {
    res.json({ ok: true, message: 'Camp Canteen POS API is running' });
});
router.post('/auth/login', (req, res) => {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const { email, password } = parse.data;
    const user = users.find((entry) => entry.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = signToken({ id: user.id, name: user.name, email: user.email, role: user.role });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
});
router.get('/dashboard/summary', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        verifyToken(authHeader.replace('Bearer ', ''));
    }
    catch {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ revenue: 18450, orders: 248, campers: 64, inventoryAlerts: 4 });
});
router.get('/products', (_req, res) => {
    res.json([
        { id: 'p1', name: 'Hamburger Meal', category: 'Lunch', price: 8.5, stock: 32 },
        { id: 'p2', name: 'Chicken Wrap', category: 'Lunch', price: 6.75, stock: 18 },
        { id: 'p3', name: 'Fruit Cup', category: 'Snacks', price: 2.5, stock: 47 },
        { id: 'p4', name: 'Smoothie', category: 'Snacks', price: 4.25, stock: 12 },
    ]);
});
router.get('/campers', (_req, res) => {
    res.json([
        { id: 'c1', name: 'Maya Chen', camperId: 'C-1001', cabin: 'Pine', balance: 42.5, spendingLimit: 20 },
        { id: 'c2', name: 'Leo Martinez', camperId: 'C-1002', cabin: 'Cedar', balance: 15.0, spendingLimit: 25 },
    ]);
});
router.get('/reports/sales', (_req, res) => {
    res.json({ daily: 1430, weekly: 8420, monthly: 28420 });
});
export default router;
