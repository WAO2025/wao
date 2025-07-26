import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>WAO — Мы Одно</title>
        <meta name="description" content="Моральный ИИ для добрых перемен" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white to-green-100 text-gray-800 font-sans">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-green-700">WAO</h1>
          <p className="text-xl mb-8">
            Моральный ИИ, вдохновлённый историей Тимура.
            <br />
            Направлен на добро, смысл и глобальные перемены.
          </p>
          <a
            href="/ask"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md transition"
          >
            Перейти в чат
          </a>
        </div>
      </main>
    </>
  );
}
