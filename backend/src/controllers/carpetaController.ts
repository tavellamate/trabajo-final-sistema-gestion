import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/authMiddleware";

const prisma = new PrismaClient();

export const obtenerCarpetas = async (req: AuthRequest, res: Response) => {
  try {
    const carpetas = await prisma.carpeta.findMany({
      where: { usuarioId: req.userId },
    });
    res.json(carpetas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener carpetas" });
  }
};

export const crearCarpeta = async (req: AuthRequest, res: Response) => {
  const { nombre, numero, expediente, tipoProceso, fechaInicio, fechaFin } = req.body;

  try {
    const carpeta = await prisma.carpeta.create({
      data: {
        nombre,
        numero: parseInt(numero),
        expediente,
        tipoProceso,
        fechaInicio: new Date(fechaInicio),
        fechaFin: fechaFin ? new Date(fechaFin) : null,
        usuarioId: req.userId!,
      },
    });
    res.status(201).json(carpeta);
  } catch (error) {
    res.status(500).json({ message: "Error al crear carpeta" });
  }
};
  export const eliminarCarpeta = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);

  try {
    const carpeta = await prisma.carpeta.findUnique({
      where: { id }
    });

    // Verificar que la carpeta exista y le pertenezca al usuario
    //if (!carpeta || carpeta.usuarioId !== req.userId) {
      //return res.status(403).json({ mensaje: 'No autorizado o carpeta no encontrada' });
    //}
      if (!carpeta) {
        return res.status(404).json({ mensaje: 'Carpeta no encontrada' });
      }


    await prisma.carpeta.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la carpeta', error });
  }
};
