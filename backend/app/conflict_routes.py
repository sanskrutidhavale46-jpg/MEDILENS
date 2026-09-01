from app.conflict_engine import (check_medication_conflicts, check_allergy_medication_conflicts)
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Conflict, Patient

router = APIRouter(
    prefix="/conflicts",
    tags=["Conflicts"]
)


@router.post("/")
def create_conflict(
    patient_id: int,
    conflict_type: str,
    fact_a: int = None,
    fact_b: int = None,
    resolution: str = None,
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

    conflict = Conflict(
        patient_id=patient_id,
        fact_a=fact_a,
        fact_b=fact_b,
        conflict_type=conflict_type,
        status="open",
        resolution=resolution
    )

    db.add(conflict)
    db.commit()
    db.refresh(conflict)

    return conflict


@router.get("/patient/{patient_id}")
def get_patient_conflicts(
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

    conflicts = db.query(Conflict).filter(
        Conflict.patient_id == patient_id
    ).all()

    return conflicts
@router.post("/check/{patient_id}")
def check_patient_conflicts(
    patient_id: int,
    db: Session = Depends(get_db)
):
    medication_conflicts = check_medication_conflicts(
        patient_id,
        db
    )

    allergy_conflicts = check_allergy_medication_conflicts(
        patient_id,
        db
    )

    all_conflicts = (
        medication_conflicts +
        allergy_conflicts
    )

    return {
        "patient_id": patient_id,
        "conflicts_found": len(all_conflicts),
        "medication_conflicts": medication_conflicts,
        "allergy_medication_conflicts": allergy_conflicts
    }
