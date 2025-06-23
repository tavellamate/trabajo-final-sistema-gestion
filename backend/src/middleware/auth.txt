import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Router } from 'express'
const router = Router()

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ mensaje: 'Token requerido' })

  try {
    jwt.verify(token, process.env.JWT_SECRET as string)
    next()
  } catch {
    res.status(401).json({ mensaje: 'Token inválido' })
  }
}

