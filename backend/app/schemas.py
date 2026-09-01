from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import date


class PatientCreate(BaseModel):
    name: str
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    language: Optional[str] = "English"
    contact: Optional[str] = None
    abha_id: Optional[str] = None


class PatientResponse(BaseModel):
    id: int
    name: str
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    language: Optional[str] = None
    contact: Optional[str] = None
    abha_id: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


