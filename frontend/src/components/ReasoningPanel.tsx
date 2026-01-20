export default function ReasoningPanel({ reasoning }: { reasoning: string[] }) {
  if (!reasoning?.length) return null;

  return (
    <details className="mt-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm p-4 group">
      <summary className="cursor-pointer text-sm font-semibold text-purple-300 list-none focus:outline-none flex items-center gap-2 hover:text-purple-200 transition-colors">
        <svg
          className="w-4 h-4 transition-transform group-open:rotate-90"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        Why this answer?
      </summary>

      <ul className="mt-4 space-y-3 text-sm text-gray-200">
        {reasoning.map((r, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/30 border border-purple-400/50 flex items-center justify-center text-xs text-purple-300 font-medium mt-0.5">
              {i + 1}
            </span>
            <span className="leading-relaxed">{r}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
