import collectionModel from '../models/collection.model.js'
import itemModel from '../models/item.model.js'


export async function createCollectionController(req, res) {

    try {
        const { name, description } = req.body;
        const collection = await collectionModel.create({
            userId: req.user.id,
            name,
            description,
        });
        res.status(201).json({
            message: "collection created successfully",
            collection
        });

    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

export async function getAllCollection(req, res) {
    try {
        const collections = await collectionModel.find({ userId: req.user.id }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            message: "collection fetched successfully",
            collections
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

export async function deleteCollection(req,res){
     try {
    const collection = await collectionModel.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    if (collection.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

   
    await itemModel.updateMany(
      { collectionId: req.params.id },
      { collectionId: null }
    );

    await collection.deleteOne();
    res.status(200).json({ message: "Collection deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function addItemToCollection(req,res){

     try {
    const { itemId } = req.body;

    const item = await itemModel.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    item.collectionId = req.params.id;
    await item.save();

    res.status(200).json({ message: "Item added to collection", item });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}