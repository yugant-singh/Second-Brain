import express from 'express'
import {authRouter} from '../src/routes/auth.routes.js'
import itemRouter from '../src/routes/item.routes.js'
import collectionRouter from '../src/routes/collection.routes.js'
import searchRouter from '../src/routes/search.routes.js'
import graphRouter from '../src/routes/graphRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(express.static("./public"))
app.use(cors({
  origin: [
    "http://localhost:5173",
    "chrome-extension://omlhmjibninhndmkbpopjakfjjhhemdi"
  ],
  credentials: true
}))
app.use(cookieParser())
app.use('/api/auth',authRouter)
app.use('/api/items',itemRouter)
app.use('/api/collections',collectionRouter)
app.use("/api/search", searchRouter);
app.use("/api/graph", graphRouter);




export default app