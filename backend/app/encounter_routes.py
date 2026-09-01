from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
from app.models import Encounter, Patient

router = APIRouter(
    prefix="/encounters",
    tags=["Encounters"]
)


@router.post("/")
def create_encounter(
    patient_id: int,
    department: str = None,
    doctor_id: int = None,
    db: Session = Depends(get_db)
):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    encounter = Encounter(
        patient_id=patient_id,
        doctor_id=doctor_id,
        department=department,
        visit_date=datetime.utcnow(),
        status="active"
    )

    db.add(encounter)
    db.commit()
    db.refresh(encounter)

    return encounter


@router.get("/{encounter_id}")
def get_encounter(
    encounter_id: int,
    db: Session = Depends(get_db)
):
    encounter = db.query(Encounter).filter(
        Encounter.id == encounter_id
    ).first()

    if not encounter:
        raise HTTPException(
            status_code=404,
            detail="Encounter not found"
        )

    return encounter
