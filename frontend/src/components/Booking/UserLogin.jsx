import React from 'react';
import { Link } from "react-router-dom";
import { useState } from "react";
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';
import { UserGlobalState } from '../Layout/UserGlobalState';
// import { AuthFormGlobalState } from "../Layout/AuthFormGlobalState";
import axios from "axios";
import Cookies from "js-cookie";
import "./userLogin.css"


export default function LoginAsk () {
    const { setBookingStep } = BookingStepGlobalState();
    const { currentUserData } = UserGlobalState();
    if (currentUserData.username != null )  { setBookingStep('seatReserve')};

    function handleBack(){
      setBookingStep('loginAsk');
    }
    
    const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

    // const { setAuthForm } = AuthFormGlobalState();
    const { setCurrentUserData } = UserGlobalState();
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(null);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const [randomError, setRandomError] = useState(null);
  
    const validateUsername = () => {
      const usernameRegex = /^[a-zA-Z0-9_@]{3,30}$/;
      if (usernameRegex.test(username) === false) {
        setUsernameError(`
            Enter a valid username
        `);
      } else {
        setUsernameError(null);
        setRandomError(null);
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
        setRandomError(null);
      }
    };
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    async function handleSubmitClick(e) {
      e.preventDefault();
  
      if (usernameError || passwordError) {
        setRandomError("Fill all the fields correctly");
        return;
      } else if (username === "" || password === "") {
        setRandomError("Fill username and password");
        return;
      }
  
      const postData = {
        username: username,
        password: password,
      };
  
      try {
        const response = await axios.post(`${BaseURL}/user/auth`, postData);
  
        if (response.status === 200) {
          Cookies.set("access-token", response.data.access_token, { expires: 1 });
          setCurrentUserData(response.data.userData);
          setBookingStep("seatReserve");
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        if (error.response.status) {
          if (error.response.status === 401) {
            setRandomError("Invalid username or password");
          }
        }
      }
    }
    return (
        <>
            <div className='mid-box'>
                <div className="glass-background"></div>
                <div className="main-container">
                    <div className='front-content front-text title'>
                        User Login
                    </div>
                    <div className='user-data'>
                        <form onSubmit={handleSubmitClick}>
                            <div class="form-group">
                                <label>User Name</label>
                                <input 
                                    type="text" 
                                    class="form-control selection-area" 
                                    placeholder="User Name"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    onBlur={validateUsername}
                                />
                                {usernameError && <div className="errorText">{usernameError}</div>}
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    class="form-control selection-area" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onBlur={validatePassword}
                                />
                                {passwordError && <div className="errorText">{passwordError}</div>}
                            </div>
                            <button type="submit" class="action-button btn">Login</button>
                        </form>
                    </div>
                    <div className="btn-set">
                        <button type="button" class="action-button btn" disabled={randomError ? true : false}>
                            <Link to="/home" style={{color:"black", textDecoration:"none"}}>
                                Cancel
                            </Link>
                        </button>
                        <button type="button" class="action-button btn" onClick={handleBack}>Back</button>
                    </div>
                </div>
            </div>
        </>
    )
};

