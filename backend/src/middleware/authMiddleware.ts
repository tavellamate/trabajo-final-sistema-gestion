import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: number;
}

// ✅ Agregamos userId a la Request original de Express
declare module 'express-serve-static-core' {
  interface Request {
    userId?: number;
  }
}

// ✅ Middleware que verifica el token JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token requerido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Token inválido:', error);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

// ✅ Esta es la interfaz que podés usar para tipar tu request en controladores
export interface AuthRequest extends Request {
  userId?: number;
}