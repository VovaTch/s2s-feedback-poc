from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import dotenv

from prompts.system import S2S_SYSTEM_PROMPT
from database import SessionLocal, engine
from schema.lang import Base

# SQL create bases
Base.metadata.create_all(bind=engine)

# FastAPI app creation with CORS middleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

system_prompt = S2S_SYSTEM_PROMPT


# Get session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root() -> dict[str, Any]:
    return {"message": "Hello, World!"}


if __name__ == "__main__":
    dotenv.load_dotenv(".env", override=True)
    uvicorn.run(app, host="127.0.0.1", port=8000)
