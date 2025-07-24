import React from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb, Target, HeartHandshake } from "lucide-react";
import "../pages/landingpage.css";

import logo from "../assets/logo-inspectcare.png";
import heroImage from "../assets/flexisaf-logo.jpg";
import twitterIcon from "../assets/twitter.png";
import facebookIcon from "../assets/facebook.png";
import linkedinIcon from "../assets/linkedin.png";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(path);
    } else {
      alert("Please log in to access this feature.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    navigate("/login");
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo-landingpage">
          <img src={logo} alt="InspectCare logo" />
          InspectCare
        </h1>
        <nav className="nav-buttons">
          <>
            <button
              className="nav-btn dashboard blink"
              onClick={() => {
                const token = localStorage.getItem("token");
                if (token) {
                  navigate("/dashboard");
                } else {
                  alert("Please log in to access the dashboard.");
                  navigate("/login");
                }
              }}
            >
              Dashboard
            </button>

            {localStorage.getItem("token") ? (
              <button className="nav-btn logout" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <button
                  className="nav-btn login"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="nav-btn signup"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </>
            )}
          </>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text-block">
            <h2 className="hero-title">Your Digital Health Ally</h2>
            <p className="hero-text">
              Monitor symptoms, stay ahead of health risks, and take charge of
              your well-being with InspectCare.
            </p>
            <button
              className="get-started-btn"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
            <div className="hero-features">
              <div>🫀 Cardiovascular Tracking</div>
              <div>⏱️ Real-Time Alerts</div>
              <div>📊 Personalized Insights</div>
            </div>
          </div>
          <div className="hero-img-container">
            <img src={heroImage} alt="Health monitoring" className="hero-img" />
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="info-section" id="about-us">
        <div className="info-card">
          <Lightbulb className="info-icon blue" />
          <h3 className="info-title blue">About Us</h3>
          <p className="info-text">
            InspectCare is an advanced symptom checker system for cardiovascular
            diseases, designed to assist users with early detection and
            proactive health management. Our target audience includes:
            individuals concerned about heart health, patients at risk,
            providers, and health-conscious users.
          </p>
        </div>
        <div className="info-card">
          <Target className="info-icon green" />
          <h3 className="info-title green">Our Mission</h3>
          <p className="info-text">
            Deliver proactive health solutions that empower everyday people with
            real-time insights.
          </p>
        </div>
        <div className="info-card">
          <HeartHandshake className="info-icon purple" />
          <h3 className="info-title purple">Our Vision</h3>
          <p className="info-text">
            A healthier world where early detection and digital care are
            accessible to all.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h2 className="footer-logo">InspectCare</h2>
            <p className="footer-description">
              Hassle-free health monitoring and proactive symptom checking.
            </p>
          </div>

          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li>
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="footer-link-btn"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/medreminder")}
                  className="footer-link-btn"
                >
                  Alerts & Reminders
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#about-us" className="footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-column">
          <h4>SUBSCRIBE TO OUR NEWSLETTER</h4>
          <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="subscribe-input"
              placeholder="Your name"
              required
            />
            <input
              type="email"
              className="subscribe-input"
              placeholder="Your email"
              required
            />
            <button type="submit" className="subscribe-button">
              Subscribe
            </button>
          </form>
        </div>

        <div className="footer-socials">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitterIcon} alt="Twitter" className="icon" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebookIcon} alt="Facebook" className="icon" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinIcon} alt="LinkedIn" className="icon" />
          </a>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} InspectCare. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Code of Conduct</a>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <a href="#" className="back-to-top-btn" title="Back to Top">
        ⬆
      </a>
    </div>
  );
};

export default LandingPage;
