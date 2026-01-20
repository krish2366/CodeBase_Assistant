import type{ Project } from "../types/Project";


type Props = {
    projects: Project[];
    selected: string;
    onChange: (id: string) => void;
};

export default function ProjectSelector({
  projects,
  selected,
  onChange,
}: Props) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all hover:bg-white/15 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27rgb(168,85,247)%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[position:right_0.75rem_center] bg-no-repeat pr-10"
    >
      <option value="" className="bg-slate-800 text-gray-300">
        Select a project
      </option>
      {projects.map((p: any) => (
        <option
          key={p.project_id}
          value={p.project_id}
          className="bg-slate-800 text-white"
        >
          {p.project_name}
        </option>
      ))}
    </select>
  );
}
