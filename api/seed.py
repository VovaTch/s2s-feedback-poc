from schema.lang import LanguageChoiceCreate, create_language
from seed.data import LANGUAGES
from database import SessionLocal, engine
from schema.lang import Base

# SQL create bases
Base.metadata.create_all(bind=engine)


def main() -> None:
    db = SessionLocal()
    for lang_data in LANGUAGES:
        create_language(
            db,
            LanguageChoiceCreate(
                language=lang_data["language"], image_path=lang_data["image_path"]
            ),
        )


if __name__ == "__main__":
    main()
