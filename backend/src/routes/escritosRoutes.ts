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

// 📥 Crear escrito con archivo
router.post(
  '/:expedienteId/escritos',
  autenticarToken,
  upload.single('archivo'),
  crearEscritoConArchivo as any
);

// 📄 Obtener escritos por expediente
router.get(
  '/:expedienteId/escritos',
  autenticarToken,
  listarEscritosPorExpediente as any
);

// 🔎 Obtener un escrito puntual
router.get(
  '/escritos/:escritoId',
  autenticarToken,
  obtenerEscritoPorId as any
);

// ✏️ Actualizar escrito
router.put(
  '/escritos/:escritoId',
  autenticarToken,
  actualizarEscrito as any
);

// 🗑️ Eliminar escrito
router.delete(
  '/escritos/:escritoId',
  autenticarToken,
  eliminarEscrito as any
);

export default router;