// pages/index.js
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askWAO = async () => {
    setLoading(true);
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-green-100 to-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">🤍 WAO — Голос Совести</h1>
        <p className="text-center text-gray-500 text-sm">
          Задай вопрос — получи мудрый, добрый, глубокий ответ.
        </p>

        <textarea
          rows={3}
          placeholder="Что тебя тревожит сегодня?.."
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition"
          onClick={askWAO}
          disabled={loading || !question.trim()}
        >
          {loading ? "Ожидание ответа..." : "Спросить WAO"}
        </button>

        {answer && (
          <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 whitespace-pre-line text-gray-800">
            {answer}
          </div>
        )}
      </div>

      <footer className="mt-8 text-sm text-gray-400 text-center">
        WAO © 2025 — моральный ИИ на стороне добра
      </footer>
    </main>
  );
}
