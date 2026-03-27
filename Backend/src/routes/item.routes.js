import express from 'express'
const itemRouter = express.Router()
import {authMiddleware} from '../middlewares/auth.middleware.js'
import {saveItemController,getAllSavedItem,deleteItem,getItemById,getResurfacedItems} from '../controllers/item.controller.js'

itemRouter.post('/',authMiddleware,saveItemController)
itemRouter.get('/',authMiddleware,getAllSavedItem)
itemRouter.delete('/:id',authMiddleware,deleteItem)
itemRouter.get('/:id', authMiddleware, getItemById)
itemRouter.get('/resurface', authMiddleware, getResurfacedItems)


export default itemRouter