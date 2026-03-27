import itemModel from "../models/item.model.js";

export const getGraphData = async (req, res) => {
  try {
   const items = await itemModel.find({ userId: req.user.id }).select("-embedding");


    const nodes = items.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      type: item.type,
      tags: item.tags,
      topics: item.topics,
    }));

   
    const edges = [];

    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const commonTags = items[i].tags.filter((tag) =>
          items[j].tags.includes(tag)
        );

        if (commonTags.length > 0) {
          edges.push({
            source: items[i]._id.toString(),
            target: items[j]._id.toString(),
            commonTags,
          });
        }
      }
    }

    res.status(200).json({
      message: "Graph data",
      nodes,
      edges,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
