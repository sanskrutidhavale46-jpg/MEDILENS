from fastapi import FastAPI

from .database import engine, Base
from . import models

from .patient_routes import router as patient_router
from app.encounter_routes import router as encounter_router
from app.clinical_history_routes import router as clinical_history_router
from app.timeline_routes import router as timeline_router
from app.medication_routes import router as medication_router
from app.allergy_routes import router as allergy_router
from app.investigation_routes import router as investigation_router
from app.source_routes import router as source_router
from app.conflict_routes import router as conflict_router
from app.context_routes import router as context_router
from app.question_routes import router as question_router
from app.summary_routes import router as summary_router
from app.document_routes import router as document_router

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="MediLens API",
    description="AI-powered clinical context platform",
    version="1.0.0"
)


app.include_router(patient_router)
app.include_router(encounter_router)
app.include_router(clinical_history_router)
app.include_router(timeline_router)
app.include_router(medication_router)
app.include_router(allergy_router)
app.include_router(investigation_router)
app.include_router(source_router)
app.include_router(conflict_router)
app.include_router(context_router)
app.include_router(question_router)
app.include_router(summary_router)
app.include_router(document_router)


@app.get("/")
def root():
    return {
        "message": "MediLens Backend Running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected"
    }
