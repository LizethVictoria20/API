import express from 'express';
import getOsitos from './routes/osito.routes.js';
import indexRoutes from './routes/index.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
app.use(express.json())

app.use(indexRoutes);
app.use('/api', getOsitos);

app.use('/api', authRoutes);

// Decir a express que los request los reciba en formato JSON
app.use(express.json());
console.log('working')

app.listen(4802);