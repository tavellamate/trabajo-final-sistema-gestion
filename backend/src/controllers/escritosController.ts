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
    }
  }
}

// Crear escrito con archivo
export const crearEscritoConArchivo = async (req: Request, res: Response) => {
  try {
    const expedienteId = Number(req.params.id);
    const { titulo, descripcion } = req.body;
    const archivo = req.file;

    if (!archivo) {
      return res.status(400).json({ mensaje: 'Debe adjuntar un archivo PDF.' });
    }

    if (!titulo || !descripcion) {
      return res.status(400).json({ mensaje: 'Título y descripción son obligatorios.' });
    }

    const creadoPorId = req.usuario?.id || 1;

    const nuevoEscrito = await prisma.escrito.create({
      data: {
        titulo,
        descripcion,
        archivoUrl: archivo.path,
        expedienteId,
        creadoPorId,
      },
    });

    return res.status(201).json(nuevoEscrito);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al crear el escrito', error });
  }
};

// Listar escritos por expediente
export const listarEscritosPorExpediente = async (req: Request, res: Response) => {
  try {
    const expedienteId = Number(req.params.id);
    const escritos = await prisma.escrito.findMany({
      where: { expedienteId },
      include: {
        creadoPor: {
          select: { id: true, nombre: true, rol: true },
        },
      },
    });

    return res.status(200).json(escritos);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al listar escritos', error });
  }
};

// Obtener escrito por ID
export const obtenerEscritoPorId = async (req: Request, res: Response) => {
  try {
    const escritoId = Number(req.params.escritoId);
    const escrito = await prisma.escrito.findUnique({
      where: { id: escritoId },
    });

    if (!escrito) {
      return res.status(404).json({ mensaje: 'Escrito no encontrado' });
    }

    return res.status(200).json(escrito);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener el escrito', error });
  }
};

// Actualizar escrito
export const actualizarEscrito = async (req: Request, res: Response) => {
  try {
    const escritoId = Number(req.params.escritoId);
    const { titulo, descripcion } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({ mensaje: 'Título y descripción son obligatorios.' });
    }

    const escrito = await prisma.escrito.update({
      where: { id: escritoId },
      data: { titulo, descripcion },
    });

    return res.status(200).json(escrito);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al actualizar el escrito', error });
  }
};

// Eliminar escrito
export const eliminarEscrito = async (req: Request, res: Response) => {
  try {
    const escritoId = Number(req.params.escritoId);

    await prisma.escrito.delete({
      where: { id: escritoId },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar el escrito', error });
  }
};