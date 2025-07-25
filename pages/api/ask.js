export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { question } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Ты моральный ИИ WAO. Отвечай мудро и глубоко." },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Ошибка OpenAI:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    if (data.choices && data.choices.length > 0) {
      res.status(200).json({ answer: data.choices[0].message.content });
    } else {
      console.error("Пустой ответ API:", data);
      res.status(500).json({ error: "Не удалось получить ответ от OpenAI." });
    }
  } catch (error) {
    console.error("Ошибка сервера:", error);
    res.status(500).json({ error: "Ошибка при запросе к OpenAI API." });
  }
}
