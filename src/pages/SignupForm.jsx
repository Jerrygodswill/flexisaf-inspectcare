import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import flexisafLogo from "../assets/flexisaf-logo.jpg";
import "./form.css";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, email, username, password, confirmPassword, agreed } =
      formData;

    if (
      !fullname.trim() ||
      !email.trim() ||
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      return alert("All fields are required.");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    if (!agreed) {
      return alert("You must agree to the privacy policy.");
    }

    const userData = {
      fullname: fullname.trim(),
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
    };

    try {
      const res = await fetch(
        "https://health-inspector.onrender.com/api/user/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const text = await res.text();
      if (!res.ok) {
        throw new Error(text || "Signup failed");
      }

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert(`Signup failed: ${error.message}`);
    }
  };

  return (
    <div className="signup-layout">
      <div className="signup-left">
        <img
          src={flexisafLogo}
          alt="InspectCare"
          className="signup-illustration"
        />
        <h3 className="brand-name">InspectCare</h3>
      </div>

      <div className="signup-right">
        <form className="form-box" onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <p className="subtext">Join us for better health</p>

          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            onChange={handleChange}
            value={formData.fullname}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Set your password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter password"
            onChange={handleChange}
            value={formData.confirmPassword}
            required
          />

          <label className="checkbox-container">
            <input
              type="checkbox"
              name="agreed"
              onChange={handleChange}
              checked={formData.agreed}
              required
            />
            I agree with <a href="#">Privacy Policy</a>
          </label>

          <button type="submit" className="get-started-button">
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}
