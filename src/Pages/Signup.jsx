import React, { useEffect, useState } from "react";
import Image from "../assets/register2.jpg";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("mentee"); // Default role selection
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;

    // Ensure no fields are empty
    if (!username || !password || !confirmPassword || !resume) {
      toast.error("All fields are required, and a resume must be uploaded!");
      return;
    }

    // Validate password length and match
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    // Password strength validation (uppercase, lowercase, number, special character)
    const passwordStrengthRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
    if (!passwordStrengthRegex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
      );
      return;
    }

    // Ensure passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("resume", resume);

    try {
      await axios.post("http://localhost:3000/api/v1/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Registration successful");
      navigate("/Login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You are already logged in");
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="register-main">
      <div className="register-left">
        <img src={Image} alt="" />
      </div>

      <div className="register-right">
        <div className="register-right-container">
          <div className="register-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="register-center">
            <h2>Welcome to InterviewBuddy!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                required
              />

              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              {/* Resume Upload */}
              <div className="resume-upload">
                <label>Upload Resume</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  required
                />
              </div>

              {/* Mentor/Mentee Selection */}
              <div className="role-selection">
                <label className="role-label">Select Role</label>
                <div className="role-options">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="mentor"
                      checked={role === "mentor"}
                      onChange={() => setRole("mentor")}
                    />
                    Mentor
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="mentee"
                      checked={role === "mentee"}
                      onChange={() => setRole("mentee")}
                    />
                    Mentee
                  </label>
                </div>
              </div>

              <div className="register-center-buttons">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Already have an account? <Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
