import uuid
from app.models import (
    Document,
    Patient,
    ClinicalFact,
    Source,
    TimelineEvent
)
from app.fact_extractor import extract_clinical_facts
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from app.ocr_service import extract_text
import os
import shutil

from app.database import get_db

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
def upload_document(
    patient_id: int,
    document_type: str = None,
    file: UploadFile = File(...),
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

    safe_filename = f"{uuid.uuid4()}_{file.filename}"

    file_path = os.path.join(
        UPLOAD_DIR,
        safe_filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    document = Document(
        patient_id=patient_id,
        file_name=file.filename,
        document_type=document_type,
        storage_reference=file_path,
        ocr_status="pending",
        created_at=datetime.utcnow()
    )

    db.add(document)
    db.flush()

    timeline_event = TimelineEvent(
        patient_id=patient_id,
        event_type="document",
        event_date=datetime.utcnow(),
        description=f"Medical document uploaded: {file.filename}",
        verification_status="unverified"
    )

    db.add(timeline_event)
    db.commit()
    db.refresh(document)

    return document

@router.get("/patient/{patient_id}")
def get_patient_documents(
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

    documents = db.query(Document).filter(
        Document.patient_id == patient_id
    ).order_by(
        Document.created_at.desc()
    ).all()

    return {
        "patient_id": patient_id,
        "documents": [
            {
                "id": document.id,
                "file_name": document.file_name,
                "document_type": document.document_type,
                "document_date": document.document_date,
                "ocr_status": document.ocr_status,
                "ocr_text": document.ocr_text,
                "created_at": document.created_at
            }
            for document in documents
        ]
    }

@router.post("/{document_id}/ocr")
def process_document_ocr(
    document_id: int,
    db: Session = Depends(get_db)
):
    document = db.query(Document).filter(
        Document.id == document_id
    ).first()

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )
    document.ocr_status = "processing"
    db.commit()

    try:
        text = extract_text(
            document.storage_reference
        )
        document.ocr_text = text
        document.ocr_status = "processed"

        db.commit()
        db.refresh(document)

        return {
            "document_id": document.id,
            "ocr_status": document.ocr_status,
            "text": text
        }

    except Exception as e:
        document.ocr_status = "failed"
        db.commit()

        raise HTTPException(
            status_code=500,
            detail=f"OCR failed: {str(e)}"
        )
@router.get("/{document_id}/facts")
def extract_document_facts(
    document_id: int,
    db: Session = Depends(get_db)
):
    document = db.query(Document).filter(
        Document.id == document_id
    ).first()

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    if not document.storage_reference:
        raise HTTPException(
            status_code=400,
            detail="Document has no storage reference"
        )

    text = extract_text(
        document.storage_reference
    )
    

    facts = extract_clinical_facts(text)

    return {
        "document_id": document.id,
        "facts": facts
    }
@router.post("/{document_id}/import-facts")
def import_document_facts(
    document_id: int,
    db: Session = Depends(get_db)
):
    document = db.query(Document).filter(
        Document.id == document_id
    ).first()

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    if not document.storage_reference:
        raise HTTPException(
            status_code=400,
            detail="Document has no storage reference"
        )

    text = extract_text(
        document.storage_reference
    )

    facts = extract_clinical_facts(text)

    imported_conditions = []

    for condition in facts["conditions"]:
        imported_conditions.append({
            "condition": condition,
            "verification_status": "unverified",
            "source_document_id": document.id
        })

    return {
        "document_id": document.id,
        "patient_id": document.patient_id,
        "imported": {
            "conditions": imported_conditions
        },
        "message": "Facts prepared for verification"
    }
@router.post("/{document_id}/create-facts")
def create_document_facts(
    document_id: int,
    db: Session = Depends(get_db)
):
    document = db.query(Document).filter(
        Document.id == document_id
    ).first()

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )
   
    if not document.storage_reference:
        raise HTTPException(
            status_code=400,
            detail="Document has no storage reference"
        )

    text = extract_text(
        document.storage_reference
    )

    facts = extract_clinical_facts(text)

    source = db.query(Source).filter(
        Source.source_type == "document",
        Source.source_reference == document.file_name
    ).first()

    if not source:
        source = Source(
            source_type="document",
            source_reference=document.file_name,
            created_at=datetime.utcnow()
        )

        db.add(source)
        db.flush()
    created_facts = []

    for condition in facts["conditions"]:
        existing_fact = db.query(ClinicalFact).filter(
            ClinicalFact.patient_id == document.patient_id,
            ClinicalFact.category == "condition",
            ClinicalFact.fact_type == "diagnosis",
            ClinicalFact.value == condition
        ).first()

        if existing_fact:
            continue

        clinical_fact = ClinicalFact(
            patient_id=document.patient_id,
            encounter_id=None,
            category="condition",
            fact_type="diagnosis",
            value=condition,
            status="active",
            confidence=None,
            source_id=source.id,
            verification_status="unverified"
        )

        db.add(clinical_fact)
        db.flush()

        created_facts.append({
            "id": clinical_fact.id,
            "category": clinical_fact.category,
            "fact_type": clinical_fact.fact_type,
            "value": clinical_fact.value,
            "verification_status": clinical_fact.verification_status
        })

    db.commit()

    return {
        "document_id": document.id,
        "patient_id": document.patient_id,
        "created_facts": created_facts
    }


@router.patch("/facts/{fact_id}/verify")
def verify_clinical_fact(
    fact_id: int,
    verification_status: str,
    db: Session = Depends(get_db)
):
    if verification_status not in ["verified", "rejected"]:
        raise HTTPException(
            status_code=400,
            detail="Status must be 'verified' or 'rejected'"
        )

    fact = db.query(ClinicalFact).filter(
        ClinicalFact.id == fact_id
    ).first()

    if not fact:
        raise HTTPException(
            status_code=404,
            detail="Clinical fact not found"
        )

    fact.verification_status = verification_status
    if verification_status == "rejected":
        fact.status = "rejected"
    else:
        fact.status = "active"

    db.commit()
    db.refresh(fact)

    return {
        "id": fact.id,
        "value": fact.value,
        "status": fact.status,
        "source_id": fact.source_id,
        "verification_status": fact.verification_status
    }
@router.get("/facts/patient/{patient_id}")
def get_patient_facts(
    patient_id: int,
    db: Session = Depends(get_db)
):
    facts = db.query(ClinicalFact).filter(
        ClinicalFact.patient_id == patient_id
    ).all()

    return {
        "patient_id": patient_id,
        "facts": [
            {
                "id": fact.id,
                "category": fact.category,
                "fact_type": fact.fact_type,
                "value": fact.value,
                "status": fact.status,
                "confidence": fact.confidence,
                "source_id": fact.source_id,
                "verification_status": fact.verification_status
            }
            for fact in facts
        ]
    }
@router.get("/{document_id}/status")
def get_document_status(
    document_id: int,
    db: Session = Depends(get_db)
):
    document = db.query(Document).filter(
        Document.id == document_id
    ).first()

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    return {
        "document_id": document.id,
        "file_name": document.file_name,
        "ocr_status": document.ocr_status
    }
@router.get("/{document_id}/ocr-text")
def get_document_ocr_text(
    document_id: int,
    db: Session = Depends(get_db)
):
    document = db.query(Document).filter(
        Document.id == document_id
    ).first()

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    return {
        "document_id": document.id,
        "file_name": document.file_name,
        "ocr_status": document.ocr_status,
        "ocr_text": document.ocr_text
    }
@router.get("/facts/patient/{patient_id}/verified")
def get_verified_patient_facts(
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

    facts = db.query(ClinicalFact).filter(
        ClinicalFact.patient_id == patient_id,
        ClinicalFact.verification_status == "verified",
        ClinicalFact.status == "active"
    ).all()

    return {
        "patient_id": patient_id,
        "facts": [
            {
                "id": fact.id,
                "category": fact.category,
                "fact_type": fact.fact_type,
                "value": fact.value,
                "confidence": fact.confidence,
                "source_id": fact.source_id
            }
            for fact in facts
        ]
    }
@router.get("/facts/patient/{patient_id}/pending")
def get_pending_patient_facts(
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

    facts = db.query(ClinicalFact).filter(
        ClinicalFact.patient_id == patient_id,
        ClinicalFact.verification_status == "unverified",
        ClinicalFact.status == "active"
    ).all()

    return {
        "patient_id": patient_id,
        "facts": [
            {
                "id": fact.id,
                "category": fact.category,
                "fact_type": fact.fact_type,
                "value": fact.value,
                "confidence": fact.confidence,
                "source_id": fact.source_id
            }
            for fact in facts
        ]
    }
@router.get("/facts/patient/{patient_id}/rejected")
def get_rejected_patient_facts(
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

    facts = db.query(ClinicalFact).filter(
        ClinicalFact.patient_id == patient_id,
        ClinicalFact.verification_status == "rejected",
        ClinicalFact.status == "rejected"
    ).all()

    return {
        "patient_id": patient_id,
        "facts": [
            {
                "id": fact.id,
                "category": fact.category,
                "fact_type": fact.fact_type,
                "value": fact.value,
                "source_id": fact.source_id
            }
            for fact in facts
        ]
    }
@router.get("/facts/{fact_id}")
def get_clinical_fact(
    fact_id: int,
    db: Session = Depends(get_db)
):
    fact = db.query(ClinicalFact).filter(
        ClinicalFact.id == fact_id
    ).first()

    if not fact:
        raise HTTPException(
            status_code=404,
            detail="Clinical fact not found"
        )

    return {
        "id": fact.id,
        "patient_id": fact.patient_id,
        "encounter_id": fact.encounter_id,
        "category": fact.category,
        "fact_type": fact.fact_type,
        "value": fact.value,
        "status": fact.status,
        "confidence": fact.confidence,
        "source_id": fact.source_id,
        "verification_status": fact.verification_status
    }
