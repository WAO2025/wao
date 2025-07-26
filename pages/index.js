import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Я WAO — моральный ИИ. Задай мне вопрос, и я постараюсь ответить с добротой, мудростью и глубиной."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input })
    });

    const data = await res.json();
    if (data.answer) {
      setMessages([...newMessages, { role: "assistant", content: data.answer }]);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-blue-200 via-green-100 to-blue-50 text-gray-800">
      <div className="w-full max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">🤍 WAO: Голос Совести</h1>
        <div className="bg-white rounded-2xl shadow p-6 h-[65vh] overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl whitespace-pre-wrap ${
                msg.role === "assistant"
                  ? "bg-blue-50 text-blue-800"
                  : "bg-green-50 text-green-800 text-right"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && <div className="text-center text-gray-500">WAO думает…</div>}
        </div>
        <form onSubmit={handleSubmit} className="flex mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Спроси о добре, смысле или выборе..."
            className="flex-grow rounded-l-2xl border border-gray-300 px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-r-2xl hover:bg-blue-700 disabled:opacity-50"
          >
            Отправить
          </button>
        </form>
      </div>
    </main>
  );
}
