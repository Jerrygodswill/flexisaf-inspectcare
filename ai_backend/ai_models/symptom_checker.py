# ai_models/symptom_checker.py

symptom_database = {
    "headache": ["Migraine", "Dehydration", "Tension Headache"],
    "fever": ["Flu", "Malaria", "Infection"],
    "dizziness": ["Low Blood Sugar", "Dehydration"],
    "cough": ["Common Cold", "Flu", "Bronchitis"],
    "fatigue": ["Anaemia", "Stress", "Dehydration"],
    "sore throat": ["Common Cold", "Strep Throat", "Tonsillitis"],
}

def check_symptoms(user_input):
    user_input = user_input.lower()
    matched_conditions = []

    for symptom in symptom_database:
        if symptom in user_input:
            matched_conditions.extend(symptom_database[symptom])

    matched_conditions = list(set(matched_conditions))

    if matched_conditions:
        return {
            "possible_conditions": matched_conditions,
            "note": "This is not a diagnosis. Please consult a healthcare professional."
        }
    else:
        return {
            "possible_conditions": [],
            "note": "No matching conditions found. Please see a healthcare professional."
        }
