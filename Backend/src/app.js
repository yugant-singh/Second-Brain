import express from 'express'
import { authRouter } from './routes/auth.routes.js'
import itemRouter from './routes/item.routes.js'
import collectionRouter from './routes/collection.routes.js'
import searchRouter from './routes/search.routes.js'
import graphRouter from './routes/graphRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://second-brain-ps3j.onrender.com",
    "chrome-extension://jiafhbmhcngjdoaadcikndnjphlcfflj"
  ],
  credentials: true
}))
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/items', itemRouter)
app.use('/api/collections', collectionRouter)
app.use("/api/search", searchRouter)
app.use("/api/graph", graphRouter)

// Static files
app.use(express.static(path.join(__dirname, '../public')))

// Refresh fix — LAST mein
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

export default app