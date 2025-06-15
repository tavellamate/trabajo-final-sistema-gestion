import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import escritosRoutes from './routes/escritosRoutes'
import causaRoutes from './routes/causaRoutes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', authRoutes)
app.use('/api', escritosRoutes)
app.use('/api/causas', causaRoutes)

app.get('/', (_req, res) => {
  res.send('LawTrack API funcionando ✅')
})

export default app