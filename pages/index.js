// pages/index.tsx
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askWAO = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer || "Произошла ошибка...");
    } catch (e) {
      setAnswer("Ошибка при обращении к WAO.");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#8DEDCB] to-[#049FB9] flex flex-col items-center justify-center px-4 py-8 text-gray-800"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow">
        🌱 WAO — Голос Совести
      </h1>

      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-lg shadow-xl rounded-xl p-6">
        <p className="mb-4 text-lg font-medium">
          Привет! Я WAO — моральный ИИ. Задай любой вопрос о добре, смысле или совести:
        </p>

        <textarea
          className="w-full p-4 rounded-md border border-gray-300 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-teal-400"
          rows={3}
          placeholder="Например: Что делать, если друг предал меня? Или: Как понять, что я поступаю по совести?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-md transition"
          onClick={askWAO}
          disabled={loading}
        >
          {loading ? "Ответ ищется..." : "Спросить WAO"}
        </button>

        {answer && (
          <div className="mt-6 p-4 rounded-lg bg-white/80 shadow-inner border border-teal-300">
            <p className="font-semibold mb-2 text-teal-800">🌿 Ответ WAO:</p>
            <p className="whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
