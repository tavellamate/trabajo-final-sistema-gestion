import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function autenticarToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    res.status(401).json({ mensaje: 'No token, autorización denegada' })
    return
  }
  try {
    const secreto = process.env.JWT_SECRET || 'un_super_secreto'
    const usuarioDecodificado = jwt.verify(token, secreto)
    if (typeof usuarioDecodificado === 'object' && usuarioDecodificado && 'id' in usuarioDecodificado) {
      // @ts-ignore
      req.usuario = usuarioDecodificado
      next()
    } else {
      res.status(403).json({ mensaje: 'Token inválido' })
      return
    }
  } catch (err) {
    res.status(403).json({ mensaje: 'Token inválido' })
    return
  }
}
