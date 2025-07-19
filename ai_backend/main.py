from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env
env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=env_path)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = "llama3-8b-8192"

# FastAPI app setup
app = FastAPI(title="Health Chatbot API")

# CORS setup
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class SymptomInput(BaseModel):
    symptoms: str

class Reminder(BaseModel):
    user: str
    medicine: str
    time: str

class HealthRecord(BaseModel):
    name: str
    age: int
    allergies: list
    medical_history: list

class AIRequest(BaseModel):
    prompt: str

# Routes
@app.get("/")
def home():
    return {"message": "🤖 Welcome to the Health Chatbot API!"}

@app.post("/check_symptoms")
def check_symptoms_api(data: SymptomInput):
    return {"result": f"Checked symptoms: {data.symptoms}"}

@app.get("/health_tip")
def health_tip():
    tips = [
        "💧 Drink at least 8 glasses of water daily",
        "🛌 Get 7–9 hours of sleep every night",
        "🚶‍♀️ Walk or exercise for 30 mins a day",
    ]
    return {"tip": random.choice(tips)}

@app.post("/set_reminder")
def set_reminder(reminder: Reminder):
    return {
        "response": f"Reminder set for {reminder.user} to take {reminder.medicine} at {reminder.time}"
    }

@app.post("/book_appointment")
def book_appointment(name: str, date: str, time: str):
    return {
        "response": f"Appointment booked for {name} on {date} at {time}"
    }

@app.post("/mental_health_check")
def mental_health_check(score: int):
    if score > 7:
        return {"advice": "You're doing great! Keep it up 😊"}
    elif score > 4:
        return {"advice": "Try relaxing activities or speak with someone you trust."}
    else:
        return {"advice": "Please talk to a mental health professional. ❤️"}

@app.post("/record_health")
def record_health(record: HealthRecord):
    return {"message": "Health record saved ✅", "record": record}

@app.post("/ai-query")
def ai_query(data: AIRequest):
    try:
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": GROQ_MODEL,
            "messages": [
                {"role": "system", "content": "You are a helpful health assistant."},
                {"role": "user", "content": data.prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 300
        }
        response = requests.post(GROQ_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        result = response.json()
        return {"response": result["choices"][0]["message"]["content"].strip()}
    except Exception as e:
        return {"error": str(e)}
