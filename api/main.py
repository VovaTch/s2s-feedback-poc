from typing import Any

from fastapi import FastAPI
import uvicorn
import dotenv

app = FastAPI()


@app.get("/")
def read_root() -> dict[str, Any]:
    return {"message": "Hello, World!"}


if __name__ == "__main__":
    dotenv.load_dotenv(".env", override=True)
    uvicorn.run(app, host="127.0.0.1", port=8000)
