import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/authMiddleware";

const prisma = new PrismaClient();

export const obtenerCarpetas = async (req: AuthRequest, res: Response) => {
  console.log("Obteniendo carpetas para userId:", req.userId);
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
  const { tipo, nombre, resumen } = req.body;

  // Validación simple
  if (!tipo || !nombre || !resumen) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  try {
    // Obtener el número incremental por usuario
    const cantidadCarpetasUsuario = await prisma.carpeta.count({
      where: { usuarioId: req.userId }
    });
    const numero = cantidadCarpetasUsuario + 1;
    const fechaInicio = new Date();

    const carpeta = await prisma.carpeta.create({
      data: {
        nombre,
        numero,
        expediente: resumen,
        tipoProceso: tipo,
        fechaInicio,
        fechaFin: null,
        usuarioId: req.userId!,
      },
    });
 // Crear expediente asociado
    const expediente = await prisma.expediente.create({
      data: {
        titulo: nombre,
        numeroCarpeta: String(carpeta.numero),
        instancia: "", // valor por defecto
        numeroExpediente: "", // valor por defecto
        cliente: "", // valor por defecto
        contrario: "", // valor por defecto
        tipoProceso: tipo,
        fechaInicio: carpeta.fechaInicio,
        fechaUltimoMovimiento: new Date(),
        estado: "Abierto",
        usuarioId: req.userId!,
      },
    });

    res.status(201).json({ carpeta, expediente });
  } catch (error: any) {
    console.error("💥 ERROR al crear carpeta:", error);
    res.status(500).json({ 
      message: "Error al crear carpeta", 
      error: error.message || error 
    });
  }
};
export const eliminarCarpeta = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);

  try {
    const carpeta = await prisma.carpeta.findUnique({
      where: { id }
    });

    // Verificar que la carpeta exista y le pertenezca al usuario
    if (!carpeta || carpeta.usuarioId !== req.userId) {
      return res.status(403).json({ mensaje: 'No autorizado o carpeta no encontrada' });
    }
     


    await prisma.carpeta.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la carpeta', error });
  }
};
