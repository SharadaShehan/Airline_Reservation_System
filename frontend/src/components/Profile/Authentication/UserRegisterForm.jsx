import React from "react";
import { useState } from "react";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import { AuthFormGlobalState } from "../../Layout/AuthFormGlobalState";
import axios from "axios";
import "./authForms.css";

export default function UserRegisterForm() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
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
  const [passportID, setPassportID] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("default");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitfunc = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    // setCurrentUserData({
    //   'username': 'SamC',
    //   'firstName': 'Sam',
    //   'lastName': 'Convoy',
    //   'isAdmin': 0,
    //   'isDataEntryOperator': 0,
    //   'bookingsCount': 15,
    //   'category': 'Frequent'
    // });

    const postData = {
      username: username,
      password: password,
      firstname: firstName,
      lastname: lastName,
      passportID: passportID,
      address: address,
      birthDate: birthdate,
      gender: gender,
      email: email,
      contactNumber: contact,
    };

    try {
      const response = await axios.post(`${BaseURL}/user/register`, postData);
      console.log(response);
      if (response.status === 201) {
        setCurrentUserData(response.data);
        setAuthForm("user-login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isFormValid = () => {
    return (
      username !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      passportID !== "" &&
      address !== "" &&
      birthdate !== "" &&
      gender !== "" &&
      email !== "" &&
      contact !== "" &&
      confirmPassword !== "" &&
      usernameError === null &&
      passwordError === null &&
      firstNameError === null &&
      lastNameError === null
    );
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
    } else if (password !== confirmPassword) {
      setPasswordError(`
          Passwords do not match
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
      <form
        className="register-authForm"
        onSubmit={submitfunc}
        style={{ height: "600px", overflow: "auto" }}
      >
        <span className="header">Register</span>
        <div className="reg-formField">
          <div className="field-box">
            <label className="field-label">First Name</label>
            <input
              className="shortInput"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              onBlur={validateFirstName}
            />
          </div>
          {firstNameError && <div className="errorText">{firstNameError}</div>}
        </div>
        <div className="reg-formField">
          <div className="field-box">
            <label className="field-label">Last Name</label>
            <input
              className="shortInput"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              onBlur={validateLastName}
            />
          </div>
          {lastNameError && <div className="errorText">{lastNameError}</div>}
        </div>
        <div className="reg-formField">
          <div className="field-box">
            <label className="field-label">Username</label>
            <input
              className="shortInput"
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              onBlur={validateUsername}
            />
          </div>
          {usernameError && <div className="errorText">{usernameError}</div>}
        </div>
        <div className="reg-formField">
          <div className="field-box">
            <label className="field-label">Passport ID</label>
            <input
              className="shortInput"
              type="text"
              placeholder="Passport ID"
              value={passportID}
              onChange={(e) => setPassportID(e.target.value)}
              // onBlur={validateUsername}
            />
          </div>
          {/* {usernameError && <div className="errorText">{usernameError}</div>} */}
        </div>
        <div className="reg-formField">
          <div className="field-box">
            <label className="field-label">Address</label>
            <input
              className="shortInput"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              // onBlur={validateUsername}
            />
          </div>
          {/* {usernameError && <div className="errorText">{usernameError}</div>} */}
        </div>
        <div className="reg-formField">
          <div className="field-box">
            <label className="field-label">Birth Date</label>
            <input
              className="shortInput"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              // onBlur={validateUsername}
            />
          </div>
          {/* {usernameError && <div className="errorText">{usernameError}</div>} */}
        </div>
        <div className="reg-formField">
          <div className="field-box">
            <label className="field-label">Gender</label>
            <select
              className="auth-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option className="auth-option" disabled value={"default"}>
                Select gender
              </option>
              <option className="auth-option" value={"male"}>
                Male
              </option>
              <option className="auth-option" value={"female"}>
                Female
              </option>
            </select>
          </div>
          {/* {usernameError && <div className="errorText">{usernameError}</div>} */}
        </div>
        <div className="reg-formField">
          <div className="field-box">
            <label className="field-label">E-mail</label>
            <input
              className="shortInput"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // onBlur={validateUsername}
            />
          </div>
          {/* {usernameError && <div className="errorText">{usernameError}</div>} */}
        </div>
        <div className="reg-formField">
          <div className="field-box">
            <label className="field-label">Contact Number</label>
            <input
              className="shortInput"
              type="text"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              // onBlur={validateUsername}
            />
          </div>
          {/* {usernameError && <div className="errorText">{usernameError}</div>} */}
        </div>
        <div className="reg-formField">
          <div className="field-box">
            <label className="field-label">Password</label>
            <input
              className="shortInput"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={validatePassword}
            />
          </div>
          {passwordError && <div className="errorText">{passwordError}</div>}
        </div>
        <div className="reg-formField">
          <div className="field-box">
            <label className="field-label">Confirm Password</label>
            <input
              className="shortInput"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validatePassword}
            />
          </div>
          {passwordError && <div className="errorText">{passwordError}</div>}
        </div>
        <div className="button-container">
          <button className="submitBtn" type="submit" disabled={!isFormValid()}>
            Register
          </button>
        </div>
      </form>
      <div className="swap">
        Do you already have an account?&nbsp;
        <button className="swapBtn" onClick={() => setAuthForm("user-login")}>
          Login
        </button>
      </div>
    </div>
  );
}
