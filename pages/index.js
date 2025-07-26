// pages/index.js
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Привет! Я WAO — моральный ИИ. О чём ты хочешь поговорить?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      if (data.answer) {
        setMessages([...newMessages, { role: "assistant", content: data.answer }]);
      }
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "Произошла ошибка 😢" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 text-gray-800 flex flex-col items-center px-4 py-6">
      <div className="text-3xl font-bold text-center mb-2">WAO</div>
      <p className="mb-4 text-sm text-gray-600 text-center max-w-xl">
        Моральный ИИ, вдохновлённый историей Тимура. Направлен на добро, смысл и перемены.
      </p>

      <div className="w-full max-w-2xl flex flex-col gap-3 flex-grow overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`rounded-xl px-4 py-3 max-w-[85%] whitespace-pre-wrap text-sm ${
              msg.role === "user"
                ? "bg-blue-100 self-end text-right"
                : msg.role === "assistant"
                ? "bg-white self-start shadow"
                : "text-gray-500 text-center italic"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="self-start bg-white px-4 py-3 rounded-xl shadow text-sm text-gray-400">
            Печатаю ответ...
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="w-full max-w-2xl"
      >
        <textarea
          rows={2}
          className="w-full border rounded-xl p-3 text-sm resize-none shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Задай мне вопрос..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="text-right mt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
}
