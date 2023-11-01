import React from "react";
import { useState, useRef  } from "react";
// import { UserGlobalState } from "../../Layout/UserGlobalState";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import Cookies from "js-cookie";
import axios from "axios";
import "./authForms.css";
import Snackbar from "../../common/Snackbar";

export default function DEORegisterForm() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  // const { setCurrentUserData } = UserGlobalState();
  const [randomError] = useState(null);

  const { setUserMenuItem } = UserMenuGlobalState();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(null);

  const snackbarRef_fail = useRef(null);
  const snackbarRef_success = useRef(null);
  const Snackbardata_fail = {
    type: "fail",
    message: "Check the data and try again!",
  };
  const Snackbardata_success = {
    type: "success",
    message: "Deo Registered Successfully!",
  };

  const submitfunc = async (e) => {
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
    const postData = {
      username: username,
      password: password,
      firstname: firstName,
      lastname: lastName,
    };

    try {
      const accessToken = Cookies.get("access-token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.post(
        `${BaseURL}/deo/register`,
        postData,
        config
      );
      console.log(response);
      if (response.status === 201) {
        snackbarRef_success.current.show();
        clear()
        // const postDataToken = {
        //   username: username,
        //   password: password,
        // };
        // try {
        //   const responseToken = await axios.post(
        //     `${BaseURL}/deo/auth`,
        //     postDataToken
        //   );

        //   if (responseToken.status === 200) {
        //     Cookies.set("access-token", responseToken.data.access_token, {
        //       expires: 1,
        //     });
        //     setCurrentUserData(responseToken.data.userData);
        //     setAuthForm("deo-login");
        //   } else {
        //     throw new Error("Something went wrong");
        //   }
        // } catch (error) {
        //   if (error.responseToken.status) {
        //     if (error.responseToken.status === 401) {
        //       setRandomError("Invalid username or password");
        //     }
        //   }
        // }
      }
    } catch (err) {
      console.log(err);
      snackbarRef_fail.current.show();
      clear()
    }
  };

  const isFormValid = () => {
    return (
      username !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      confirmPassword !== "" &&
      usernameError === null &&
      passwordError === null &&
      firstNameError === null &&
      lastNameError === null
    );
  };

  function clear(){
      setUsername(null)
      setPassword(null)
      setFirstName(null)
      setLastName(null)
  }

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
        className="register-authForm-admin"
        onSubmit={submitfunc}
        style={{ height: "100%", overflow: "auto" }}
      >
        <span className="header">Register Data Entry Operator</span>
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
        {randomError && <div className="errorText">{randomError}</div>}
        <div className="button-container">
          <button
            className="submitBtn"
            type="submit"
            onClick={() => {
              setUserMenuItem("register-portal");
            }}
          >
            Back
          </button>
          <button className="submitBtn" type="submit" disabled={!isFormValid()}>
            Register
          </button>
        </div>
      </form>
      <Snackbar
        ref={snackbarRef_fail}
        message={Snackbardata_fail.message}
        type={Snackbardata_fail.type}
      />
      <Snackbar
        ref={snackbarRef_success}
        message={Snackbardata_success.message}
        type={Snackbardata_success.type}
      />
    </div>
  );
}
