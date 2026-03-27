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
        const items = await itemModel.find({ userId: req.user.id })
  .select("-embedding")
  .sort({ createdAt: -1 });

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
    // Embedding ke saath fetch karo — similarity ke liye
    const item = await itemModel.findById(req.params.id)

    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    if (item.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" })
    }

    // Related items
    const allItems = await itemModel.find({
      userId: req.user.id,
      _id: { $ne: item._id }
    })

    const cosineSimilarity = (vecA, vecB) => {
      const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
      const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
      const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
      return dotProduct / (magnitudeA * magnitudeB)
    }

    const related = allItems
      .filter((i) => i.embedding && i.embedding.length > 0 && item.embedding && item.embedding.length > 0)
      .map((i) => ({
        _id: i._id,
        title: i.title,
        type: i.type,
        tags: i.tags,
        topics: i.topics,
        content: i.content,
        sourceUrl: i.sourceUrl,
        createdAt: i.createdAt,
        score: cosineSimilarity(item.embedding, i.embedding)
      }))
      .filter((i) => i.score > 0.5)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)

    // Response mein embedding exclude karo
    const { embedding, ...itemWithoutEmbedding } = item._doc

    res.status(200).json({
      message: "Item fetched successfully",
      item: itemWithoutEmbedding,
      related
    })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

export async function getResurfacedItems(req, res) {
  try {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // 7 din se purane items lo — recently saved nahi
    const items = await itemModel.find({
      userId: req.user.id,
      createdAt: { $lte: sevenDaysAgo }
    }).select("-embedding")

    if (items.length === 0) {
      return res.status(200).json({ message: "No resurfaced items", items: [] })
    }

    // Random 3 items lo
    const shuffled = items.sort(() => Math.random() - 0.5)
    const resurfaced = shuffled.slice(0, 3)

    res.status(200).json({
      message: "Resurfaced items",
      items: resurfaced
    })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

