from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ClinicalHistory, Patient, Encounter

router = APIRouter(
    prefix="/clinical-history",
    tags=["Clinical History"]
)


@router.post("/")
def create_clinical_history(
    patient_id: int,
    encounter_id: int,
    chief_complaint: str = None,
    hpi: str = None,
    past_medical_history: str = None,
    past_surgical_history: str = None,
    medication_history: str = None,
    allergy_history: str = None,
    family_history: str = None,
    personal_history: str = None,
    review_of_systems: str = None,
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

    encounter = db.query(Encounter).filter(
        Encounter.id == encounter_id,
        Encounter.patient_id == patient_id
    ).first()

    if not encounter:
        raise HTTPException(
            status_code=404,
            detail="Encounter not found for this patient"
        )

    history = ClinicalHistory(
        patient_id=patient_id,
        encounter_id=encounter_id,
        chief_complaint=chief_complaint,
        hpi=hpi,
        past_medical_history=past_medical_history,
        past_surgical_history=past_surgical_history,
        medication_history=medication_history,
        allergy_history=allergy_history,
        family_history=family_history,
        personal_history=personal_history,
        review_of_systems=review_of_systems,
        source_type="patient",
        confidence="pending",
        verification_status="unverified"
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    return history


@router.get("/{history_id}")
def get_clinical_history(
    history_id: int,
    db: Session = Depends(get_db)
):
    history = db.query(ClinicalHistory).filter(
        ClinicalHistory.id == history_id
    ).first()

    if not history:
        raise HTTPException(
            status_code=404,
            detail="Clinical history not found"
        )

    return history


@router.get("/patient/{patient_id}")
def get_patient_clinical_history(
    patient_id: int,
    db: Session = Depends(get_db)
):
    histories = db.query(ClinicalHistory).filter(
        ClinicalHistory.patient_id == patient_id
    ).order_by(
        ClinicalHistory.created_at.desc()
    ).all()

    return histories
