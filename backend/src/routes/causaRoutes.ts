import { Router } from 'express'
import { buscarCausas, crearCausa, eliminarCausa } from '../controllers/causaControllers'

const router = Router()

router.get('/buscar', buscarCausas)
router.post('/', crearCausa)
router.delete('/:id', eliminarCausa)

export default router