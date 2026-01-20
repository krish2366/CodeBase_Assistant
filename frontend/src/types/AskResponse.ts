export interface AskResponse{
    answer: string;
    tool_used?: string;
    reasoning: string[];
}