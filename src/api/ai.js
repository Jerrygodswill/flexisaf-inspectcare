export const queryAI = async (symptom) => {
  try {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symptom }),
    });

    if (!response.ok) {
      throw new Error("AI API request failed.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("AI API error:", error);
    throw error;
  }
};