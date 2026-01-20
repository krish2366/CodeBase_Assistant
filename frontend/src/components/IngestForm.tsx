import { ingestGithub } from "../api/ingest";
import { useState } from "react";


type Props = {
  onSuccess: () => void;
}

const IngestForm = ({onSuccess}: Props) => {

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  const onIngest = async() =>{
    if(!name || !url) return;

    setLoading(true);
    setError(null);

    try {
      await ingestGithub(name, url);
      setName("");
      setUrl("");
      onSuccess();
    } catch (e: any) {
      setError(e.message || "An error occurred during Ingestion");
    } finally{
      setLoading(false);
    }
  }



  return (
    <div className="rounded-2xl border border-orange-400/50 bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-xl p-6 space-y-4 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
        <h3 className="text-sm font-semibold text-orange-200">
          Ingest GitHub Repository (Dev Mode)
        </h3>
      </div>

      <input
        className="w-full rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all hover:bg-white/15"
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all hover:bg-white/15"
        placeholder="GitHub repo URL (https://github.com/user/repo)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-2.5">
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      <button
        onClick={onIngest}
        disabled={loading || !name || !url}
        className="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-5 py-2.5 text-sm font-medium text-white hover:from-orange-700 hover:to-amber-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-600 transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]"
      >
        {loading ? "Ingesting…" : "Ingest"}
      </button>
    </div>
  );
}

export default IngestForm

