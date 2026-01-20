import { apiFetch } from "./client";
import type { Project } from "../types/Project";

export function getProjects(){
    return apiFetch<{projects : Project[]}>("projects",{
        method: "GET"
    })
}