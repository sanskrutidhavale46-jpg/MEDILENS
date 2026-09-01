from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import (
    Patient,
    Encounter,
    ClinicalHistory,
    Medication,
    Allergy,
    Investigation,
    TimelineEvent,
    Conflict
)
from app.patient_state import build_patient_state

router = APIRouter(
    prefix="/context",
    tags=["Patient Context"]
)


@router.get("/patient/{patient_id}")
def get_patient_context(
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

    encounters = db.query(Encounter).filter(
        Encounter.patient_id == patient_id
    ).all()

    clinical_history = db.query(ClinicalHistory).filter(
        ClinicalHistory.patient_id == patient_id
    ).all()

    medications = db.query(Medication).filter(
        Medication.patient_id == patient_id
    ).all()

    allergies = db.query(Allergy).filter(
        Allergy.patient_id == patient_id
    ).all()

    investigations = db.query(Investigation).filter(
        Investigation.patient_id == patient_id
    ).all()

    timeline = db.query(TimelineEvent).filter(
        TimelineEvent.patient_id == patient_id
    ).order_by(
        TimelineEvent.event_date.desc()
    ).all()

    conflicts = db.query(Conflict).filter(
        Conflict.patient_id == patient_id
    ).all()

    return {
        "patient": patient,
        "encounters": encounters,
        "clinical_history": clinical_history,
        "medications": medications,
        "allergies": allergies,
        "investigations": investigations,
        "timeline": timeline,
        "conflicts": conflicts
    }
@router.get("/state/{patient_id}")
def get_patient_state(
    patient_id: int,
    db: Session = Depends(get_db)
):
    state = build_patient_state(
        patient_id,
        db
    )

    if not state:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    return state
