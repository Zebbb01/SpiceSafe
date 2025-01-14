import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import './Signup.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons
import Spinner from '../Spinner/Spinner'; // Import the Spinner component
import lock from '../../assets/padlock.png';

const Signup = ({ setIsLogin }) => {
  const [name, setName] = useState(""); // Add state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
  const [loading, setLoading] = useState(false); // Add loading state

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*_()-,.?":{}|<>]/.test(password)) strength += 1;
    return strength;
  };

  const getStrengthLabel = (strength) => {
    switch (strength) {
      case 1: return "Too Short";
      case 2: return "Weak";
      case 3: return "Medium";
      case 4: return "Strong";
      case 5: return "Very Strong";
      default: return "Too Short";
    }
  };

  const getStrengthClass = (strength) => {
    switch (strength) {
      case 1: return "too-short";
      case 2: return "weak";
      case 3: return "medium";
      case 4: return "strong";
      case 5: return "very-strong";
      default: return "";
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
    setErrorMessage("Please enter a valid email");
    return;
    }
    setLoading(true);
    try {
      const response = await axios.post('https://spicesafe.onrender.com/signup', { name, email, password }); // Domain HOSTED ON RENDER
      // const response = await axios.post('http://localhost:5000/signup', { name, email, password }); // Domain ON LOCALHOST
      console.log("Signup Response.", response.data);
      setErrorMessage("");
      toast.success("Signup successful!");
      setIsLogin(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false); // Stop spinner after API call completes
    }
  };

  return (
    <div className="signup-container">
      {loading ? (
        <Spinner />  // Show spinner when loading
      ) : (
      <form className="form-container" onSubmit={handleSignup}>
        <div className="title-container">
          
          <h3 className="title">SpiceSafe</h3>
          <img src={lock} alt="Padlock Icon" className="padlock-icon" /> 
        </div>
        <hr className="divider" />
          <h2 className="authText">Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          
          {password && (
            <div className="password-strength">
              <div
                className={`strength-bar ${getStrengthClass(passwordStrength)}`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              />
              <span>{getStrengthLabel(passwordStrength)}</span>
              {errorMessage && <div className="error-message2">{errorMessage}</div>}
            </div>
          )}
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default Signup;
