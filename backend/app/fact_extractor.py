import re


def extract_clinical_facts(text: str) -> dict:
    facts = {
        "conditions": [],
        "medications": [],
        "allergies": [],
        "labs": [],
        "vitals": [],
        "social_history": [],
        "family_history": []
    }

    text_lower = text.lower()

    # Conditions
    condition_keywords = [
        "obesity",
        "chest pain",
        "knee pain",
        "hypertension",
        "diabetes"
    ]

    for condition in condition_keywords:
        if condition in text_lower:
            facts["conditions"].append(condition)

    # Laboratory values
    lab_patterns = {
        "total_cholesterol": r"last tc:\s*(\d+)",
        "hdl": r"last hdl:\s*(\d+)",
        "a1g": r"last aig\s*(\d+)",
        "glucose": r"last glucose:\s*(\d+)"
    }

    for name, pattern in lab_patterns.items():
        match = re.search(pattern, text_lower)

        if match:
            facts["labs"].append({
                "name": name,
                "value": match.group(1)
            })

    # BMI
    bmi_match = re.search(
        r"bmi\s*=\s*([\d.]+)",
        text_lower
    )

    if bmi_match:
        facts["vitals"].append({
            "name": "BMI",
            "value": bmi_match.group(1)
        })

    # Weight
    weight_match = re.search(
        r"weight:\s*(\d+)\s*lbs",
        text_lower
    )

    if weight_match:
        facts["vitals"].append({
            "name": "weight",
            "value": weight_match.group(1),
            "unit": "lbs"
        })

    # Social history
    if "non-smoker" in text_lower:
        facts["social_history"].append(
            "Non-smoker"
        )

    if "wine" in text_lower:
        facts["social_history"].append(
            "Alcohol use: wine"
        )

    if "cycling" in text_lower:
        facts["social_history"].append(
            "Cycling"
        )

    if "weight lifting" in text_lower:
        facts["social_history"].append(
            "Weight lifting"
        )

    # Family history
    if "mother" in text_lower:
        facts["family_history"].append(
            "Mother: family history present"
        )

    if "father" in text_lower:
        facts["family_history"].append(
            "Father: family history present"
        )

    if "sibling" in text_lower:
        facts["family_history"].append(
            "Sibling: family history present"
        )

    return facts
