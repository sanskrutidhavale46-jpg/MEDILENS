from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import (
    Patient,
    ClinicalHistory,
    Medication,
    Allergy,
    Investigation
)

router = APIRouter(
    prefix="/questions",
    tags=["Adaptive Questions"]
)


@router.get("/patient/{patient_id}")
def get_next_questions(
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

    questions = []

    history = db.query(ClinicalHistory).filter(
        ClinicalHistory.patient_id == patient_id
    ).first()

    medications = db.query(Medication).filter(
        Medication.patient_id == patient_id
    ).all()

    allergies = db.query(Allergy).filter(
        Allergy.patient_id == patient_id
    ).all()

    investigations = db.query(Investigation).filter(
        Investigation.patient_id == patient_id
    ).all()

    # Clinical history checks
    if not history:
        questions.append({
            "priority": "high",
            "field": "chief_complaint",
            "question": "What is the patient's main health concern?"
        })
    else:
        if not history.hpi:
            questions.append({
                "priority": "high",
                "field": "hpi",
                "question": "Can you describe when the current problem started and how it has changed?"
            })

        if not history.allergy_history and not allergies:
            questions.append({
                "priority": "high",
                "field": "allergies",
                "question": "Does the patient have any known allergies?"
            })

    # Medication checks
    if not medications:
        questions.append({
            "priority": "high",
            "field": "medications",
            "question": "Is the patient currently taking any medications?"
        })
    else:
        for medication in medications:
            if not medication.dose:
                questions.append({
                    "priority": "medium",
                    "field": "medication_dose",
                    "question": f"What is the dose of {medication.medication_name}?"
                })

            if not medication.frequency:
                questions.append({
                    "priority": "medium",
                    "field": "medication_frequency",
                    "question": f"How often does the patient take {medication.medication_name}?"
                })

    # Allergy checks
    if not allergies:
        questions.append({
            "priority": "high",
            "field": "allergies",
            "question": "Does the patient have any known allergies?"
        })

    # Investigation checks
    if not investigations:
        questions.append({
            "priority": "medium",
            "field": "investigations",
            "question": "Are there any recent laboratory or diagnostic test results?"
        })

    return {
        "patient_id": patient_id,
        "questions": questions
    }
