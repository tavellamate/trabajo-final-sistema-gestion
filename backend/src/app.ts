import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import escritosRoutes from './routes/escritosRoutes';
import causaRoutes from './routes/causaRoutes';
import carpetaRoutes from './routes/carpetaRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔐 A cada ruta le damos su propio prefijo para que no colisionen
app.use('/api/auth', authRoutes);           // ⬅️ login, register
app.use('/api/escritos', escritosRoutes);   // ⬅️ escritos
app.use('/api/causas', causaRoutes);        // ⬅️ causas
app.use('/api/carpetas', carpetaRoutes);    // ⬅️ carpetas

app.get('/', (_req, res) => {
  res.send('LawTrack API funcionando ✅');
});

export default app;