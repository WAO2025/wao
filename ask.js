import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { question } = req.body;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Ты моральный ИИ WAO, отвечай глубоко и с совестью." },
      { role: "user", content: question },
    ],
  });

  res.status(200).json({ answer: response.choices[0].message.content });
}
