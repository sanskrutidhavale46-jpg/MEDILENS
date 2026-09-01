from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Medication, Patient

router = APIRouter(
    prefix="/medications",
    tags=["Medications"]
)


@router.post("/")
def create_medication(
    patient_id: int,
    medication_name: str,
    strength: str = None,
    dose: str = None,
    frequency: str = None,
    route: str = None,
    status: str = "unknown",
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

    medication = Medication(
        patient_id=patient_id,
        medication_name=medication_name,
        strength=strength,
        dose=dose,
        frequency=frequency,
        route=route,
        status=status,
        verification_status=verification_status,
        source_id=source_id
    )

    db.add(medication)
    db.commit()
    db.refresh(medication)

    return medication


@router.get("/patient/{patient_id}")
def get_patient_medications(
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

    medications = db.query(Medication).filter(
        Medication.patient_id == patient_id
    ).all()

    return medications
