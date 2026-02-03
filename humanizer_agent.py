import vertexai
from vertexai.preview.generative_models import GenerativeModel

vertexai.init(
    project="ai-humanizer-486217",
    location="us-central1",
)

# ✅ Correct model ID for the Python SDK
model = GenerativeModel("gemini-2.0-flash-001")

SYSTEM_PROMPT = """
You are a professional editor.
Rewrite and summarize text so that it:
- Preserves meaning
- Sounds natural and human
- Avoids AI-like phrasing
- Uses varied sentence structure
"""

def humanize_text(text: str) -> str:
    response = model.generate_content(
        f"{SYSTEM_PROMPT}\n\nText:\n{text}"
    )
    return response.text
