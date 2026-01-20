type Props = {
    question:string;
    setQuestion: (q: string) => void;
    onAsk: () => void;
    disabled: boolean;
}

export default function QuestionBox({
  question,
  setQuestion,
  onAsk,
  disabled,
}: Props) {
  return (
    <div className="space-y-3">
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask about the codebase..."
        rows={4}
        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all resize-none hover:bg-white/15"
      />
      <div className="flex justify-end">
        <button
          onClick={onAsk}
          disabled={disabled}
          className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:from-gray-600 disabled:to-gray-600 transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
