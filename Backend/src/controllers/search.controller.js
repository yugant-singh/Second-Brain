import itemModel from "../models/item.model.js";
import { generateEmbedding } from "../services/embedService.js";

const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

export const searchItems = async (req, res) => {
  try {
    const { query, type, sortBy } = req.body;

    const queryEmbedding = await generateEmbedding(query);

    // Type filter apply karo
    const filter = { userId: req.user.id };
    if (type && type !== "all") {
      filter.type = type;
    }

    const items = await itemModel.find(filter);

    let results = items
      .filter((item) => item.embedding && item.embedding.length > 0)
      .map((item) => ({
  _id: item._id,
  title: item.title,
  type: item.type,
  tags: item.tags,
  topics: item.topics,
  content: item.content,
  sourceUrl: item.sourceUrl,
  createdAt: item.createdAt,
  score: cosineSimilarity(queryEmbedding, item.embedding)
}))

    // Sort apply karo
    if (sortBy === "date") {
      results = results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      results = results.filter((item) => item.score > 0.3)
    } else {
      results = results.sort((a, b) => b.score - a.score)
    }

    results = results.slice(0, 10)

    res.status(200).json({
      message: "Search results",
      results,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};