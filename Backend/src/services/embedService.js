import { pipeline } from "@xenova/transformers";

let extractor = null;

const getExtractor = async () => {
  if (!extractor) {
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return extractor;
};

export const generateEmbedding = async (text) => {
  try {
    const extractor = await getExtractor();
    const output = await extractor(text, {
      pooling: "mean",
      normalize: true,
    });
    return Array.from(output.data);
  } catch (err) {
    console.log("Embedding error:", err.message);
    return [];
  }
};

