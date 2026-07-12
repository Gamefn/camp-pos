import jwt from 'jsonwebtoken';
import type { AuthUser } from './types.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export function signToken(user: AuthUser) {
  return jwt.sign({ sub: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '8h' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { sub: string; role: string; name: string };
}
