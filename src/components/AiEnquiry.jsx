import React, { useState } from "react";

function AiEnquiry() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const token = localStorage.getItem("token"); // ✅ retrieve stored JWT

      const res = await fetch("http://localhost:8000/ai-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ send token
        },
        body: JSON.stringify({ prompt: query }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      setResponse(data.response || "No answer from AI");
    } catch (err) {
      setError(err.message || "Failed to fetch AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "1rem auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h3>Ask AI</h3>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type your question here..."
        rows={4}
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        style={{ padding: "8px 16px" }}
      >
        {loading ? "Asking..." : "Ask"}
      </button>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      {response && (
        <div
          style={{
            marginTop: 15,
            padding: 10,
            backgroundColor: "#f0f0f0",
            borderRadius: 4,
          }}
        >
          <strong>AI Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default AiEnquiry;
