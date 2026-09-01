from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
from app.models import Investigation, Patient

router = APIRouter(
    prefix="/investigations",
    tags=["Investigations"]
)


@router.post("/")
def create_investigation(
    patient_id: int,
    test_name: str,
    value: str = None,
    unit: str = None,
    reference_range: str = None,
    test_date: datetime = None,
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

    investigation = Investigation(
        patient_id=patient_id,
        test_name=test_name,
        value=value,
        unit=unit,
        reference_range=reference_range,
        test_date=test_date or datetime.utcnow(),
        verification_status=verification_status,
        source_id=source_id
    )

    db.add(investigation)
    db.commit()
    db.refresh(investigation)

    return investigation


@router.get("/patient/{patient_id}")
def get_patient_investigations(
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

    investigations = db.query(Investigation).filter(
        Investigation.patient_id == patient_id
    ).order_by(
        Investigation.test_date.desc()
    ).all()

    return investigations
