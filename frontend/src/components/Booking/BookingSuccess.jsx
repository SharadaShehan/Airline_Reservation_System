import React from 'react';
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';

export default function BookingSuccess () {
    const { setBookingStep } = BookingStepGlobalState();

    return (
      <>
        <h1>Booking Success View</h1>
        <div>
              <button className='navigateBtn' onClick={() => setBookingStep('flightSearch')}>Book More</button>
        </div>
      </>
    );
};
