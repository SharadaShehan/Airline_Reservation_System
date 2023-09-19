import React from 'react';
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';
import { UserGlobalState } from '../Layout/UserGlobalState';
import LoginOrRegister from '../Profile/LoginOrRegister';
import "./commonComps.css"


export default function LoginAsk () {
    const { setBookingStep } = BookingStepGlobalState();
    const { currentUserData } = UserGlobalState();
    if (currentUserData.username != null )  { setBookingStep('seatReserve')};

    return (
        <>
          <h1>Login Ask View</h1>
          <div>
              <LoginOrRegister/>
              <div>
                <button className='navigateBtn' onClick={() => setBookingStep('flightSearch')}>Back</button>
                <button className='navigateBtn'  onClick={() => setBookingStep('seatReserve')}>Continue As Guest</button>
              </div>
          </div>
        </>
    )
};

