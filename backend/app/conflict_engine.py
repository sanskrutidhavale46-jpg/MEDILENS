from sqlalchemy.orm import Session

from app.models import Medication, Allergy, Conflict


def check_medication_conflicts(
    patient_id: int,
    db: Session
):
    medications = db.query(Medication).filter(
        Medication.patient_id == patient_id
    ).all()

    conflicts_found = []

    for i in range(len(medications)):
        for j in range(i + 1, len(medications)):

            med_a = medications[i]
            med_b = medications[j]

            same_medicine = (
                med_a.medication_name.strip().lower()
                == med_b.medication_name.strip().lower()
            )

            if not same_medicine:
                continue

            different_status = (
                med_a.status != med_b.status
            )

            different_dose = (
                med_a.dose != med_b.dose
                or med_a.strength != med_b.strength
                or med_a.frequency != med_b.frequency
            )

            if different_status or different_dose:

                conflict = Conflict(
                    patient_id=patient_id,
                    fact_a=med_a.id,
                    fact_b=med_b.id,
                    conflict_type="medication_discrepancy",
                    status="open"
                )

                db.add(conflict)
                conflicts_found.append(conflict)

    db.commit()

    for conflict in conflicts_found:
        db.refresh(conflict)

    return conflicts_found
def check_allergy_medication_conflicts(
    patient_id: int,
    db: Session
):
    medications = db.query(Medication).filter(
        Medication.patient_id == patient_id
    ).all()

    allergies = db.query(Allergy).filter(
        Allergy.patient_id == patient_id
    ).all()

    conflicts_found = []

    for medication in medications:
        for allergy in allergies:

            medication_name = medication.medication_name.strip().lower()
            substance = allergy.substance.strip().lower()

            if medication_name == substance:

                conflict = Conflict(
                    patient_id=patient_id,
                    fact_a=medication.id,
                    fact_b=allergy.id,
                    conflict_type="allergy_medication_conflict",
                    status="open"
                )

                db.add(conflict)
                conflicts_found.append(conflict)

    db.commit()

    for conflict in conflicts_found:
        db.refresh(conflict)

    return conflicts_found
