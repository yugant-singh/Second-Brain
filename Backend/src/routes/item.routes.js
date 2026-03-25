import express from 'express'
const itemRouter = express.Router()
import {authMiddleware} from '../middlewares/auth.middleware.js'
import {saveItemController,getAllSavedItem,deleteItem,getItemById} from '../controllers/item.controller.js'

itemRouter.post('/',authMiddleware,saveItemController)
itemRouter.get('/',authMiddleware,getAllSavedItem)
itemRouter.delete('/:id',authMiddleware,deleteItem)
itemRouter.get('/:id', authMiddleware, getItemById)


export default itemRouter