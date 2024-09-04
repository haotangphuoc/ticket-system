import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import organizationRoutes from './routes/organizationRoutes';
import ticketRoutes from './routes/ticketRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use('/api/organizations', organizationRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
