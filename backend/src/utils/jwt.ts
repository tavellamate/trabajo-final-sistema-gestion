import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export function generarToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

export function verificarToken(token: string): any {
  return jwt.verify(token, JWT_SECRET)
}