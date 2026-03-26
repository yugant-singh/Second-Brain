import express from 'express'
const collectionRouter = express.Router()
import {authMiddleware} from '../middlewares/auth.middleware.js'
import {
    createCollectionController,
    getAllCollection,
    deleteCollection,
    addItemToCollection
} from '../controllers/collection.controller.js'

collectionRouter.post('/',authMiddleware,createCollectionController)
collectionRouter.get('/',authMiddleware,getAllCollection)
collectionRouter.delete('/:id',authMiddleware,deleteCollection)
collectionRouter.post('/:id/add-item',authMiddleware,addItemToCollection)


export default collectionRouter;