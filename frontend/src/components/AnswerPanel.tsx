import ReasoningPanel from "./ReasoningPanel";
import type { AskResponse } from "../types/AskResponse";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AnswerPanel({ data }: { data: AskResponse }) {
  return (
    <div className="space-y-4">
      {/* Answer */}
      <div className="prose prose-sm max-w-none text-gray-200">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.answer}</ReactMarkdown>
      </div>

      {/* Tool Used */}
      {data.tool_used && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-200">Tool used:</span>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-400">
            {data.tool_used}
          </span>
        </div>
      )}

      {/* Reasoning */}
      <ReasoningPanel reasoning={data.reasoning} />
    </div>
  );
}
