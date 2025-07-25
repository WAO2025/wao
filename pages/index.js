// pages/index.js
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendQuestion = async () => {
    if (!question.trim()) return;
    const newMessages = [...messages, { role: "user", content: question }];
    setMessages(newMessages);
    setLoading(true);

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    const answer = data.answer || "Извините, произошла ошибка.";

    setMessages([...newMessages, { role: "assistant", content: answer }]);
    setQuestion("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-semibold mb-4">🤖 WAO Chat</h1>
      <div className="w-full max-w-2xl bg-white shadow-md rounded p-4 overflow-y-auto flex-1 mb-4 space-y-4" style={{ maxHeight: "75vh" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.role === "user" ? "bg-blue-100 self-end" : "bg-green-100 self-start"}`}>
            <strong>{msg.role === "user" ? "Ты" : "WAO"}:</strong> {msg.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <textarea
        className="w-full max-w-2xl border rounded p-2 mb-2"
        rows={2}
        placeholder="Задай вопрос..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={sendQuestion}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Обработка..." : "Отправить"}
      </button>
    </div>
  );
}
