## AI Summarizer / Humanizer

AI-powered text “humanizer” that takes AI-generated text and rewrites/summarizes it so it sounds more natural and human.  
Backend is a FastAPI service using Google Vertex AI Gemini; frontend is a React + Vite single-page app.

---

### Features

- **Humanize AI text**: Sends text to a Vertex AI Gemini model with a prompt tuned for natural, human-like writing.
- **FastAPI API**: Simple `/humanize` POST endpoint that returns the rewritten text.
- **Modern React UI**:
  - Gradient background, card layout, and responsive design
  - Character counter, loading spinner, error states
  - “Copy to clipboard” for the humanized result

---

### Project Structure

- **`api.py`** – FastAPI app exposing the `/humanize` endpoint.
- **`humanizer_agent.py`** – Vertex AI Gemini client + `humanize_text()` helper.
- **`frontend/`** – React + Vite frontend (entry files in `src/`).

---

### Backend Setup (FastAPI + Vertex AI)

1. **Create & activate a virtual environment (recommended)**:

```bash
cd /Users/ritvikparuchuri/Desktop/AI_summarizer
python -m venv .venv
source .venv/bin/activate  # on macOS/Linux
```

2. **Install Python dependencies** (example – adjust to your env):

```bash
pip install fastapi uvicorn pydantic google-cloud-aiplatform
```

3. **Configure Google Cloud / Vertex AI**:

- Make sure you have a GCP project with Vertex AI enabled.
- Set up authentication (one of):
  - Use `gcloud auth application-default login`, **or**
  - Point `GOOGLE_APPLICATION_CREDENTIALS` to a service account key JSON.
- Ensure the project and region in `humanizer_agent.py` match your setup:
  - `project="ai-humanizer-486217"`
  - `location="us-central1"`

4. **Run the FastAPI server**:

```bash
uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

The main endpoint:

- **POST** `/humanize`
  - Body: `{ "text": "your text here" }`
  - Response: `{ "output": "humanized text" }`

---

### Frontend Setup (React + Vite)

1. **Install Node dependencies**:

```bash
cd frontend
npm install
```

2. **Run the dev server**:

```bash
npm run dev
```

This will start Vite (by default on `http://localhost:5173`).

The frontend is configured to call the backend at:

- `http://127.0.0.1:8000/humanize`

Make sure the FastAPI server is running on that address/port.

---

### Usage

1. Start the **backend** (`uvicorn api:app --reload --port 8000`).
2. Start the **frontend** (`npm run dev` in `frontend/`).
3. Open the Vite dev URL in your browser.
4. Paste AI-generated text into the input area.
5. Click **“Humanize Text”** to get a rewritten, more natural-sounding version.
6. Use the **Copy** button to copy the output to your clipboard.

---

### Notes & Customization

- Tweak the behavior by editing the `SYSTEM_PROMPT` in `humanizer_agent.py`.
- Update the model name in `humanizer_agent.py` if you want to use a different Vertex AI model.
- For production, tighten CORS settings in `api.py` and secure your Google Cloud credentials.

