from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey,
    Float,
)
from datetime import datetime
from sqlalchemy.orm import relationship

from .database import Base


# =========================
# PATIENT
# =========================

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    date_of_birth = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    preferred_language = Column(String, nullable=True)
    abha_reference = Column(String, nullable=True)
    contact=Column(String,nullable=True)

    created_at = Column(DateTime)

    encounters = relationship(
        "Encounter",
        back_populates="patient"
    )

    clinical_facts = relationship(
        "ClinicalFact",
        back_populates="patient"
    )

    medications = relationship(
        "Medication",
        back_populates="patient"
    )

    allergies = relationship(
        "Allergy",
        back_populates="patient"
    )

    investigations = relationship(
        "Investigation",
        back_populates="patient"
    )

    documents = relationship(
        "Document",
        back_populates="patient"
    )

    timeline_events = relationship(
        "TimelineEvent",
        back_populates="patient"
    )


# =========================
# ENCOUNTER / VISIT
# =========================

class Encounter(Base):
    __tablename__ = "encounters"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    doctor_id = Column(Integer, nullable=True)

    visit_date = Column(DateTime)

    department = Column(String, nullable=True)

    status = Column(String, default="active")

    patient = relationship(
        "Patient",
        back_populates="encounters"
    )


# =========================
# CLINICAL FACT
# =========================

class ClinicalFact(Base):
    __tablename__ = "clinical_facts"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    encounter_id = Column(
        Integer,
        ForeignKey("encounters.id"),
        nullable=True
    )

    category = Column(String, nullable=False)

    fact_type = Column(String, nullable=False)

    value = Column(Text, nullable=False)

    status = Column(String, default="active")

    confidence = Column(Float, nullable=True)

    source_id = Column(
        Integer,
        ForeignKey("sources.id"),
        nullable=True
    )

    verification_status = Column(
        String,
        default="unverified"
    )

    created_at = Column(DateTime)

    patient = relationship(
        "Patient",
        back_populates="clinical_facts"
    )


# =========================
# MEDICATION
# =========================

class Medication(Base):
    __tablename__ = "medications"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    medication_name = Column(String, nullable=False)

    strength = Column(String, nullable=True)

    dose = Column(String, nullable=True)

    frequency = Column(String, nullable=True)

    route = Column(String, nullable=True)

    status = Column(
        String,
        default="unknown"
    )

    source_id = Column(
        Integer,
        ForeignKey("sources.id"),
        nullable=True
    )

    verification_status = Column(
        String,
        default="unverified"
    )

    patient = relationship(
        "Patient",
        back_populates="medications"
    )


# =========================
# ALLERGY
# =========================

class Allergy(Base):
    __tablename__ = "allergies"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    substance = Column(String, nullable=False)

    reaction = Column(Text, nullable=True)

    severity = Column(String, nullable=True)

    source_id = Column(
        Integer,
        ForeignKey("sources.id"),
        nullable=True
    )

    verification_status = Column(
        String,
        default="unverified"
    )

    patient = relationship(
        "Patient",
        back_populates="allergies"
    )


# =========================
# INVESTIGATION
# =========================

class Investigation(Base):
    __tablename__ = "investigations"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    test_name = Column(String, nullable=False)

    value = Column(String, nullable=True)

    unit = Column(String, nullable=True)

    reference_range = Column(String, nullable=True)

    test_date = Column(DateTime, nullable=True)

    source_id = Column(
        Integer,
        ForeignKey("sources.id"),
        nullable=True
    )

    verification_status = Column(
        String,
        default="unverified"
    )

    patient = relationship(
        "Patient",
        back_populates="investigations"
    )


# =========================
# DOCUMENT
# =========================

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    file_name = Column(String, nullable=False)

    document_type = Column(String, nullable=True)

    document_date = Column(DateTime, nullable=True)

    storage_reference = Column(String, nullable=True)

    ocr_status = Column(
        String,
        default="pending"
    )
    ocr_text = Column(
        Text,
        nullable=True
    )

    created_at = Column(DateTime)

    patient = relationship(
        "Patient",
        back_populates="documents"
    )


# =========================
# TIMELINE EVENT
# =========================

class TimelineEvent(Base):
    __tablename__ = "timeline_events"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    event_type = Column(String, nullable=False)

    event_date = Column(DateTime, nullable=True)

    description = Column(Text, nullable=False)

    source_id = Column(
        Integer,
        ForeignKey("sources.id"),
        nullable=True
    )

    verification_status = Column(
        String,
        default="unverified"
    )

    patient = relationship(
        "Patient",
        back_populates="timeline_events"
    )


# =========================
# SOURCE / PROVENANCE
# =========================

class Source(Base):
    __tablename__ = "sources"

    id = Column(Integer, primary_key=True, index=True)

    source_type = Column(String, nullable=False)

    source_reference = Column(String, nullable=True)

    created_at = Column(DateTime)


# =========================
# CONFLICT / DISCREPANCY
# =========================

class Conflict(Base):
    __tablename__ = "conflicts"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    fact_a = Column(Integer, nullable=True)

    fact_b = Column(Integer, nullable=True)

    conflict_type = Column(String, nullable=False)

    status = Column(
        String,
        default="open"
    )

    resolution = Column(Text, nullable=True)

    resolved_by = Column(Integer, nullable=True)


# =========================
# CONSENT
# =========================

class ClinicalHistory(Base):
    __tablename__ = "clinical_histories"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    encounter_id = Column(Integer, ForeignKey("encounters.id"), nullable=False)

    chief_complaint = Column(Text, nullable=True)
    hpi = Column(Text, nullable=True)
    past_medical_history = Column(Text, nullable=True)
    past_surgical_history = Column(Text, nullable=True)
    medication_history = Column(Text, nullable=True)
    allergy_history = Column(Text, nullable=True)
    family_history = Column(Text, nullable=True)
    personal_history = Column(Text, nullable=True)
    review_of_systems = Column(Text, nullable=True)

    source_type = Column(String, nullable=True)
    confidence = Column(String, nullable=True)
    verification_status = Column(
        String,
        nullable=False,
        default="unverified"
    )

    created_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )
