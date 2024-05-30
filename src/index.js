import express from 'express';
import getOsitos from './routes/osito.routes.js';
import authRoutes from './routes/auth.routes.js';
import { authenticateToken } from './middleware/auth.jwt.js';

const app = express();
app.use(express.json())

app.use('/api', getOsitos);

app.use('/api', authRoutes);

app.get('/protected', authenticateToken, (req, res) => {
    res.send('This is a protected route');
});

// Decir a express que los request los reciba en formato JSON
app.use(express.json());

app.listen(3000);