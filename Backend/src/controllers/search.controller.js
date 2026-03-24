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
    const { query } = req.body;

    const queryEmbedding = await generateEmbedding(query);

    const items = await itemModel.find({ userId: req.user.id });

    const scored = items
      .filter((item) => item.embedding && item.embedding.length > 0)
      .map((item) => ({
        ...item._doc,
        score: cosineSimilarity(queryEmbedding, item.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    res.status(200).json({
      message: "Search results",
      results: scored,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
