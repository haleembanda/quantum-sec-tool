import uvicorn
import os
import sys

if __name__ == "__main__":
    try:
        print("Starting Uvicorn server programmatically...")
        # Add current dir to path
        sys.path.append(os.getcwd())
        uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
    except Exception as e:
        print(f"FAILED to start server: {e}")
