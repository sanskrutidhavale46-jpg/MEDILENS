from sqlalchemy.orm import Session

from app.models import (
    Patient,
    ClinicalHistory,
    Medication,
    Allergy,
    Investigation,
    TimelineEvent,
    Conflict
)


def build_patient_state(
    patient_id: int,
    db: Session
):
    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    if not patient:
        return None

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
        "patient_id": patient.id,
        "demographics": {
            "name": patient.name,
            "date_of_birth": patient.date_of_birth,
            "gender": patient.gender,
            "language": patient.language,
            "contact": patient.contact
        },
        "clinical_history": history,
        "medications": medications,
        "allergies": allergies,
        "investigations": investigations,
        "timeline": timeline,
        "open_conflicts": conflicts
    }
