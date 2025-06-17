// escritosRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import {
  crearEscritoConArchivo,
  listarEscritosPorExpediente,
  obtenerEscritoPorId,
  actualizarEscrito,
  eliminarEscrito,
} from '../controllers/escritosController';
import { verifyToken as autenticarToken } from '../middleware/authMiddleware';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Ignoramos verificación de tipos estricta de Express
router.post(
  '/expedientes/:id/escritos',
  autenticarToken,
  upload.single('archivo'),
  crearEscritoConArchivo as any
);

router.get(
  '/expedientes/:id/escritos',
  autenticarToken,
  listarEscritosPorExpediente as any
);

router.get(
  '/escritos/:escritoId',
  autenticarToken,
  obtenerEscritoPorId as any
);

router.put(
  '/escritos/:escritoId',
  autenticarToken,
  actualizarEscrito as any
);

router.delete(
  '/escritos/:escritoId',
  autenticarToken,
  eliminarEscrito as any
);

export default router;