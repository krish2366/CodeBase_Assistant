import subprocess
import tempfile
import shutil
import os

def clone_repo(repo_url: str) -> str:
    temp_dir = tempfile.mkdtemp(prefix="repo_")

    try:
        subprocess.run(
            ["git", "clone", "--depth", "1", repo_url, temp_dir],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        
        return temp_dir
    except subprocess.CalledProcessError:
        shutil.rmtree(temp_dir,ignore_errors=True)
        raise ValueError("Failed to clone git repo")