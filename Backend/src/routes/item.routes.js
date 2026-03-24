import express from 'express'
const itemRouter = express.Router()
import {authMiddleware} from '../middlewares/auth.middleware.js'
import {saveItemController,getAllSavedItem,deleteItem} from '../controllers/item.controller.js'

itemRouter.post('/',authMiddleware,saveItemController)
itemRouter.get('/',authMiddleware,getAllSavedItem)
itemRouter.delete('/:id',authMiddleware,deleteItem)


export default itemRouter