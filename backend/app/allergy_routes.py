from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Allergy, Patient

router = APIRouter(
    prefix="/allergies",
    tags=["Allergies"]
)


@router.post("/")
def create_allergy(
    patient_id: int,
    substance: str,
    reaction: str = None,
    severity: str = None,
    verification_status: str = "unverified",
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

    allergy = Allergy(
        patient_id=patient_id,
        substance=substance,
        reaction=reaction,
        severity=severity,
        verification_status=verification_status
    )

    db.add(allergy)
    db.commit()
    db.refresh(allergy)

    return allergy


@router.get("/patient/{patient_id}")
def get_patient_allergies(
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

    allergies = db.query(Allergy).filter(
        Allergy.patient_id == patient_id
    ).all()

    return allergies
