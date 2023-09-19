import React from 'react';
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';
import { UserGlobalState } from '../Layout/UserGlobalState';

export default function FlightSearch () {
    const { setBookingStep } = BookingStepGlobalState();
    const { currentUserData } = UserGlobalState();
    let nextPage = 'loginAsk';
    if (currentUserData.username != null )  { nextPage = 'seatReserve'};
    return (
      <>
        <h1>Flights Search View</h1>
        <div>
          <button className='navigateBtn' onClick={() => setBookingStep(nextPage)}>Next</button>
        </div>
      </>
    );
};

