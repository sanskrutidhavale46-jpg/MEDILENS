from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
from app.models import TimelineEvent, Patient

router = APIRouter(
    prefix="/timeline",
    tags=["Patient Timeline"]
)


@router.post("/")
def create_timeline_event(
    patient_id: int,
    event_type: str,
    description: str,
    event_date: datetime = None,
    verification_status: str = "unverified",
    source_id: int = None,
    db: Session = Depends(get_db)
):
    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    event = TimelineEvent(
        patient_id=patient_id,
        event_type=event_type,
        event_date=event_date or datetime.utcnow(),
        description=description,
        verification_status=verification_status,
        source_id=source_id
    )

    db.add(event)
    db.commit()
    db.refresh(event)

    return event


@router.get("/patient/{patient_id}")
def get_patient_timeline(
    patient_id: int,
    db: Session = Depends(get_db)
):
    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    events = db.query(TimelineEvent).filter(
        TimelineEvent.patient_id == patient_id
    ).order_by(
        TimelineEvent.event_date.desc()
    ).all()

    return events
