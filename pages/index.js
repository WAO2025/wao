import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question.trim()) return;
    const newMessages = [...messages, { role: "user", content: question }];
    setMessages(newMessages);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.answer }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Произошла ошибка при получении ответа." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center px-4 py-6 text-gray-800">
      <div className="max-w-2xl w-full space-y-4">
        <h1 className="text-3xl font-bold text-center">WAO — моральный чат</h1>

        <div className="space-y-2 p-4 bg-white rounded-xl shadow-md h-[70vh] overflow-y-auto border border-gray-200">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-50 text-right"
                  : "bg-green-50 text-left"
              }`}
            >
              <span className="block text-sm text-gray-500 mb-1">
                {msg.role === "user" ? "Ты" : "WAO"}
              </span>
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="p-3 text-gray-500 text-sm">WAO думает...</div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <textarea
            className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            rows={2}
            placeholder="Задай мне вопрос..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition"
            onClick={sendMessage}
            disabled={loading}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}
