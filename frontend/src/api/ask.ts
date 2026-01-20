import { apiFetch } from "./client";
import type { AskResponse } from "../types/AskResponse";

export function askQuestion(projectId: string, question: string){
    return apiFetch<AskResponse>("ask",{
        method: "POST",
        body: JSON.stringify({
            project_id: projectId,
            question
        })
    })
}
