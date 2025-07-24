import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message }),
    });
    const data = await res.json();
    setResponse(data.answer);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>WAO – Моральный ИИ</h1>
      <textarea
        rows={3}
        style={{ width: "100%", marginTop: "1rem" }}
        placeholder="Задай вопрос WAO..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button style={{ marginTop: "1rem" }} onClick={sendMessage}>
        Спросить
      </button>
      {response && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
          <h3>Ответ WAO:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
