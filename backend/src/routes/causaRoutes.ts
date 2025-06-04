import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/buscar', async (req, res) => {
  const { tipo, cliente, palabra } = req.query
  const causas = await prisma.causa.findMany({
    where: {
      AND: [
        tipo ? { tipo: { contains: String(tipo), mode: 'insensitive' } } : {},
        cliente ? { cliente: { contains: String(cliente), mode: 'insensitive' } } : {},
        palabra ? { resumen: { contains: String(palabra), mode: 'insensitive' } } : {},
      ]
    }
  })
  res.json(causas)
})

export default router