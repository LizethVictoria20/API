import express from 'express';
import ositoRoutes from './routes/characters.routes.js';
import indexRoutes from './routes/index.routes.js';

import authRoutes from './routes/auth.routes.js';

const app = express();
app.use(express.json())

app.use(indexRoutes);
app.use('/api', ositoRoutes);

app.use('/api', authRoutes);

// Decir a express que los request los reciba en formato JSON
app.use(express.json());

app.listen(3000);