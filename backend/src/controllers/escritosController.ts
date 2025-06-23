import { Request, Response } from 'express';
import prisma from '../client';

// Interfaz para datos del usuario
interface UsuarioToken {
  id: number;
  nombre: string;
  rol: string;
}

// Extensión del tipo Request para incluir usuario y archivo
declare global {
  namespace Express {
    interface Request {
      usuario?: UsuarioToken;
      file?: Express.Multer.File;
      userId?: number;
    }
  }
}

// Crear escrito con archivo
export const crearEscritoConArchivo = async (req: Request, res: Response): Promise<void> => {
  try {
    const expedienteId = Number(req.params.id);
    const { titulo, descripcion } = req.body;
    const archivo = req.file;

    if (!archivo) {
      res.status(400).json({ mensaje: 'Debe adjuntar un archivo PDF.' });
      return;
    }

    if (!titulo || !descripcion) {
      res.status(400).json({ mensaje: 'Título y descripción son obligatorios.' });
      return;
    }

    const creadoPorId = req.userId;
    if (typeof creadoPorId !== 'number') {
      res.status(401).json({ mensaje: 'Usuario no autenticado o ID de usuario no válido.' });
      return;
    }

    // Validar que el expediente existe y pertenece al usuario autenticado
    const expediente = await prisma.expediente.findUnique({ where: { id: expedienteId } });
    if (!expediente) {
      res.status(404).json({ mensaje: 'Expediente no encontrado.' });
      return;
    }
    if (expediente.usuarioId !== creadoPorId) {
      res.status(403).json({ mensaje: 'No tienes permiso para agregar escritos a este expediente.' });
      return;
    }

    const nuevoEscrito = await prisma.escrito.create({
      data: {
        titulo,
        descripcion,
        archivoUrl: archivo.path,
        expedienteId,
        creadoPorId,
      },
    });

    res.status(201).json(nuevoEscrito);
  } catch (error: any) {
    if (error.code === 'P2003') {
      res.status(400).json({ mensaje: 'Error de integridad referencial: usuario o expediente no existen.' });
      return;
    }
    console.error("💥 ERROR al crear escrito:", error);
    res.status(500).json({ mensaje: 'Error al crear el escrito', error: error.message || error });
  }
};

// Listar escritos por expediente
export const listarEscritosPorExpediente = async (req: Request, res: Response): Promise<void> => {
  try {
    const expedienteId = Number(req.params.id);
    const escritos = await prisma.escrito.findMany({
      where: { 
        expedienteId,
        creadoPorId: req.userId
      },
      include: {
        creadoPor: {
          select: { id: true, nombre: true, rol: true },
        },
      },
    });
    res.status(200).json(escritos);
  } catch (error: any) {
    console.error("💥 ERROR al listar escritos:", error);
    res.status(500).json({ mensaje: 'Error al listar escritos', error: error.message || error });
  }
};

// Obtener escrito por ID
export const obtenerEscritoPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const escritoId = Number(req.params.escritoId);
    const escrito = await prisma.escrito.findUnique({
      where: { id: escritoId },
    });

    if (!escrito) {
      res.status(404).json({ mensaje: 'Escrito no encontrado' });
      return;
    }

    res.status(200).json(escrito);
  } catch (error: any) {
    console.error("💥 ERROR al obtener escrito:", error);
    res.status(500).json({ mensaje: 'Error al obtener el escrito', error: error.message || error });
  }
};

// Actualizar escrito
export const actualizarEscrito = async (req: Request, res: Response): Promise<void> => {
  try {
    const escritoId = Number(req.params.escritoId);
    const { titulo, descripcion } = req.body;

    if (!titulo || !descripcion) {
      res.status(400).json({ mensaje: 'Título y descripción son obligatorios.' });
      return;
    }

    // Verificar que el escrito pertenezca al usuario antes de actualizar
    const escrito = await prisma.escrito.findUnique({ where: { id: escritoId } });
    if (!escrito || escrito.creadoPorId !== req.userId) {
      res.status(403).json({ mensaje: 'No autorizado o escrito no encontrado' });
      return;
    }

    const actualizado = await prisma.escrito.update({
      where: { id: escritoId },
      data: { titulo, descripcion },
    });

    res.status(200).json(actualizado);
  } catch (error: any) {
    console.error("💥 ERROR al actualizar escrito:", error);
    res.status(500).json({ mensaje: 'Error al actualizar el escrito', error: error.message || error });
  }
};

// Eliminar escrito
export const eliminarEscrito = async (req: Request, res: Response): Promise<void> => {
  try {
    const escritoId = Number(req.params.escritoId);

    // Verificar que el escrito pertenezca al usuario antes de eliminar
    const escrito = await prisma.escrito.findUnique({ where: { id: escritoId } });
    if (!escrito || escrito.creadoPorId !== req.userId) {
      res.status(403).json({ mensaje: 'No autorizado o escrito no encontrado' });
      return;
    }

    await prisma.escrito.delete({
      where: { id: escritoId },
    });

    res.status(204).send();
  } catch (error: any) {
    console.error("💥 ERROR al eliminar escrito:", error);
    res.status(500).json({ mensaje: 'Error al eliminar el escrito', error: error.message || error });
  }
};