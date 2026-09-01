from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import get_db
from .models import Patient
from .schemas import PatientCreate, PatientResponse


router = APIRouter(prefix="/patients", tags=["Patients"])


@router.post("/", response_model=PatientResponse)
def create_patient(patient: PatientCreate, db: Session = Depends(get_db)):
    new_patient = Patient(
        name=patient.name,
        date_of_birth=patient.date_of_birth,
        gender=patient.gender,
        preferred_language=patient.language,
        contact=patient.contact,
        abha_reference=patient.abha_id,
    )

    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)

    return new_patient
