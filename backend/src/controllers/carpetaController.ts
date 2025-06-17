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