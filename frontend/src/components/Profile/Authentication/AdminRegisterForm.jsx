import React from "react";
import { useState } from "react";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import { AuthFormGlobalState } from "../../Layout/AuthFormGlobalState";
import "./authForms.css";

export default function AdminRegisterForm() {
  const { setCurrentUserData } = UserGlobalState();

  const { setAuthForm } = AuthFormGlobalState();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(null);

  const submitfunc = (e) => {
    console.log("Submitted");
    e.preventDefault();
    // setCurrentUserData({
    //   'username': 'SamC',
    //   'firstName': 'Sam',
    //   'lastName': 'Convoy',
    //   'isAdmin': 0,
    //   'isDataEntryOperator': 0,
    //   'bookingsCount': 15,
    //   'category': 'Frequent'
    // });
  };

  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9_@]{3,30}$/;
    if (usernameRegex.test(username) === false) {
      setUsernameError(`
          Username must be at least 3 characters long
          and can only contain letters, numbers, _ and @
      `);
    } else {
      setUsernameError(null);
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^[a-zA-Z0-9@]{4,30}$/;
    if (passwordRegex.test(password) === false) {
      setPasswordError(`
          Password must be at least 4 characters long
          and can only contain letters, numbers and @
      `);
    } else {
      setPasswordError(null);
    }
  };

  const validateFirstName = () => {
    const firstNameRegex = /^[A-Za-z]{1,30}$/;
    if (firstNameRegex.test(firstName) === false) {
      setFirstNameError(`
          First Name cannot be empty and can only contain letters
      `);
    } else {
      setFirstNameError(null);
    }
  };

  const validateLastName = () => {
    const lastNameRegex = /^[A-Za-z]{1,30}$/;
    if (lastNameRegex.test(lastName) === false) {
      setLastNameError(`
          Last Name cannot be empty and can only contain letters
      `);
    } else {
      setLastNameError(null);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  return (
    <div className="registerFormWrapper">
      <form className="authForm" onSubmit={submitfunc}>
        <span className="header">Admin Register</span>
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
        <div className="formField">
          <input
            className="shortInput"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            onBlur={validateFirstName}
          />
          {firstNameError && <div className="errorText">{firstNameError}</div>}
        </div>
        <div className="formField">
          <input
            className="shortInput"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            onBlur={validateLastName}
          />
          {lastNameError && <div className="errorText">{lastNameError}</div>}
        </div>
        <button className="submitBtn" type="submit">
          Register
        </button>
      </form>
      <div className="swap">
        Do you already have an account?&nbsp;
        <button className="swapBtn" onClick={() => setAuthForm("admin-login")}>
          Login
        </button>
      </div>
    </div>
  );
}
