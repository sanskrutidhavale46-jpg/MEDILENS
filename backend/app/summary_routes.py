from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import (
    Patient,
    ClinicalHistory,
    Medication,
    Allergy,
    Investigation,
    TimelineEvent,
    Conflict
)
from app.safety_engine import check_patient_safety

router = APIRouter(
    prefix="/summary",
    tags=["Clinical Summary"]
)


@router.get("/patient/{patient_id}")
def get_patient_summary(
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

    history = db.query(ClinicalHistory).filter(
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
        Conflict.patient_id == patient_id,
        Conflict.status == "open"
    ).all()

    return {
        "patient": {
            "id": patient.id,
            "name": patient.name,
            "date_of_birth": patient.date_of_birth,
            "gender": patient.gender,
            "language": patient.preferred_language
        },
        "summary": {
            "clinical_history_count": len(history),
            "active_medications": [
                medication.medication_name
                for medication in medications
                if medication.status == "active"
            ],
            "allergies": [
                allergy.substance
                for allergy in allergies
            ],
            "investigations": [
                {
                    "test": investigation.test_name,
                    "value": investigation.value,
                    "unit": investigation.unit,
                    "date": investigation.test_date
                }
                for investigation in investigations
            ],
            "recent_events": [
                {
                    "type": event.event_type,
                    "date": event.event_date,
                    "description": event.description
                }
                for event in timeline[:5]
            ],
            "open_conflicts": len(conflicts)
        }
    }
@router.get("/safety/{patient_id}")
def get_patient_safety(
    patient_id: int,
    db: Session = Depends(get_db)
):
    safety = check_patient_safety(
        patient_id,
        db
    )

    if not safety:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    return safety
