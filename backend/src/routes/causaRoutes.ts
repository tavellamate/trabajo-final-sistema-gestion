import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// 🔐 Buscar causas (requiere token)
router.get('/buscar', verifyToken, async (req: Request, res: Response) => {
  const { tipo, cliente, palabra } = req.query;

  try {
    const causas = await prisma.causa.findMany({
      where: {
        AND: [
          tipo ? { tipo: { contains: String(tipo), mode: 'insensitive' } } : {},
          cliente ? { cliente: { contains: String(cliente), mode: 'insensitive' } } : {},
          palabra ? { resumen: { contains: String(palabra), mode: 'insensitive' } } : {},
        ],
      },
    });

    res.json(causas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar causas', detalle: error });
  }
});

// 🔐 Crear causa (requiere token)
router.post('/', verifyToken, async (req: Request, res: Response) => {
  const { tipo, cliente, resumen } = req.body;

  try {
    const causa = await prisma.causa.create({
      data: { tipo, cliente, resumen },
    });

    res.status(201).json(causa);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'No se pudo crear la causa', detalle: error });
  }
});

// 🔐 Eliminar causa (requiere token)
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.causa.delete({ where: { id } });
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'No se pudo eliminar la causa' });
  }
});

export default router;