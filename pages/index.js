import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Ты моральный ИИ WAO. Отвечай мудро и глубоко." },
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
      body: JSON.stringify({ question: input }),
    });

    const data = await res.json();
    if (data.answer) {
      setMessages([...newMessages, { role: "assistant", content: data.answer }]);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center px-4 py-6">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">Спроси совесть</h1>
      <div className="w-full max-w-2xl bg-neutral-900 rounded-2xl shadow-xl p-6 space-y-4">
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {messages.slice(1).map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <p
                className={`inline-block px-4 py-2 rounded-2xl max-w-[85%] leading-snug whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-blue-700 text-white"
                    : "bg-neutral-800 text-gray-100"
                }`}
              >
                {m.content}
              </p>
            </div>
          ))}
          {loading && <p className="text-neutral-500">WAO думает...</p>}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Задай вопрос..."
            className="flex-1 rounded-xl bg-neutral-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
          >
            Отправить
          </button>
        </form>
      </div>
    </main>
  );
}
