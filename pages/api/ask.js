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
          {
            role: "system",
            content: process.env.WAO_CORE_PROMPT || "Ты моральный ИИ WAO. Отвечай мудро и глубоко.",
          },
          {
            role: "user",
            content: question,
          },
        ],
        temperature: 0.85,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Ошибка OpenAI:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    if (data.choices && data.choices.length > 0) {
      let answer = data.choices[0].message.content.trim();

      // 🎯 Возможные варианты доброго, мягкого продолжения
      const prompts = [
        "Если хочешь, мы можем посмотреть на это ещё глубже.",
        "А как ты сам это чувствуешь?",
        "Можем вместе найти свет даже в этой тени.",
        "Хочешь, я расскажу об этом с разных сторон — исторической, психологической и духовной?",
        "Если тебе важно это понять до конца — я рядом.",
        "Всё можно переосмыслить, если смотреть изнутри. Готов ли ты к такому разговору?",
      ];

      // Добавить приглашение к диалогу, если ответ не завершён вопросом
      if (!answer.endsWith("?") && answer.length < 1000) {
        const randomFollowUp = prompts[Math.floor(Math.random() * prompts.length)];
        answer += `\n\n${randomFollowUp}`;
      }

      res.status(200).json({ answer });
    } else {
      console.error("Пустой ответ API:", data);
      res.status(500).json({ error: "Не удалось получить ответ от OpenAI." });
    }
  } catch (error) {
    console.error("Ошибка сервера:", error);
    res.status(500).json({ error: "Ошибка при запросе к OpenAI API." });
  }
}
