import React from 'react';
import { Link } from "react-router-dom";
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';
import { UserGlobalState } from '../Layout/UserGlobalState';
import "./userLogin.css"


export default function LoginAsk () {
    const { setBookingStep } = BookingStepGlobalState();
    const { currentUserData } = UserGlobalState();
    if (currentUserData.username != null )  { setBookingStep('seatReserve')};

    function handleLogin() {
      setBookingStep('seatReserve');
    }

    function handleBack(){
      setBookingStep('loginAsk');
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
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                            </div>
                            <button type="button" class="action-button btn" onClick={handleLogin}>Login</button>
                        </form>
                    </div>
                    <div className="btn-set">
                        <button type="button" class="action-button btn">
                            <Link to="/home" style={{color:"white", textDecoration:"none"}}>
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

