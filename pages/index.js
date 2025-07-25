import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Привет! Я WAO — моральный ИИ. Задай мне любой вопрос 🙏" },
  ]);
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
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Произошла ошибка при обращении к серверу. Попробуй позже." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>🤖 WAO — Голос Совести</h1>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.role === "user" ? "#DCF8C6" : "#E6E6E6",
            }}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div style={{ ...styles.message, fontStyle: "italic" }}>Печатаю ответ…</div>
        )}
      </div>

      <textarea
        style={styles.input}
        placeholder="Спроси меня о совести, добре или смысле…"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKey}
        rows={3}
      />

      <button style={styles.button} onClick={sendMessage} disabled={loading}>
        Отправить
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "15px",
    height: "400px",
    overflowY: "auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#FAFAFA",
    marginBottom: "20px",
  },
  message: {
    padding: "10px 14px",
    borderRadius: "16px",
    maxWidth: "80%",
  },
  input: {
    width: "100%",
    fontSize: "16px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
