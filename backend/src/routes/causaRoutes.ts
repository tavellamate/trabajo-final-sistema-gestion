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

router.post('/', async (req, res) => {
  const { tipo, cliente, resumen } = req.body
  try {
    const causa = await prisma.causa.create({
      data: { tipo, cliente, resumen }
    })
    res.status(201).json(causa)
  } catch (error) {
    console.error(error) // <--- agrega esto para ver el error en la consola
    res.status(400).json({ error: 'No se pudo crear la causa', detalle: error })
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.causa.delete({ where: { id } });
    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({ error: 'No se pudo eliminar la causa' });
  }
});

export default router