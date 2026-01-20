const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch<T>(
    url: string,
    options?: RequestInit
): Promise<T>{

    const res = await fetch(`${BASE_URL}/${url}` , {
        headers:{
            "Content-Type": "application/json"
        },
        ...options
    });

    if(!res.ok){
        const err = await res.json()
        throw new Error(err.detail || "API error")
    }

    return res.json()
}