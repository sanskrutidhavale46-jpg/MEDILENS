from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
from app.models import Source

router = APIRouter(
    prefix="/sources",
    tags=["Sources"]
)


@router.post("/")
def create_source(
    source_type: str,
    source_reference: str = None,
    db: Session = Depends(get_db)
):
    source = Source(
        source_type=source_type,
        source_reference=source_reference,
        created_at=datetime.utcnow()
    )

    db.add(source)
    db.commit()
    db.refresh(source)

    return source


@router.get("/{source_id}")
def get_source(
    source_id: int,
    db: Session = Depends(get_db)
):
    source = db.query(Source).filter(
        Source.id == source_id
    ).first()

    if not source:
        raise HTTPException(
            status_code=404,
            detail="Source not found"
        )

    return source
