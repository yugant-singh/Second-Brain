import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

 export const generateTags = async (title, content) => {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a tagging assistant. Given a title and content, return ONLY a JSON object with two fields:
          - tags: array of 3-5 specific keyword tags
          - topics: array of 1-2 broad topic categories
          Return only valid JSON, no explanation, no markdown.`,
        },
        {
          role: "user",
          content: `Title: ${title}\nContent: ${content}`,
        },
      ],
    });

    const raw = response.choices[0].message.content;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.log("AI tagging error:", err.message);
    return { tags: [], topics: [] };
  }
};

