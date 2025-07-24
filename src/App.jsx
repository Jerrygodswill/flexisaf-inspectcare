import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import Symptoms from "./pages/Symptoms";
import Result from "./pages/Resultpage";
import MedicationReminder from "./pages/MedicationReminder";
import MedicationSummary from "./pages/MedicationSummary";
import BookAppointmentpage from "./pages/BookAppointmentpage";
import BookingConfirmation from "./pages/BookingConfirmation";
import AmbulanceBooking from "./pages/AmbulanceBooking";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/Landingpage";
import "./App.css";

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [score, setScore] = useState(0);
  const [severity, setSeverity] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/symptoms"
          element={
            <ProtectedRoute>
              <Symptoms
                setSelectedSymptoms={setSelectedSymptoms}
                setScore={setScore}
                setSeverity={setSeverity}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result
                selectedSymptoms={selectedSymptoms}
                score={score}
                severity={severity}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/BookAppointmentpage"
          element={
            <ProtectedRoute>
              <BookAppointmentpage
                setAppointmentDate={setAppointmentDate}
                setAppointmentTime={setAppointmentTime}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/BookingConfirmation"
          element={
            <ProtectedRoute>
              <BookingConfirmation
                appointmentDate={appointmentDate}
                appointmentTime={appointmentTime}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MedicationReminder"
          element={
            <ProtectedRoute>
              <MedicationReminder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MedicationSummary"
          element={
            <ProtectedRoute>
              <MedicationSummary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ambulance"
          element={
            <ProtectedRoute>
              <AmbulanceBooking />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
