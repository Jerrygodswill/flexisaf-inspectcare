from PIL import Image
import streamlit as st
import google.generativeai as genai
import os

# 🔐 Configure Gemini API key
genai.configure(api_key="")

# Load Gemini Model
model = genai.GenerativeModel(model_name="models/gemini-pro")  # ✅ Correct model path

# 💡 Health Assistant logic
def health_assistant(symptoms: str) -> str:
    prompt = f"""
    You are a helpful medical assistant. A user reports the following symptoms: {symptoms}

    Provide:
    1. Common possible causes of these symptoms.
    2. Safe advice for next steps (rest, fluids, seek doctor etc.).
    3. A friendly note encouraging users to contact a healthcare provider if symptoms persist.

    Keep responses empathetic, simple, and non-alarming.
    """
    response = model.generate_content(prompt)
    return response.text

# 🎨 Streamlit UI Setup
st.set_page_config(page_title="Health Assistant", page_icon="🩺", layout="wide")

# 🌈 CSS Styling
st.markdown("""
    <style>
        .title {
            font-size: 3rem;
            color: #2c3e50;
            font-weight: bold;
            text-align: center;
        }
        .subheader {
            font-size: 1.2rem;
            color: #34495e;
            text-align: center;
            margin-bottom: 20px;
        }
    </style>
""", unsafe_allow_html=True)

# 📷 Load an image
image_path = "C:\\Users\\Lenovo\\Downloads\\health_image.jpg"  # ✅ Fixed path with double backslashes
if os.path.exists(image_path):
    image = Image.open(image_path)
    st.image(image, caption="🩺 Your Personal Health Assistant", width=600)
else:
    st.warning("Image not found at path: " + image_path)

# 🔧 Sidebar
st.sidebar.title("Health Assistant 🧠")
if os.path.exists(image_path):
    st.sidebar.image(image, width=200)
st.sidebar.markdown("### How to use:")
st.sidebar.markdown("1. Type your symptoms below.")
st.sidebar.markdown("2. Click the *Get Advice* button.")
st.sidebar.markdown("3. Read the AI-generated health advice.")

# 🧾 Main Title
st.markdown('<div class="title">Health Assistant</div>', unsafe_allow_html=True)
st.markdown("""
    <div class="subheader">
        Describe your symptoms and get personalized health suggestions. This is not a diagnosis but can help guide you toward the right next steps.
    </div>
""", unsafe_allow_html=True)

# 🩺 Input and Action
col1, col2 = st.columns([3, 2])

with col1:
    user_symptoms = st.text_area("Enter your symptoms:", height=200, placeholder="e.g. I have a headache and feel dizzy...")

with col2:
    if st.button("Get Advice"):
        if user_symptoms.strip() == "":
            st.error("Please enter your symptoms.")
        else:
            with st.spinner("Analyzing your symptoms..."):
                advice = health_assistant(user_symptoms)
                st.markdown("### 💬 AI Health Advice:")
                st.info(advice)
