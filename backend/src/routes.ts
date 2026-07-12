import { Router } from 'express';
import { signToken, verifyToken } from './auth.js';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { applyTransactionToCampers, type CamperAccount, type TransactionLogEntry, type TransactionPayload } from './transactions.js';

const router = Router();
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

type TransactionRecord = TransactionLogEntry;

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

const MAX_LOG_ENTRIES = 100;
const transactionLogs: TransactionRecord[] = [];
const campers: CamperAccount[] = [
  { id: 'c1', name: 'Test Camper', camperId: 'TEST-001', cabin: 'Demo', balance: 1000, spendingLimit: 1000 },
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
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.json({ revenue: 18450, orders: 248, campers: 64, inventoryAlerts: 4 });
});

router.get('/products', (_req, res) => {
  res.json([
    { id: 'p1', name: 'Hamburger Meal', category: 'Hot Food', price: 8.5, stock: 32 },
    { id: 'p2', name: 'Chicken Wrap', category: 'Hot Food', price: 6.75, stock: 18 },
    { id: 'p3', name: 'Pizza Slice', category: 'Hot Food', price: 4.75, stock: 22 },
    { id: 'p4', name: 'Fruit Cup', category: 'Snacks', price: 2.5, stock: 47 },
    { id: 'p5', name: 'Pretzel', category: 'Snacks', price: 2.25, stock: 34 },
    { id: 'p6', name: 'Ice Cream Cone', category: 'Ice Cream', price: 3.75, stock: 15 },
    { id: 'p7', name: 'Frozen Yogurt', category: 'Ice Cream', price: 4.25, stock: 12 },
  ]);
});

router.get('/campers', (_req, res) => {
  res.json(campers);
});

router.post('/transactions', (req, res) => {
  const parsed = z.object({
    camperId: z.string().nullable(),
    camperName: z.string().nullable(),
    paymentMethod: z.enum(['Camp Credit', 'Cash']),
    amount: z.number().nonnegative(),
    items: z.array(z.object({ id: z.string(), name: z.string(), quantity: z.number().int().positive(), price: z.number().nonnegative() })),
  }).safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid transaction payload' });
  }

  try {
    const payload: TransactionPayload = parsed.data;
    const { logEntry } = applyTransactionToCampers(campers, payload);

    transactionLogs.unshift(logEntry);
    if (transactionLogs.length > MAX_LOG_ENTRIES) {
      transactionLogs.length = MAX_LOG_ENTRIES;
    }
    res.json(logEntry);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to process transaction';
    return res.status(400).json({ message });
  }
});

router.get('/transactions/logs', (_req, res) => {
  res.json(transactionLogs.slice(0, MAX_LOG_ENTRIES));
});

router.get('/reports/sales', (_req, res) => {
  res.json({ daily: 1430, weekly: 8420, monthly: 28420 });
});

export default router;
