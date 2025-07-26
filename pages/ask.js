
// pages/ask.js

import { useState } from "react";

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const sendQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    if (data.answer) setAnswer(data.answer);
    else setAnswer("Произошла ошибка...");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Моральный чат WAO</h1>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Напиши свой вопрос..."
          className="w-full p-4 rounded-xl border resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <button
          onClick={sendQuestion}
          className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition"
        >
          {loading ? "Отправка..." : "Отправить"}
        </button>

        {answer && (
          <div className="mt-6 p-4 bg-gray-100 rounded-xl whitespace-pre-wrap">
            <strong>Ответ:</strong> {answer}
          </div>
        )}
      </div>
    </div>
  );
}
