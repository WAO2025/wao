export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { question } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // можно заменить на другую модель
        messages: [
          { role: "system", content: "Ты моральный ИИ WAO. Отвечай мудро и глубоко." },
          { role: "user", content: question }
        ]
      }),
    });

    const data = await response.json();

    if (data?.choices?.length > 0) {
      res.status(200).json({ answer: data.choices[0].message.content });
    } else {
      console.error("Ошибка API:", data);
      res.status(500).json({ error: "Не удалось получить ответ от модели." });
    }
  } catch (error) {
    console.error("Ошибка сервера:", error);
    res.status(500).json({ error: "Ошибка при запросе к OpenRouter API." });
  }
}
