import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
export function signToken(user) {
    return jwt.sign({ sub: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '8h' });
}
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}
