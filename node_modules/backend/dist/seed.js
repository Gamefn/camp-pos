import bcrypt from 'bcryptjs';
const users = [
    { name: 'Super Admin', email: 'admin@campcanteen.com', password: bcrypt.hashSync('password123', 8), role: 'Super Admin' },
    { name: 'Camp Director', email: 'director@campcanteen.com', password: bcrypt.hashSync('password123', 8), role: 'Camp Director' },
    { name: 'Cashier', email: 'cashier@campcanteen.com', password: bcrypt.hashSync('password123', 8), role: 'Cashier' },
];
console.log(JSON.stringify(users, null, 2));
