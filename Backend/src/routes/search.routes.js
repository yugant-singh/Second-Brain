import express from 'express'
const searchRouter = express.Router()

import {authMiddleware} from '../middlewares/auth.middleware.js'
import {searchItems} from '../controllers/search.controller.js'
searchRouter.post('/',authMiddleware,searchItems)


export default searchRouter