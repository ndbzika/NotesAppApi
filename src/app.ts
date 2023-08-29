import express from 'express';
import userRoutes from './routes/userRoutes';
import notesRoutes from './routes/notesRoutes';
import loginRoutes from './routes/authRoutes';

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const ApiVerison = '/api/v1';

app.use(`${ApiVerison}/users/`, userRoutes);
app.use(`${ApiVerison}/notes/`, notesRoutes);
app.use(`${ApiVerison}/`, loginRoutes);

export default app;
