import express from 'express';
import dotenv from 'dotenv';
import dbService from './config/db.js';
import organizationRoutes from './routes/organizationRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authenticationRoutes from './routes/authenticationRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';
import path from 'path';

dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

dbService.connectDB();

app.use('/api/organizations', organizationRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);
app.use('/api/authentication', authenticationRoutes);

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});


app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
