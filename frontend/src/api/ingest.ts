import { apiFetch } from "./client";

export function ingestGithub(projectName: string, repoUrl: string) {
    return apiFetch<{
        project_id: string;
        project_name: string;
        files_processed: number;
        status: string;
    }>("ingest",{
        method: "POST",
        body: JSON.stringify({
            project_name: projectName,
            repo_url: repoUrl
        })
    })
}