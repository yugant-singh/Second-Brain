import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["url", "text", "image", "pdf"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    sourceUrl: {
      type: String,
      default: "",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    topics: {
      type: [String],
      default: [],
    },
    embedding: {
      type: [Number],
      default: [],
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      default: null,
    },
    highlights: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const itemModel = mongoose.model("Item",itemSchema)
export default itemModel