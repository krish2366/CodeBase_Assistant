#  Agentic Codebase Assistant

An **agentic AI system** that understands and explains real-world codebases using **RAG + LangGraph + tool-based reasoning**.

It allows developers to ingest GitHub repositories and ask questions like:
> “Where is authentication handled?”  
> “How is Razorpay integrated?”

The system responds with **clear answers, tool usage, and reasoning**.

---

##  Features

- Ingest **public GitHub repositories**
- Vector-based code search (RAG)
- Agentic reasoning with **LangGraph**
- Tool-based execution (`search_file`, `suggest_diff`)
- Explainable answers with reasoning trail
- Multiple project isolation
- Safe by design (no file writes, no execution)

## Backend
**Tech Stack**
- FastAPI
- LangGraph
- Gemini / Ollama
- Supabase (pgvector)
- Git (GitHub ingestion)

## Frontend
- React (Vite)
- TypeScript
- Tailwind CSS

---
## Run locally
**Backend**
```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
**Frontend**
```
cd frontend
npm install
npm run dev
```
