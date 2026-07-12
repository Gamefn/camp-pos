import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routeHandler from './routes.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(helmet());
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', routeHandler);

app.listen(PORT, () => {
  console.log(`Camp Canteen POS API listening on port ${PORT}`);
});
