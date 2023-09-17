import React from 'react';
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';
import { UserGlobalState } from '../Layout/UserGlobalState';

export default function SeatReserve () {
    const { setBookingStep } = BookingStepGlobalState();
    const { currentUserData } = UserGlobalState();
    let prevPage = "loginAsk"
    if (currentUserData.username != null) { prevPage="flightSearch" };

    return (
      <>
        <h1>Seat Reserve View</h1>
        <div>
              <button className='navigateBtn' onClick={() => setBookingStep(prevPage)}>Back</button>
              <button className='navigateBtn' onClick={() => setBookingStep('makePayment')}>Next</button>
        </div>
      </>
    );
};

