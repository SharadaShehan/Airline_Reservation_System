import React from 'react';
import { Link } from "react-router-dom";
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';
import { UserGlobalState } from '../Layout/UserGlobalState';
import "./loginAsk.css";

export default function LoginAsk () {
    const { setBookingStep } = BookingStepGlobalState();
    const { currentUserData } = UserGlobalState();
    if (currentUserData.username != null )  { setBookingStep('seatReserve')};

    function handleNext() {
      setBookingStep('seatReserve');
    }

    function handleLogin() {
      setBookingStep('userLogin');
    }
    
    function handleBack(){
      setBookingStep('flightSearch');
    }

    return (
      <>
        <div className='back-box'>
          <div className="glass-background"></div>
          <div className="main-container">
            <div className='front-content front-text title'>
              Book Flight
            </div>
            <div className='sub-content'>
              Continue as ...
            </div>
            <div className="search-btn">
              <button class="transparent-button" onClick={handleNext}>Guest</button>
            </div>
            <div className="search-btn">
              <button class="transparent-button" onClick={handleLogin}>Log in</button>
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

