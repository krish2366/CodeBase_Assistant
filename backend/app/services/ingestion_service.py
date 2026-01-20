import os
import uuid
import shutil

from supabase import create_client
from app.config import SUPABASE_KEY, SUPABASE_URL

from app.ingestion.chunker import chunk_text, extract_metadata
from app.ingestion.embedder import embed_text
from app.ingestion.store import store_chunk
from app.ingestion.loader import load_files
from app.utils.github import clone_repo

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

class IngestionService:
    def ingest_repo(self, project_name: str, repo_url: str) -> dict:
        
        project_id = str(uuid.uuid4())
        
        supabase.table("projects").insert({
            "project_id": project_id,
            "project_name": project_name
        }).execute()
        
        repo_path = clone_repo(repo_url)
        
        try:
            
            files = load_files(repo_path)
            files_processed = len(files)
            
            
            for file in files:
                chunks = chunk_text(file["content"])
                language, module = extract_metadata(file["file_path"])

                for chunk in chunks:
                    embedding = embed_text(chunk)
                    
                    store_chunk({
                        "project_id": project_id,
                        "file_path" : file["file_path"],
                        "language" : language,
                        "module" : module,
                        "content" : chunk,
                        "embedding" : embedding
                    })
        finally:
            shutil.rmtree(repo_path, ignore_errors=True)
            
        return {
            "project_id": project_id,
            "project_name": project_name,
            "status": "ingested",
            "files_processed": files_processed 
        }
            
ingestion_service = IngestionService()   