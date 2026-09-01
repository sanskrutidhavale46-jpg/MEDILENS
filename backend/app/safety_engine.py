from sqlalchemy.orm import Session

from app.models import (
    Patient,
    Allergy,
    Medication,
    Investigation,
    Conflict
)


def check_patient_safety(
    patient_id: int,
    db: Session
):
    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    if not patient:
        return None

    alerts = []

    allergies = db.query(Allergy).filter(
        Allergy.patient_id == patient_id
    ).all()

    medications = db.query(Medication).filter(
        Medication.patient_id == patient_id
    ).all()

    investigations = db.query(Investigation).filter(
        Investigation.patient_id == patient_id
    ).all()

    conflicts = db.query(Conflict).filter(
        Conflict.patient_id == patient_id,
        Conflict.status == "open"
    ).all()

    # Allergy alerts
    for allergy in allergies:
        alerts.append({
            "type": "allergy",
            "severity": "high",
            "message": f"Known allergy: {allergy.substance}"
        })

    # Abnormal investigation alerts
    for investigation in investigations:
        if (
            investigation.reference_range
            and investigation.value
        ):
            alerts.append({
                "type": "investigation",
                "severity": "medium",
                "message": (
                    f"{investigation.test_name}: "
                    f"{investigation.value} "
                    f"{investigation.unit or ''} "
                    f"(reference: "
                    f"{investigation.reference_range})"
                )
            })

    # Open conflict alerts
    for conflict in conflicts:
        alerts.append({
            "type": "conflict",
            "severity": "high",
            "message": (
                f"Open clinical conflict: "
                f"{conflict.conflict_type}"
            )
        })

    return {
        "patient_id": patient_id,
        "alerts": alerts,
        "alert_count": len(alerts)
    }
