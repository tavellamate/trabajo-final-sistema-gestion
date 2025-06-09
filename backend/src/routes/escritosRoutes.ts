import { Router } from 'express'
import multer from 'multer'
import {
  crearEscritoConArchivo,
  listarEscritosPorExpediente,
  obtenerEscritoPorId,
  actualizarEscrito,
  eliminarEscrito
} from '../controllers/escritosController'
// import { autenticarToken } from '../middleware/authMiddleware'

const router = Router()
const upload = multer({ dest: 'uploads/' })

router.post(
  '/expedientes/:id/escritos',
  // autenticarToken,
  upload.single('archivo'),
  crearEscritoConArchivo
)

// Listar todos los escritos de un expediente
router.get(
  '/expedientes/:id/escritos',
  // autenticarToken,
  listarEscritosPorExpediente
)

// Obtener un escrito por su ID
router.get(
  '/escritos/:escritoId',
  // autenticarToken,
  obtenerEscritoPorId
)

// Actualizar un escrito
router.put(
  '/escritos/:escritoId',
  // autenticarToken,
  actualizarEscrito
)

// Eliminar un escrito
router.delete(
  '/escritos/:escritoId',
  // autenticarToken,
  eliminarEscrito
)

export default router
