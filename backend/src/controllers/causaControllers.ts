import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Buscar causas
export const buscarCausas = async (req: Request, res: Response) => {
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
}

// Crear causa
export const crearCausa = async (req: Request, res: Response) => {
  const { tipo, cliente, resumen } = req.body
  try {
    const causa = await prisma.causa.create({
      data: { tipo, cliente, resumen }
    })
    res.status(201).json(causa)
  } catch (error) {
    res.status(400).json({ error: 'No se pudo crear la causa', detalle: error })
  }
}

// Eliminar causa
export const eliminarCausa = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    await prisma.causa.delete({ where: { id } })
    res.json({ ok: true })
  } catch (error) {
    res.status(400).json({ error: 'No se pudo eliminar la causa' })
  }
}