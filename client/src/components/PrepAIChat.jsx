import React, { useState } from "react";

export function PrepAIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const reply =
      "Thanks for your question! In this version, Prep AI gives quick tips. Ask about DSA, aptitude, or interview prep and I’ll give a short suggestion.";

    setMessages((prev) => [
      ...prev,
      { from: "you", text },
      { from: "ai", text: reply },
    ]);
    setInput("");
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          //   right: "24px",
          //   bottom: "24px",
          right: "50px",
          bottom: "150px",
          background: "red",
          padding: "10px 16px",
          borderRadius: "999px",
          background: "#7c3aed",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "14px",
          zIndex: 50,
        }}
      >
        Prep AI Assistant
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        right: "24px",
        // bottom: "24px",
        bottom: "166px",
        width: "320px",
        // height: "380px",
        height: "340px",

        background: "#020617",
        color: "white",
        borderRadius: "16px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
        border: "1px solid #4b5563",
      }}
    >
      <div
        style={{
          padding: "8px 12px",
          borderBottom: "1px solid #4b5563",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "14px",
        }}
      >
        <span>Prep AI Assistant</span>
        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: "#9ca3af",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ✕
        </button>
      </div>
      <div
        style={{
          flex: 1,
          padding: "8px 12px",
          overflowY: "auto",
          fontSize: "13px",
        }}
      >
        {messages.length === 0 && (
          <div style={{ color: "#9ca3af" }}>
            Ask anything about DSA, aptitude, or interview strategy to get quick
            tips.
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: "6px",
              textAlign: m.from === "you" ? "right" : "left",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "6px 8px",
                borderRadius: "10px",
                background: m.from === "you" ? "#4c1d95" : "#111827",
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "8px 12px",
          borderTop: "1px solid #4b5563",
          display: "flex",
          gap: "6px",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask Prep AI..."
          style={{
            flex: 1,
            padding: "6px 8px",
            borderRadius: "8px",
            border: "1px solid #4b5563",
            background: "#020617",
            color: "white",
            fontSize: "13px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "6px 10px",
            borderRadius: "8px",
            border: "none",
            background: "#7c3aed",
            color: "white",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
