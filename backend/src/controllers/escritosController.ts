import { Request, Response } from 'express'
import prisma from '../client'

declare global {
  namespace Express {
    interface Request {
      usuario?: any
    }
  }
}

// Crear escrito con archivo 
export const crearEscritoConArchivo = async (req: Request, res: Response) => {
  try {
    const expedienteId = Number(req.params.id)
    const { titulo, descripcion } = req.body
    const archivo = req.file

    if (!archivo) {
      res.status(400).json({ mensaje: 'Debe adjuntar un archivo PDF.' })
      return
    }

    const creadoPorId = req.usuario?.id || 1 //  1 para pruebas

    const nuevoEscrito = await prisma.escrito.create({
      data: {
        titulo,
        descripcion,
        archivoUrl: archivo.path,
        expedienteId,
        creadoPorId,
      },
    })
    res.status(201).json(nuevoEscrito)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el escrito', error })
  }
}

// Listar escritos por expediente incluyendo nombre y rol de quien los subió
export const listarEscritosPorExpediente = async (req: Request, res: Response) => {
  try {
    const expedienteId = Number(req.params.id)
    const escritos = await prisma.escrito.findMany({
      where: { expedienteId },
      include: {
        creadoPor: {
          select: {
            id: true,
            nombre: true,
            rol: true
          }
        }
      }
    })
    res.status(200).json(escritos)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar escritos', error })
  }
}


// Obtener un escrito por su ID
export const obtenerEscritoPorId = async (req: Request, res: Response) => {
  try {
    const escritoId = Number(req.params.escritoId)
    const escrito = await prisma.escrito.findUnique({
      where: { id: escritoId }
    })
    if (!escrito) {
      res.status(404).json({ mensaje: 'Escrito no encontrado' })
      return
    }
    res.status(200).json(escrito)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el escrito', error })
  }
}

// Actualizar un escrito
export const actualizarEscrito = async (req: Request, res: Response) => {
  try {
    const escritoId = Number(req.params.escritoId)
    const { titulo, descripcion } = req.body
    const escrito = await prisma.escrito.update({
      where: { id: escritoId },
      data: { titulo, descripcion }
    })
    res.status(200).json(escrito)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el escrito', error })
  }
}

// Eliminar un escrito (borrado físico)
export const eliminarEscrito = async (req: Request, res: Response) => {
  try {
    const escritoId = Number(req.params.escritoId)
    await prisma.escrito.delete({
      where: { id: escritoId }
    })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el escrito', error })
  }
}
