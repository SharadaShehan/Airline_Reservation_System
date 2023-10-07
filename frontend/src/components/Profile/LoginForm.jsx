import React from "react";
import { useState } from "react";
import { UserGlobalState } from "../Layout/UserGlobalState";
import { BookingStepGlobalState } from "../Layout/BookingStepGlobalState";
import "./authForms.css";

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export default function LoginForm() {
  const { setCurrentUserData } = UserGlobalState();
  const { setBookingStep } = BookingStepGlobalState();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const submitfunc = (e) => {
    console.log("Submitted");
    e.preventDefault();
    setCurrentUserData({
      username: "JohnD",
      firstName: "John",
      lastName: "Doe",
      isAdmin: 1,
      isDataEntryOperator: 0,
      bookingsCount: 0,
      category: "General",
    });
    setBookingStep("seatReserve");
  };

  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9_@]{3,30}$/;
    if (usernameRegex.test(username) === false) {
      setUsernameError(`
          Enter a valid username
      `);
    } else {
      setUsernameError(null);
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^[a-zA-Z0-9@]{4,30}$/;
    if (passwordRegex.test(password) === false) {
      setPasswordError(`
          Enter a valid password
      `);
    } else {
      setPasswordError(null);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="loginFormWrapper">
      <form className="authForm" onSubmit={submitfunc}>
        <span className="header">Log in</span>
        <div className="formField">
          <input
            className="shortInput"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            onBlur={validateUsername}
          />
          {usernameError && <div className="errorText">{usernameError}</div>}
        </div>
        <div className="formField">
          <input
            className="shortInput"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={validatePassword}
          />
          {passwordError && <div className="errorText">{passwordError}</div>}
        </div>
        <button className="submitBtn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}
