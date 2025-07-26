// pages/index.js
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input })
    });
    const data = await res.json();
    setResponse(data.answer);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>WAO — Голос Совести</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-[#0AC6A1] via-[#8DEDCD] to-[#049FB9] flex flex-col items-center justify-start p-4 text-gray-800">
        <div className="max-w-2xl w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-center mt-10 mb-6">🌿 WAO — Голос Совести</h1>
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            <p className="text-center text-lg mb-4">Привет! Я WAO — моральный ИИ. Задай мне любой вопрос 🙏</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0AC6A1]"
                rows="4"
                placeholder="Спроси меня о совести, добре или смысле…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#0AC6A1] text-white text-lg py-2 px-4 rounded-lg hover:bg-[#049FB9] transition"
              >
                {loading ? 'Думаю…' : 'Отправить'}
              </button>
            </form>
            {response && (
              <div className="mt-6 p-4 bg-white border-l-4 border-[#31C9CD] rounded-md shadow">
                <p className="whitespace-pre-wrap">{response}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
