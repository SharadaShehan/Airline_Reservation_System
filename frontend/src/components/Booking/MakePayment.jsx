import React from 'react';
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';

export default function MakePayment () {
    const { setBookingStep } = BookingStepGlobalState();

    return (
      <>
        <h1>Make Payment View</h1>
        <div>
              <button className='navigateBtn' onClick={() => setBookingStep('bookingSuccess')}>Pay Now</button>
        </div>
      </>
    );
};
