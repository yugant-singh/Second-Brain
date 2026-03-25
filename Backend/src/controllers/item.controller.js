import itemModel from '../models/item.model.js'
import { generateTags } from '../services/ai.service.js'
import {generateEmbedding} from '../services/embedService.js'

export async function saveItemController(req, res) {
    try {
        const { type, title, content, sourceUrl, thumbnail } = req.body;
        const aiResult = await generateTags(title, content);
        const embedding = await generateEmbedding(`${title} ${content}`);
        const item = await itemModel.create({
            userId: req.user.id,
            type,
            title,
            content,
            sourceUrl,
            thumbnail,
            tags: aiResult.tags,
            topics: aiResult.topics,
            embedding: embedding,
        })

        res.status(201).json({
            message: "item saved successfully",
            item
        })
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

export async function getAllSavedItem(req, res) {
    try {
        const items = await itemModel.find({ userId: req.user.id }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            message: "all save item fetched successfuly",
            items
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

export async function deleteItem(req, res) {
    try {
        const itemId = req.params.id

        const item = await itemModel.findById(itemId)
        if (!item) {
            return res.status(404).json({
                message: "Item not Found"
            })

        }

        if (item.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await item.deleteOne()
        res.status(200).json({
            message: "Item deleted"
        })
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

export async function getItemById(req, res) {
  try {
    const item = await itemModel.findById(req.params.id)

    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    if (item.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" })
    }

    res.status(200).json({
      message: "Item fetched successfully",
      item
    })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}