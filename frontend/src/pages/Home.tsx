import { useEffect, useState } from "react";
import { Sparkles, Code2, MessageSquare } from "lucide-react";
import { getProjects } from "../api/projects";
import { askQuestion } from "../api/ask";
import ProjectSelector from "../components/ProjectSelector";
import QuestionBox from "../components/QuestionBox";
import AnswerPanel from "../components/AnswerPanel";
import IngestForm from "../components/IngestForm";
import type { Project } from "../types/Project";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const refreshProjects = async() =>{
    const res = await getProjects();
    setProjects(res.projects ?? []);
  }

  useEffect(() => {
    refreshProjects();
  }, []);

  async function onAsk() {
    setLoading(true);
    setAnswer(null);
    try {
      const res = await askQuestion(projectId, question);
      setAnswer(res);
    } finally {
      setLoading(false);
    }
  }
  // console.log(projects)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative flex justify-center py-10 px-4">
        <div className="w-full max-w-3xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-4 pt-8 pb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-lg shadow-purple-500/50 mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Agentic Codebase Assistant
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Ask questions about your codebase with explainable AI
            </p>
          </div>

          {import.meta.env.DEV && <IngestForm onSuccess={refreshProjects} />}

          {/* Project Selector */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-purple-400" />
              <label className="text-sm font-semibold text-white">
                Select Project
              </label>
            </div>
            <ProjectSelector
              projects={projects}
              selected={projectId}
              onChange={setProjectId}
            />
          </div>

          {/* Question Box */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <label className="text-sm font-semibold text-white">
                Ask a Question
              </label>
            </div>
            <QuestionBox
              question={question}
              setQuestion={setQuestion}
              onAsk={onAsk}
              disabled={!projectId || loading}
            />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center gap-3 py-8">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                <div
                  className="absolute inset-0 w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "1.5s",
                  }}
                />
              </div>
              <span className="text-lg text-gray-200 font-medium">
                Analyzing your codebase...
              </span>
            </div>
          )}

          {/* Answer Panel */}
          {answer && (
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <h3 className="text-sm font-semibold text-white">Answer</h3>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <AnswerPanel data={answer} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
