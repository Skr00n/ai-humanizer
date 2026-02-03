import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const humanizeText = async () => {
    if (!text.trim()) {
      setError("Please enter some text to humanize");
      return;
    }

    setError("");
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("http://127.0.0.1:8000/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!res.ok) {
        throw new Error("Failed to humanize text");
      }

      const data = await res.json();
      setOutput(data.output);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <header className="app-header">
          <h1 className="app-title">
            <span className="title-icon">✨</span>
            AI Humanizer
          </h1>
          <p className="app-subtitle">
            Transform AI-generated text into natural, human-like content
          </p>
        </header>

        <div className="input-section">
          <label htmlFor="text-input" className="input-label">
            Enter your text
          </label>
          <textarea
            id="text-input"
            className="text-input"
            rows={8}
            placeholder="Paste your AI-generated text here..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError("");
            }}
            disabled={loading}
          />
          <div className="input-footer">
            <span className="char-count">{text.length} characters</span>
            <button
              className="humanize-button"
              onClick={humanizeText}
              disabled={loading || !text.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Humanize Text
                </>
              )}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>

        {output && (
          <div className="output-section">
            <div className="output-header">
              <h2 className="output-title">
                <span className="output-icon">📝</span>
                Humanized Output
              </h2>
              <button className="copy-button" onClick={handleCopy} title="Copy to clipboard">
                <span>📋</span>
                Copy
              </button>
            </div>
            <div className="output-content">{output}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
